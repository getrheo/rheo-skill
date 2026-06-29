import { withSpring } from 'react-native-reanimated';

export const SpringHero = () => {
  withSpring(1, { damping: 12 });
  return null;
};
