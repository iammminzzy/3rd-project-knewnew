import { DefaultTheme } from 'styled-components';

const colors = {
  white: '#FFFFFF',
  white80: '#F7F7FC',
  white50: '#ededed',

  black: '#000000',
  black80: '#202124',
  black50: '#AAA',

  red: '#FB585A',
  red80: '#FE5D5D',

  yellow: '#f5df4d',
};

export type ColorsTypes = typeof colors;

const theme: DefaultTheme = {
  colors,
};

export default theme;
