import { Router } from 'express';
import { prisma } from '../prisma.js';
import { requireAuth, type AuthedRequest } from '../auth.js';

export const stateRouter = Router();

// All state routes require a signed-in user; data is scoped to that user.
stateRouter.use(requireAuth);

// GET /api/state — load this user's saved app state (null if none yet).
stateRouter.get('/', async (req: AuthedRequest, res) => {
  const row = await prisma.appState.findUnique({ where: { userId: req.userId! } });
  res.json({ data: row?.data ?? null });
});

// PUT /api/state — replace this user's app state with the posted snapshot.
stateRouter.put('/', async (req: AuthedRequest, res) => {
  const body = req.body as { data?: unknown } | undefined;
  if (!body || typeof body !== 'object' || typeof body.data !== 'object' || body.data === null) {
    res.status(400).json({ error: 'Expected JSON body of the form { data: { ... } }' });
    return;
  }
  const data = body.data as object;
  await prisma.appState.upsert({
    where: { userId: req.userId! },
    create: { userId: req.userId!, data },
    update: { data },
  });
  res.json({ ok: true });
});
