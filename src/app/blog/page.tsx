import type { Metadata } from 'next';
import {
  Container,
  Heading,
  Grid,
  GridItem,
  Box,
  Text,
} from '@chakra-ui/react';
import { getAllPosts, getAllCategories } from '~/lib/sanity/queries';
import type { Post } from '~/lib/sanity/types';
import PostCard from '~/lib/components/blog/PostCard';
import CategoryFilter from '~/lib/components/blog/CategoryFilter';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles and insights on web development, design, and technology.',
};

export const revalidate = 60;

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: { category?: string; tag?: string };
}) {
  const posts = await getAllPosts();
  const categories = await getAllCategories();

  // Filter by category if provided
  let filteredPosts = posts;
  if (searchParams?.category) {
    filteredPosts = posts.filter((post: Post) =>
      post.categories?.some((cat) => cat.slug.current === searchParams.category)
    );
  }

  // Filter by tag if provided
  if (searchParams?.tag) {
    filteredPosts = posts.filter((post: Post) =>
      post.tags?.some((tag) => tag.slug.current === searchParams.tag)
    );
  }

  return (
    <Container maxW="4xl" py={12}>
      <Box mb={10}>
        <Heading as="h1" size="2xl" mb={4}>
          Blog
        </Heading>
        <Text color="gray.600" _dark={{ color: 'gray.400' }} fontSize="lg">
          Thoughts on web development, design, and technology.
        </Text>
      </Box>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        activeCategory={searchParams?.category}
      />

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap={6}
        >
          {filteredPosts.map((post: Post) => (
            <GridItem key={post._id}>
              <PostCard post={post} />
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Box py={12} textAlign="center">
          <Text color="gray.500">No posts found.</Text>
        </Box>
      )}
    </Container>
  );
}
