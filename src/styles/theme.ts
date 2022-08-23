import { DefaultTheme } from 'styled-components';

const colors = {
  white: '#FFFFFF',
  white80: '#F7F7FC',
  white60: '#fff',
  white50: '#ededed',

  black: '#000000',
  black80: '#202124',
  black50: '#AAA',

  red: '#FB585A',
  red80: '#FE5D5D',

  yellow: '#f5df4d',
};

const fonts = {
  fontFamily: "'Noto Sans KR', sans-serif",
};

export type ColorsTypes = typeof colors;
export type FontsTypes = typeof fonts;

const theme: DefaultTheme = {
  colors,
  fonts,
};

export default theme;
