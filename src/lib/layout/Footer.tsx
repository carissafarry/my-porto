import { Icon, chakra, useColorModeValue, Box, Image } from '@chakra-ui/react';
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
import { SiLeetcode, SiSpotify } from 'react-icons/si';
// eslint-disable-next-line import/no-extraneous-dependencies
import useSWR from 'swr';

const Footer = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data } = useSWR(
    typeof window !== 'undefined' ? '/api/spotify' : null,
    fetcher,
    {
      fallbackData: {
        albumImageUrl: null,
        isPlaying: false,
        songUrl: null,
        title: '',
        artist: '',
      },
      onError: () => {
        console.error('Failed to fetch Spotify data');
      },
    }
  );

  const bg = useColorModeValue(
    'linear(to-r, white, gray.200)',
    'linear(to-r, black.800, purple.900)'
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
        mx="2"
        mb="5"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {data?.albumImageUrl ? (
          <Image alt="emoji" src={data.albumImageUrl} width="20px" mr={1.5} />
        ) : (
          <Icon
            as={SiSpotify}
            h="4"
            w="4"
            mr={1.5}
            _hover={{ color: '#ffffff' }}
          />
        )}

        <chakra.p
          fontSize={13}
          color="blackAlpha.800"
          _dark={{
            color: 'gray.300',
          }}
          textShadow="1px 1px #FFFFFFFF"
        >
          <Link href={data?.songUrl ? data?.songUrl : '#'} target="_blank">
            {data?.isPlaying ? data?.artist : 'Not Listening'}
            {data?.isPlaying ? ` - ${data?.title}` : ''}
          </Link>
        </chakra.p>
      </Box>

      <Box
        color="gray.700"
        _dark={{
          color: 'gray.200',
        }}
        mx="2"
        mb="2"
        alignItems="center"
      >
        <Link href="mailto:carissafarry@gmail.com" target="_blank">
          <Icon
            as={AiTwotoneMail}
            h="7"
            w="7"
            mr={2}
            _hover={{ color: '#857359' }}
          />
        </Link>
        <Link href="https://www.instagram.com/carissafarry/" target="_blank">
          <Icon
            as={BiLogoInstagramAlt}
            h="7"
            w="7"
            mr={2}
            _hover={{ color: '#857359' }}
          />
        </Link>
        <Link href="https://twitter.com/carissafarry" target="_blank">
          <Icon
            as={BiLogoTwitter}
            h="7"
            w="7"
            mr={2}
            _hover={{ color: '#857359' }}
          />
        </Link>
        <Link href="https://www.linkedin.com/in/carissafarry/" target="_blank">
          <Icon
            as={BiLogoLinkedin}
            h="7"
            w="7"
            mr={2}
            _hover={{ color: '#857359' }}
          />
        </Link>
        <Link href="https://github.com/carissafarry" target="_blank">
          <Icon
            as={BiLogoGithub}
            h="7"
            w="7"
            mr={2}
            _hover={{ color: '#857359' }}
          />
        </Link>
        <Link href="https://gitlab.com/carissafarry" target="_blank">
          <Icon
            as={BiLogoGitlab}
            h="7"
            w="7"
            mr={2}
            _hover={{ color: '#857359' }}
          />
        </Link>
        <Link href="https://leetcode.com/carissafarry/" target="_blank">
          <Icon
            as={SiLeetcode}
            h="7"
            w="7"
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
            h="7"
            w="7"
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
        @ {new Date().getFullYear()} Carissa Farry
      </chakra.p>
    </chakra.footer>
  );
};

export default Footer;
