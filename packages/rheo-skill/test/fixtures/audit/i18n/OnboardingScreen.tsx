import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

export const OnboardingScreen = () => {
  const { t } = useTranslation();
  return (
    <View>
      <Text>{t('onboarding.welcome.title')}</Text>
      <Text>{t('onboarding.cta.continue')}</Text>
    </View>
  );
};
