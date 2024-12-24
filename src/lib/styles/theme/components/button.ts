import type { ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 'full',
  },
  sizes: {
    lg: {
      fontSize: 'lg',
      px: 8,
      py: 6,
    },
  },
  variants: {
    outline: (props: any) => ({
      borderColor: 'brand.500',
      color: props.colorMode === 'dark' ? 'brand.200' : 'brand.500',
      _hover: {
        bg: 'brand.100',
        color: 'brand.900',
      },
    }),
    ghost: (props: any) => ({
      color: props.colorMode === 'dark' ? 'brand.200' : 'brand.500',
      _hover: {
        bg: 'brand.300',
        color: 'brand.900',
      },
    }),
  },
};
