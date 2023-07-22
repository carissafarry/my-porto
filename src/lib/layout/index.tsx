'use client';

import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Navbar from '~/lib/layout/Navbar';

import Footer from './Footer';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const bg = useColorModeValue(
    'linear(to-r, orange.100, purple.200, white)',
    'linear(to-r, gray.800, purple.900)'
  );

  return (
    <Box transition="0.5s ease-out">
      <Navbar />
      <Flex
        as="main"
        minHeight="100vh"
        px={4}
        py={32}
        mx="auto"
        bgGradient={bg}
      >
        <Box mx="auto" w={9 / 12}>
          {children}
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
};

export default Layout;
