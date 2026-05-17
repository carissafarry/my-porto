'use client';

import { Box, Heading, Grid, GridItem } from '@chakra-ui/react';
import type { Post } from '~/lib/sanity/types';
import PostCard from './PostCard';

interface RelatedPostsProps {
  posts: Post[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <Box mt={12} pt={8} borderTopWidth="1px">
      <Heading as="h3" size="lg" mb={6}>
        Related Posts
      </Heading>
      <Grid
        templateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={6}
      >
        {posts.map((post) => (
          <GridItem key={post._id}>
            <PostCard post={post} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
