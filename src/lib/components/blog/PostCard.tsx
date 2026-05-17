'use client';

import Link from 'next/link';
import {
  Box,
  Heading,
  Text,
  Flex,
  Badge,
  Image,
  Stack,
} from '@chakra-ui/react';
import type { Post } from '~/lib/sanity/types';
import {
  formatDate,
  getSanityImageUrl,
  calculateReadingTime,
  truncateText,
} from './utils';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const readingTime = calculateReadingTime(post.content);
  const imageUrl = getSanityImageUrl(post.featuredImage);

  return (
    <Link href={`/blog/${post.slug.current}`}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        _dark={{ bg: 'gray.800' }}
        transition="all 0.3s"
        _hover={{
          shadow: 'lg',
          transform: 'translateY(-4px)',
        }}
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={post.featuredImage.alt}
            height="200px"
            width="100%"
            objectFit="cover"
          />
        )}
        <Box p={6}>
          <Stack spacing={3}>
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <Flex gap={2} wrap="wrap">
                {post.categories.map((cat) => (
                  <Badge key={cat._id} colorScheme="blue">
                    {cat.name}
                  </Badge>
                ))}
              </Flex>
            )}

            {/* Title */}
            <Heading as="h3" size="md">
              {post.title}
            </Heading>

            {/* Excerpt */}
            <Text color="gray.600" _dark={{ color: 'gray.400' }} noOfLines={2}>
              {post.excerpt || truncateText(post.title, 100)}
            </Text>

            {/* Meta */}
            <Flex
              justify="space-between"
              align="center"
              fontSize="sm"
              color="gray.500"
            >
              <Flex align="center" gap={2}>
                {post.author?.image?.asset?.url && (
                  <Image
                    src={post.author.image.asset.url}
                    alt={post.author.name}
                    width="24px"
                    height="24px"
                    borderRadius="full"
                  />
                )}
                <Text>{post.author?.name}</Text>
              </Flex>
              <Text>{readingTime} min read</Text>
            </Flex>

            {/* Date */}
            <Text fontSize="xs" color="gray.400">
              {formatDate(post.publishedAt)}
            </Text>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <Flex gap={2} wrap="wrap">
                {post.tags.map((tag) => (
                  <Text key={tag._id} fontSize="xs" color="teal.500">
                    #{tag.name}
                  </Text>
                ))}
              </Flex>
            )}
          </Stack>
        </Box>
      </Box>
    </Link>
  );
}
