'use client';

import { CacheProvider } from '@chakra-ui/next-js';
// import { UnorderedList } from '@chakra-ui/react';
import { MDXProvider } from '@mdx-js/react';

import { Chakra as ChakraProvider } from '~/lib/components/Chakra';
// import Heading from '~/lib/components/mdx/Heading';
// import Para from '~/lib/components/mdx/Para';

// const components = {
//   h1: Heading.H1,
//   h2: Heading.H2,
//   p: Para,
//   ul: UnorderedList,
// };

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CacheProvider>
      <ChakraProvider>
        <MDXProvider>{children}</MDXProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};

export default Providers;
