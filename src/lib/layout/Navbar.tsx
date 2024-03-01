import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
} from '@chakra-ui/react';
import Link from 'next/link';
import { AiOutlineMenu } from 'react-icons/ai';

import ThemeToggle from '~/lib/layout/ThemeToggle';

const Navbar = () => {
  const bg = useColorModeValue(
    'linear(to-r, orange.100, purple.200, white)',
    'linear(to-r, gray.800, purple.900)'
  );
  const mobileNav = useDisclosure();

  return (
    <chakra.header
      bgGradient={bg}
      w="full"
      px={{ base: 2, sm: 4 }}
      py={4}
      position="fixed"
    >
      <Flex px={4} alignItems="center" justifyContent="space-between" mx="auto">
        <Flex>
          <chakra.a
            href="/"
            title="Carissa Farry"
            display="flex"
            alignItems="center"
          >
            <VisuallyHidden>Rissa</VisuallyHidden>
          </chakra.a>
          <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
            Rissa
          </chakra.h1>
        </Flex>
        <HStack display="flex" alignItems="center" spacing={1}>
          <HStack
            spacing={1}
            mr={1}
            color="brand.500"
            display={{ base: 'none', md: 'inline-flex' }}
          >
            <Link href="/">
              <Button variant="ghost">About</Button>
            </Link>
            <Link href="/blog">
              <Button variant="ghost">Blog</Button>
            </Link>
            <Link href="/projects">
              <Button variant="ghost">Projects</Button>
            </Link>
          </HStack>
          <Box display={{ base: 'inline-flex', md: 'none' }}>
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              aria-label="Open menu"
              fontSize="20px"
              color="gray.800"
              _dark={{ color: 'inherit' }}
              variant="ghost"
              icon={<AiOutlineMenu />}
              onClick={mobileNav.onOpen}
            />

            <VStack
              pos="absolute"
              top={0}
              left={0}
              right={0}
              display={mobileNav.isOpen ? 'flex' : 'none'}
              flexDirection="column"
              p={2}
              pb={4}
              m={2}
              bgGradient={bg}
              spacing={3}
              rounded="sm"
              shadow="sm"
            >
              <CloseButton
                aria-label="Close menu"
                onClick={mobileNav.onClose}
              />

              <Button w="full" variant="ghost">
                <Link href="/">About</Link>
              </Button>
            </VStack>
          </Box>
        </HStack>
        <ThemeToggle />
      </Flex>
    </chakra.header>
  );
};
export default Navbar;
