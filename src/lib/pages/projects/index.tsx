import Project from '~/lib/components/Project';
import { projectsData } from '~/lib/database/projects';

const Projects = () => {
  return (
    <>
      {projectsData.map((project) => (
        <Project
          key={project.id}
          id={project.id}
          title={project.title}
          image={project.image}
          description={project.description}
          gitHubLink={project.gitHubLink}
          tag={project.tag}
        />
      ))}
    </>
  );
};

export default Projects;
