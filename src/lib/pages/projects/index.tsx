'use client';

import { Box, Grid, Image } from '@chakra-ui/react';
import { useState } from 'react';

import Project from '~/lib/components/Project';
import { projectsData } from '~/lib/database/projects';

const Projects = () => {
  const [lightboxDisplay, setLightBoxDisplay] = useState(false);
  const [imageToShow, setImageToShow] = useState('');

  const hideLightBox = () => {
    setLightBoxDisplay(false);
  };

  const showImage = (image: string) => {
    setImageToShow(image);
    setLightBoxDisplay(true);
  };

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={10} mb={10}>
        {projectsData.map((project) => (
          <Project
            key={project.id}
            id={project.id}
            title={project.title}
            image={project.image}
            description={project.description}
            gitHubLink={project.gitHubLink}
            publicationLink={project.publicationLink}
            tag={project.tag}
            showImage={showImage}
          />
        ))}
      </Grid>

      {lightboxDisplay ? (
        <Box
          id="lightbox"
          onClick={hideLightBox}
          position="fixed"
          zIndex={1}
          top={0}
          left={0}
          width="full"
          height="full"
          bgColor="gray"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Image
            w="full"
            h="90vh"
            fit="cover"
            objectPosition="center"
            objectFit="contain"
            src={imageToShow}
            alt="avatar"
            cursor={lightboxDisplay ? 'pointer' : 'auto'}
          />
        </Box>
      ) : (
        ''
      )}
    </>
  );
};

export default Projects;
