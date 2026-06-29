import * as Font from 'expo-font';

export const loadAppFonts = () =>
  Font.loadAsync({
    CalSans: require('./assets/fonts/CalSans-Regular.ttf'),
  });
