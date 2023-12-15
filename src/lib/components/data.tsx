export interface ProjectProps {
  id: number;
  title: string;
  image: string;
  description: string;
  gitHubLink: string;
  tag: string;
}

export const projectsData = [
  {
    id: 1,
    title: 'RedCal',
    image: 'RedCal',
    description:
      'Simple app that help track menstrual cycle and predict the next\n' +
      '          period. Users can easily log the start and end dates of their periods,\n' +
      '          and the app will provide predicts including estimated start dates,\n' +
      '          duration, and average cycle length.',
    gitHubLink: 'https://github.com/olawanlejoel/Todo-List-App',
    tag: 'website',
  },
];
