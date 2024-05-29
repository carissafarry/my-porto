import { Box, Flex, Icon, Image, chakra, Spacer } from '@chakra-ui/react';
import Link from 'next/link';
import { AiFillGithub } from 'react-icons/ai';
import { LuLink2 } from 'react-icons/lu';

import type { ProjectProps } from '~/lib/database/projects';

const Project = (projectData: ProjectProps) => {
  const data = projectData;

  const showImage = () => {
    data.showImage(data.image);
  };

  return (
    <Box
      w="xs"
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
        src={`${data.image}`}
        alt="avatar"
        cursor="pointer"
        onClick={() => showImage()}
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
          {`${data.title}`}
        </chakra.h1>

        <chakra.p
          py={2}
          mb={3}
          color="gray.700"
          _dark={{
            color: 'gray.400',
          }}
        >
          {data.description}
        </chakra.p>

        <Flex>
          <Flex
            alignItems="center"
            color="gray.700"
            _dark={{
              color: 'gray.200',
            }}
          >
            {data.gitHubLink && (
              <Link href={`${data.gitHubLink}`} target="_blank">
                <Icon as={AiFillGithub} h={6} w={6} mr={2} />
              </Link>
            )}

            {data.publicationLink && (
              <Link href={`${data.publicationLink}`} target="_blank">
                <Icon as={LuLink2} h={6} w={6} mr={2} />
              </Link>
            )}
          </Flex>

          <Spacer />
          <chakra.p>#{data.tag}</chakra.p>
        </Flex>
      </Box>
    </Box>
  );
};

export default Project;
