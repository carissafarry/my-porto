'use client';

import {
  Box,
  Heading,
  Text,
  Flex,
  Link as ChakraLink,
  HStack,
  Image,
} from '@chakra-ui/react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import type { Author } from '~/lib/sanity/types';
import { getSanityImageUrl } from './utils';

interface AuthorBioProps {
  author: Author;
}

export default function AuthorBio({ author }: AuthorBioProps) {
  const imageUrl = getSanityImageUrl(author.image);

  return (
    <Box
      p={6}
      mt={10}
      borderWidth="1px"
      borderRadius="lg"
      bg="gray.50"
      _dark={{ bg: 'gray.800' }}
    >
      <Flex gap={4} align="flex-start">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={author.name}
            width="80px"
            height="80px"
            borderRadius="full"
          />
        )}
        <Box flex={1}>
          <Heading as="h4" size="md" mb={2}>
            About {author.name}
          </Heading>
          <Text color="gray.600" _dark={{ color: 'gray.400' }} mb={3}>
            {author.bio}
          </Text>

          {/* Social links */}
          {author.social && (
            <HStack spacing={4}>
              {author.social.twitter && (
                <ChakraLink
                  href={author.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Twitter"
                >
                  <FaTwitter size={20} />
                </ChakraLink>
              )}
              {author.social.linkedin && (
                <ChakraLink
                  href={author.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </ChakraLink>
              )}
              {author.social.github && (
                <ChakraLink
                  href={author.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                >
                  <FaGithub size={20} />
                </ChakraLink>
              )}
            </HStack>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
