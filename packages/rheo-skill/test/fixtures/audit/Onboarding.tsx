import { Image, ImageBackground, ScrollView, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import hero from './assets/hero.png';
import animation from './assets/welcome.json';
import { PrimaryButton } from './components/Button';
import { colors } from './tokens';
import './fonts';
import { StepQuitGoal } from './StepQuitGoal';

const OnboardingHeader = () => (
  <View>
    <BackButton />
    <ProgressBar value={0.4} />
  </View>
);

const infoSteps = [
  { title: 'Track', image: hero },
  { title: 'Results', image: hero },
];

export const Onboarding = () => {
  const currentInfoStep = 0;
  const slide = infoSteps[currentInfoStep];

  return (
    <LinearGradient colors={[colors.brandPrimary, colors.background]}>
      <ImageBackground source={hero}>
        <OnboardingHeader />
        <ScrollView>
          <View className="items-center justify-center">
            <Image source={slide.image} className="w-72 h-72" />
            <LottieView source={animation} autoPlay />
            <StepQuitGoal selected="a" goal="a" />
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            shadowColor: '#000000',
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 8,
            borderWidth: 1,
            borderColor: '#E5E7EB',
          }}
        >
          <PrimaryButton>Continue</PrimaryButton>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};
