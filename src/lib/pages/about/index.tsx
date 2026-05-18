'use client';

import {
  Flex,
  Box,
  chakra,
  HStack,
  Button,
  Icon,
  Tooltip,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import {
  BiLogoGoLang,
  BiLogoPhp,
  BiLogoPython,
  BiLogoReact,
  BiLogoTypescript,
  BiLogoVuejs,
} from 'react-icons/bi';
import { SiNextdotjs, SiSwift } from 'react-icons/si';

const About = () => {
  useColorModeValue(
    'linear(to-r, orange.100, purple.200, white)',
    'linear(to-r, gray.800, purple.900)'
  );
  return (
    <>
      <Flex alignItems="center" textAlign="center" mb="5">
        <chakra.h1
          mr={3}
          fontSize={{
            base: '4xl',
            md: '5xl',
          }}
          fontWeight="bold"
          lineHeight="shorter"
          color="gray.900"
          _dark={{
            color: 'white',
          }}
        >
          Hai! I am Rissa
        </chakra.h1>
        <Image alt="emoji" src="/emoji.png" width="90px" />
      </Flex>

      <chakra.p
        mb={5}
        color="blackAlpha.800"
        _dark={{
          color: 'white',
        }}
        fontSize={{
          md: 'lg',
        }}
      >
        Backend Engineer with experience in designing and maintaining scalable
        RESTful APIs and distributed service systems in banking industry.
        Skilled in optimizing backend performance, improving system reliability,
        and maintaining code quality through security best practices,
        monitoring, and technical debt reduction. Experienced with Lumen,
        Node.js, Redis, Docker, MySQL, NGINX, and CI/CD pipelines, as well as
        system observability using Grafana. Proven ability to work in production
        environments, optimize legacy systems, troubleshoot high-traffic APIs,
        and collaborate across cross-functional teams to deliver reliable and
        scalable backend services.
      </chakra.p>
      <chakra.p
        mb={5}
        color="blackAlpha.800"
        _dark={{
          color: 'white',
        }}
        fontSize={{
          md: 'lg',
        }}
      >
        If you think I can help, I&apos;m very open
        opportunities you provide!
      </chakra.p>
      <HStack flex={6}>
        <HStack mb="0">
          <Button
            as="a"
            href="/cv"
            target="_blank"
            variant="outline"
            colorScheme="brand"
            size="lg"
            mb="20"
            cursor="pointer"
          >
            See My CV
          </Button>
        </HStack>
        <HStack mb="0">
          <Button
            as="a"
            href="/portfolio"
            target="_blank"
            variant="outline"
            colorScheme="brand"
            size="lg"
            mb="20"
            cursor="pointer"
          >
            See My Portfolio
          </Button>
        </HStack>
      </HStack>

      <chakra.h1
        mb={4}
        fontSize={{
          base: '4xl',
          md: '5xl',
        }}
        fontWeight="bold"
        lineHeight="shorter"
        color="gray.900"
        _dark={{
          color: 'white',
        }}
      >
        Tech Stack
      </chakra.h1>

      {/* TODO: Responsive on tech stack icons */}
      <Box
        display="flex"
        alignItems="center"
        color="gray.700"
        _dark={{
          color: 'gray.200',
        }}
      >
        <Tooltip hasArrow label="Go" bg="#857359" color="white" placement="top">
          <span>
            <Icon
              as={BiLogoGoLang}
              h="16"
              w="16"
              mr={2}
              mt={1}
              _hover={{ color: '#857359' }}
            />
          </span>
        </Tooltip>

        <Tooltip
          hasArrow
          label="PHP"
          bg="#857359"
          color="white"
          placement="top"
        >
          <span>
            <Icon
              as={BiLogoPhp}
              h="16"
              w="16"
              mr={2}
              mt={1}
              _hover={{ color: '#857359' }}
            />
          </span>
        </Tooltip>

        <Tooltip
          hasArrow
          label="Python"
          bg="#857359"
          color="white"
          placement="top"
        >
          <span>
            <Icon
              as={BiLogoPython}
              h="16"
              w="16"
              mr={2}
              mt={1}
              _hover={{ color: '#857359' }}
            />
          </span>
        </Tooltip>

        <Tooltip
          hasArrow
          label="React"
          bg="#857359"
          color="white"
          placement="top"
        >
          <span>
            <Icon
              as={BiLogoReact}
              h="16"
              w="16"
              mr={2}
              mt={1}
              _hover={{ color: '#857359' }}
            />
          </span>
        </Tooltip>

        <Tooltip
          hasArrow
          label="NextJs"
          bg="#857359"
          color="white"
          placement="top"
        >
          <span>
            <Icon
              as={SiNextdotjs}
              h="12"
              w="12"
              mr={2}
              mt={1}
              _hover={{ color: '#857359' }}
            />
          </span>
        </Tooltip>

        <Tooltip
          hasArrow
          label="TypeScript"
          bg="#857359"
          color="white"
          placement="top"
        >
          <span>
            <Icon
              as={BiLogoTypescript}
              h="16"
              w="16"
              mr={2}
              mt={1}
              _hover={{ color: '#857359' }}
            />
          </span>
        </Tooltip>

        <Tooltip
          hasArrow
          label="VueJs"
          bg="#857359"
          color="white"
          placement="top"
        >
          <span>
            <Icon
              as={BiLogoVuejs}
              h="16"
              w="16"
              mr={2}
              mt={1}
              _hover={{ color: '#857359' }}
            />
          </span>
        </Tooltip>

        <Tooltip
          hasArrow
          label="Swift"
          bg="#857359"
          color="white"
          placement="top"
        >
          <span>
            <Icon
              as={SiSwift}
              h="12"
              w="12"
              mr={2}
              mt={1}
              _hover={{ color: '#857359' }}
            />
          </span>
        </Tooltip>
      </Box>
    </>
  );
};

export default About;
