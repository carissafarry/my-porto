import { Icon, chakra, useColorModeValue, Box } from '@chakra-ui/react';
import Link from 'next/link';
import { AiTwotoneMail } from 'react-icons/ai';
import {
  BiLogoLinkedin,
  BiLogoInstagramAlt,
  BiLogoTwitter,
  BiLogoGithub,
  BiLogoGitlab,
} from 'react-icons/bi';
import { FaHackerrank } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const Footer = () => {
  const bg = useColorModeValue(
    'linear(to-r, orange.100, purple.200, white)',
    'linear(to-r, gray.800, purple.900)'
  );
  return (
    <chakra.footer
      w="full"
      bgGradient={bg}
      alignItems="center"
      justifyContent="center"
      position="fixed"
      bottom="0"
      textAlign="center"
      px="6"
      py="4"
    >
      <Box
        color="gray.700"
        _dark={{
          color: 'gray.200',
        }}
        mx="2"
        mb="3"
        alignItems="center"
      >
        <Link href="https://github.com/carissafarry" target="_blank">
          <Icon
            as={BiLogoGithub}
            h="6"
            w="6"
            mr={2}
            _hover={{ color: '#857359' }}
          />
        </Link>
        <Link href="https://gitlab.com/carissafarry" target="_blank">
          <Icon
            as={BiLogoGitlab}
            h="6"
            w="6"
            mr={2}
            _hover={{ color: '#857359' }}
          />
        </Link>
        <Link href="https://leetcode.com/carissafarry/" target="_blank">
          <Icon
            as={SiLeetcode}
            h="6"
            w="6"
            mr={2}
            _hover={{ color: '#857359' }}
          />
        </Link>
        <Link
          href="https://www.hackerrank.com/profile/carissafarry"
          target="_blank"
        >
          <Icon
            as={FaHackerrank}
            h="6"
            w="6"
            mr={2}
            _hover={{ color: '#857359' }}
          />
        </Link>
      </Box>

      <Box
        color="gray.700"
        _dark={{
          color: 'gray.200',
        }}
        mx="2"
        mb="3"
        alignItems="center"
      >
        <Link href="mailto:carissafarry@gmail.com" target="_blank">
          <Icon
            as={AiTwotoneMail}
            h="6"
            w="6"
            mr={2}
            _hover={{ color: '#857359' }}
          />
        </Link>
        <Link href="https://www.instagram.com/carissafarry/" target="_blank">
          <Icon
            as={BiLogoInstagramAlt}
            h="6"
            w="6"
            mr={2}
            _hover={{ color: '#857359' }}
          />
        </Link>
        <Link href="https://twitter.com/carissafarry" target="_blank">
          <Icon
            as={BiLogoTwitter}
            h="6"
            w="6"
            mr={2}
            _hover={{ color: '#857359' }}
          />
        </Link>
        <Link href="https://www.linkedin.com/in/carissafarry/" target="_blank">
          <Icon
            as={BiLogoLinkedin}
            h="6"
            w="6"
            mr={2}
            _hover={{ color: '#857359' }}
          />
        </Link>
      </Box>

      <chakra.p
        py={{
          base: '2',
          sm: '0',
        }}
        fontSize={15}
        color="blackAlpha.800"
        _dark={{
          color: 'gray.300',
        }}
      >
        @ 2023 Carissa Farry
      </chakra.p>
    </chakra.footer>
  );
};

export default Footer;
