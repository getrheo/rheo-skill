import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const delays = [0, 80, 160];

// staggerChildren: animate list items in sequence using the delays above
export const WelcomeScreen = () => (
  <Animated.View entering={FadeIn.duration(320)} exiting={FadeOut.duration(280)}>
    {delays.map((delayMs, index) => (
      <Animated.View
        key={index}
        entering={FadeIn.delay(delayMs).duration(300)}
        style={{ opacity: 1 }}
      />
    ))}
  </Animated.View>
);
