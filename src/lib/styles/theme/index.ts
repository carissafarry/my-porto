import { extendTheme } from '@chakra-ui/react';

import { globalStyles } from '~/lib/styles/theme/globalStyles';

import { colors } from './colors';
import { components } from './components';
import { config } from './config';
import { fonts } from './fonts';

const customTheme = extendTheme({
  fonts,
  colors,
  config,
  components,
  ...globalStyles,
});

export default customTheme;
