'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Flex,
  Text,
  useToast,
  Heading,
} from '@chakra-ui/react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: 'Email required',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      toast({
        title: 'Success!',
        description: "You've been added to Carissa's newsletter.",
        status: 'success',
        duration: 3000,
      });

      setEmail('');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An error occurred';
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      p={8}
      mt={10}
      borderWidth="1px"
      borderRadius="lg"
      bg="blue.50"
      _dark={{ bg: 'gray.800' }}
    >
      <Heading as="h3" size="md" mb={2}>
        Get New Posts by Email
      </Heading>
      <Text color="gray.600" _dark={{ color: 'gray.400' }} mb={4}>
        Join my newsletter to receive the latest articles and updates!
      </Text>

      <Flex
        as="form"
        onSubmit={handleSubmit}
        gap={2}
        direction={{ base: 'column', sm: 'row' }}
      >
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          bg="white"
          _dark={{ bg: 'gray.700' }}
        />
        <Button
          type="submit"
          colorScheme="blue"
          isLoading={loading}
          whiteSpace="nowrap"
        >
          Subscribe
        </Button>
      </Flex>
    </Box>
  );
}
