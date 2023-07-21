import { Box, Flex, chakra, HStack, Button, Icon } from '@chakra-ui/react';
import { BiLogoReact, BiLogoTypescript, BiLogoVuejs } from 'react-icons/bi';
import { SiNextdotjs, SiSwift } from 'react-icons/si';

const About = () => {
  return (
    <Flex
      minHeight="100vh"
      px={4}
      py={32}
      mx="auto"
      bgGradient="linear(to-r, orange.100, purple.200, white)"
    >
      <Box mx="auto" w={9 / 12}>
        <chakra.h1
          mb={5}
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
          Hai! I am Rissa :)
        </chakra.h1>
        <chakra.p
          mb={5}
          color="blackAlpha.800"
          fontSize={{
            md: 'lg',
          }}
        >
          I am a fresh graduate student who has an interest in the back end. I
          have studied this field for the last 2 years, where at first I tried
          to explore the front-end side, but the experience I gained when
          working on internship or freelance projects, made me interested in the
          back-end side, and really helped me to adapt quickly with new science
          and technology. I am a person who can work together independently or
          in a team, as well as having problem solving skills and being open to
          new ideas and solutions. If you think I can help, I&apos;m very open
          opportunities you provide!
        </chakra.p>
        <HStack mb="20">
          <Button
            as="a"
            w={{
              // base: 'full',
              sm: 'auto',
            }}
            variant="outline"
            colorScheme="yellow"
            size="lg"
            // mb={{
            //   base: 2,
            //   sm: 0,
            // }}
            mb="20"
            cursor="pointer"
          >
            See My CV
          </Button>
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
        <Flex
          alignItems="center"
          color="gray.700"
          _dark={{
            color: 'gray.200',
          }}
        >
          <Icon
            as={BiLogoReact}
            h="16"
            w="16"
            mr={2}
            mt={1}
            _hover={{ color: '#857359' }}
          />
          <Icon
            as={SiNextdotjs}
            h="12"
            w="12"
            mr={2}
            _hover={{ color: '#857359' }}
          />
          <Icon
            as={BiLogoTypescript}
            h="16"
            w="16"
            _hover={{ color: '#857359' }}
          />
          <Icon
            as={BiLogoVuejs}
            h="16"
            w="16"
            mr={2}
            _hover={{ color: '#857359' }}
          />
          <Icon
            as={SiSwift}
            h="12"
            w="12"
            mr={2}
            _hover={{
              color: '#857359',
            }}
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export default About;
