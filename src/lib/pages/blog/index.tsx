'use client';

import { Flex, chakra, useColorModeValue } from '@chakra-ui/react';

const Blog = () => {
  useColorModeValue(
    'linear(to-r, orange.100, purple.200, white)',
    'linear(to-r, gray.800, purple.900)'
  );
  return (
    <Flex alignItems="center" textAlign="center" mb="5">
      <chakra.h2
        mr={3}
        fontSize={{
          base: '4xl',
          md: '5xl',
        }}
        fontWeight="bold"
        lineHeight="shorter"
        color="gray.900"
        _dark={{
          color: 'white',
        }}
      >
        Tentang Next.js dan Tailwind CSS
      </chakra.h2>
    </Flex>
  );
};

export default Blog;
