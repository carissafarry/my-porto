import { Box, Flex, Icon, Image, chakra, Spacer } from '@chakra-ui/react';
import Link from 'next/link';
import { AiFillGithub, AiOutlineShareAlt } from 'react-icons/ai';

import type { ProjectProps } from '~/lib/database/projects';

const Project = (projectData: ProjectProps) => {
  const data = projectData;

  return (
    <Box
      w="sm"
      mx="auto"
      bg="white"
      _dark={{
        bg: 'gray.800',
      }}
      shadow="lg"
      rounded="lg"
      overflow="hidden"
    >
      <Image
        w="full"
        h={56}
        fit="cover"
        objectPosition="center"
        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
        alt="avatar"
      />

      <Box py={4} px={6}>
        <chakra.h1
          fontSize="xl"
          fontWeight="bold"
          color="gray.800"
          _dark={{
            color: 'white',
          }}
        >
          RedCal
        </chakra.h1>

        <chakra.p
          py={2}
          mb={3}
          color="gray.700"
          _dark={{
            color: 'gray.400',
          }}
        >
          Simple app that help track menstrual cycle and predict the next
          period. Users can easily log the start and end dates of their periods,
          and the app will provide predicts including estimated start dates,
          duration, and average cycle length.
        </chakra.p>

        <Flex>
          <Flex
            alignItems="center"
            color="gray.700"
            _dark={{
              color: 'gray.200',
            }}
          >
            <Icon as={AiOutlineShareAlt} h={6} w={6} mr={2} />
            <Link href={`${data.gitHubLink}`}>
              <Icon as={AiFillGithub} h={6} w={6} mr={2} />
            </Link>
          </Flex>

          <Spacer />
          <chakra.p>#website</chakra.p>
        </Flex>
      </Box>
    </Box>
  );
};

export default Project;
