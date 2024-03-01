'use client';

import { Grid } from '@chakra-ui/react';

import Project from '~/lib/components/Project';
import { projectsData } from '~/lib/database/projects';

const Projects = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
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
        />
      ))}
    </Grid>
  );
};

export default Projects;
