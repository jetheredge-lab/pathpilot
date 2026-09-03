import { Router } from 'express';
import type { Request, Response } from 'express';
import Stripe from 'stripe';
import { prisma } from '../prisma.js';
import { type AuthedRequest } from '../auth.js';
import { entitlementActive } from '../entitlement.js';

// ── Configuration ───────────────────────────────────────────────────
const APP_BASE_URL = (process.env.APP_BASE_URL ?? '').replace(/\/$/, '');
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? '';
const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID ?? '';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? '';
// One-time license grants access for this many months.
const ENTITLEMENT_MONTHS = Number(process.env.ENTITLEMENT_MONTHS ?? 12);

const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;
// Checkout needs a secret key + a price; the webhook additionally needs its secret.
const billingEnabled = Boolean(stripe && STRIPE_PRICE_ID && APP_BASE_URL);

console.log(`[billing] enabled=${billingEnabled} webhook=${Boolean(stripe && STRIPE_WEBHOOK_SECRET)}`);

function customerIdOf(v: string | Stripe.Customer | Stripe.DeletedCustomer | null): string | null {
  if (!v) return null;
  return typeof v === 'string' ? v : v.id;
}

async function grant(userId: string, customerId: string | null) {
  const expires = new Date();
  expires.setMonth(expires.getMonth() + ENTITLEMENT_MONTHS);
  await prisma.user.update({
    where: { id: userId },
    data: {
      plan: 'paid',
      entitlementExpiresAt: expires,
      ...(customerId ? { stripeCustomerId: customerId } : {}),
    },
  });
}

async function revokeByCustomer(customerId: string | null) {
  if (!customerId) return;
  const user = await prisma.user.findUnique({ where: { stripeCustomerId: customerId } });
  if (user) {
    await prisma.user.update({ where: { id: user.id }, data: { plan: 'free', entitlementExpiresAt: null } });
  }
}

// ── Webhook (mounted with a raw body parser, BEFORE express.json) ───
export async function billingWebhookHandler(req: Request, res: Response): Promise<void> {
  if (!stripe || !STRIPE_WEBHOOK_SECRET) {
    res.status(400).end();
    return;
  }
  const sig = req.headers['stripe-signature'];
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body as Buffer, sig as string, STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    res.status(400).send(`Webhook Error: ${(e as Error).message}`);
    return;
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.client_reference_id ?? session.metadata?.userId;
        if (userId) await grant(userId, customerIdOf(session.customer));
        break;
      }
      case 'charge.refunded': {
        await revokeByCustomer(customerIdOf(event.data.object.customer));
        break;
      }
      case 'charge.dispute.created': {
        // The dispute's charge carries the customer.
        const dispute = event.data.object;
        const charge = typeof dispute.charge === 'string' ? await stripe.charges.retrieve(dispute.charge) : dispute.charge;
        await revokeByCustomer(customerIdOf(charge.customer));
        break;
      }
      default:
        break;
    }
    res.json({ received: true });
  } catch (e) {
    console.error('[billing] webhook handler error', e);
    res.status(500).end();
  }
}

// ── Authenticated billing routes ────────────────────────────────────
export const billingRouter = Router();

billingRouter.get('/status', async (req: AuthedRequest, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId! } });
  if (!user) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  res.json({
    enabled: billingEnabled,
    active: entitlementActive(user),
    plan: user.plan,
    expiresAt: user.entitlementExpiresAt,
    hasCustomer: Boolean(user.stripeCustomerId),
  });
});

billingRouter.post('/checkout', async (req: AuthedRequest, res) => {
  if (!stripe || !billingEnabled) {
    res.status(503).json({ error: 'Billing is not configured' });
    return;
  }
  const user = await prisma.user.findUnique({ where: { id: req.userId! } });
  if (!user) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
    client_reference_id: user.id,
    metadata: { userId: user.id },
    ...(user.stripeCustomerId
      ? { customer: user.stripeCustomerId }
      : { customer_email: user.email, customer_creation: 'always' }),
    allow_promotion_codes: true,
    success_url: `${APP_BASE_URL}/app/?upgraded=1`,
    cancel_url: `${APP_BASE_URL}/app/?checkout=cancelled`,
  });
  res.json({ url: session.url });
});

billingRouter.post('/portal', async (req: AuthedRequest, res) => {
  if (!stripe) {
    res.status(503).json({ error: 'Billing is not configured' });
    return;
  }
  const user = await prisma.user.findUnique({ where: { id: req.userId! } });
  if (!user?.stripeCustomerId) {
    res.status(400).json({ error: 'No billing account yet' });
    return;
  }
  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${APP_BASE_URL}/app/`,
  });
  res.json({ url: session.url });
});
