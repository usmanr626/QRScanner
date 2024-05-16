import {Appearance} from 'react-native';
import ColorsDark from './ColorsDark';
import ColorsLight from './ColorsLight';
const getCurrentThemeColors = () => {
  const currentTheme = Appearance.getColorScheme();
  // console.log('🎯: getCurrentThemeColors -> currentTheme', currentTheme);
  return currentTheme === 'dark' ? ColorsDark : ColorsLight;
};

export default getCurrentThemeColors();
