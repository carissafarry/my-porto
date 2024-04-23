'use client';

import { Box, Flex, Heading, Link, Spacer, Text } from '@chakra-ui/react';

import Date from '~/lib/helpers/date';
import type { TBlogContentsItem, TPostFrontMatter } from '~/lib/types';

export type BlogContentsProps = {
  posts: Array<TBlogContentsItem>;
};

function BlogPage({ posts }: BlogContentsProps) {
  return (
    <nav>
      <Heading mb={5} as="h1" size="2xl">
        Blog
      </Heading>

      {posts.map(({ slug, frontMatter }) => {
        return (
          <Box mb={12} key={slug}>
            <Flex mb={2}>
              <Link href={`/blog/${slug}`} _hover={{ color: '#857359' }}>
                <Heading as="h1" size="lg">
                  {(frontMatter as TPostFrontMatter).title}
                </Heading>
              </Link>
              <Spacer />
              <Text>
                <Date dateString={(frontMatter as TPostFrontMatter).date} />
              </Text>
            </Flex>
            <Text>{(frontMatter as TPostFrontMatter).description}</Text>
          </Box>
        );
      })}
    </nav>
  );
}

export default BlogPage;
