import ExplosionConfetti from './explosionConfetti';
import FullScreenConfetti from './fullScreenConfetti';
import LateralConfetti from './lateralConfetti';

const confettiMap: { [key: number]: React.ReactNode } = {
  1: <LateralConfetti />,
  2: <FullScreenConfetti />,
  3: <ExplosionConfetti />,
};

export default function RandomConfetti() {
  const randomValue = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
  return confettiMap[randomValue];
}
