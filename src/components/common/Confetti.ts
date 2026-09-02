import confetti from 'canvas-confetti';

export const triggerCelebrationConfetti = () => {
  try {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  } catch (e) {
    console.log('Confetti trigger', e);
  }
};
