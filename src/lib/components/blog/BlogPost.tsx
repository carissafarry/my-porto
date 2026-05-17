'use client';

import {
  Box,
  Heading,
  Flex,
  Text,
  Image,
  Badge,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { PortableText } from '@portabletext/react';
import type { Post } from '~/lib/sanity/types';
import { formatDate, getSanityImageUrl, calculateReadingTime } from './utils';

interface BlogPostProps {
  post: Post;
}

// Portable text components for rendering Sanity content
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <Image src={value.asset.url} alt={value.alt} my={6} borderRadius="lg" />
    ),
  },
  block: {
    h2: ({ children }: any) => (
      <Heading as="h2" size="lg" my={4}>
        {children}
      </Heading>
    ),
    h3: ({ children }: any) => (
      <Heading as="h3" size="md" my={3}>
        {children}
      </Heading>
    ),
    normal: ({ children }: any) => (
      <Text my={2} lineHeight="tall">
        {children}
      </Text>
    ),
    blockquote: ({ children }: any) => (
      <Box
        borderLeftWidth="4px"
        borderColor="blue.500"
        pl={4}
        my={4}
        fontStyle="italic"
      >
        {children}
      </Box>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <Box as="ul" pl={6} my={4}>
        {children}
      </Box>
    ),
    number: ({ children }: any) => (
      <Box as="ol" pl={6} my={4}>
        {children}
      </Box>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <Box as="li" mb={2}>
        {children}
      </Box>
    ),
    number: ({ children }: any) => (
      <Box as="li" mb={2}>
        {children}
      </Box>
    ),
  },
  marks: {
    em: ({ children }: any) => <em>{children}</em>,
    strong: ({ children }: any) => <strong>{children}</strong>,
    code: ({ children }: any) => (
      <Box
        as="code"
        bg="gray.100"
        _dark={{ bg: 'gray.800' }}
        px={2}
        py={1}
        borderRadius="md"
      >
        {children}
      </Box>
    ),
  },
};

export default function BlogPost({ post }: BlogPostProps) {
  const readingTime = calculateReadingTime(post.content);
  const imageUrl = getSanityImageUrl(post.featuredImage);

  return (
    <VStack spacing={8} align="stretch">
      {/* Header */}
      <Box>
        <Heading as="h1" size="2xl" mb={4}>
          {post.title}
        </Heading>

        {/* Meta Info */}
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          gap={4}
          align={{ base: 'flex-start', sm: 'center' }}
          color="gray.600"
          _dark={{ color: 'gray.400' }}
          fontSize="sm"
          mb={4}
        >
          <HStack>
            {post.author?.image?.asset?.url && (
              <Image
                src={post.author.image.asset.url}
                alt={post.author.name}
                width="32px"
                height="32px"
                borderRadius="full"
              />
            )}
            <Text fontWeight="medium">{post.author?.name}</Text>
          </HStack>
          <Text>•</Text>
          <Text>{formatDate(post.publishedAt)}</Text>
          <Text>•</Text>
          <Text>{readingTime} min read</Text>
        </Flex>

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <Flex gap={2} wrap="wrap" mb={4}>
            {post.categories.map((cat) => (
              <Badge key={cat._id} colorScheme="blue">
                {cat.name}
              </Badge>
            ))}
          </Flex>
        )}
      </Box>

      {/* Featured Image */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={post.featuredImage.alt}
          borderRadius="lg"
          maxWidth="100%"
          height="auto"
        />
      )}

      {/* Content */}
      <Box className="prose" _dark={{ color: 'gray.300' }}>
        <PortableText
          value={post.content}
          components={portableTextComponents}
        />
      </Box>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <Flex gap={2} wrap="wrap" pt={4}>
          {post.tags.map((tag) => (
            <Badge key={tag._id} variant="outline" colorScheme="teal">
              #{tag.name}
            </Badge>
          ))}
        </Flex>
      )}
    </VStack>
  );
}
