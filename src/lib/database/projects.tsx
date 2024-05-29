export interface ProjectProps {
  id: number;
  title: string;
  image: string;
  description: string;
  gitHubLink: string;
  publicationLink: string;
  tag: string;
  showImage: (image: string) => void;
}

export const projectsData = [
  {
    id: 1,
    title: 'Cloethes',
    image: '/projects/Cloethes.png',
    description: 'Clothes E-Commerce Web App using native PHP.',
    gitHubLink: 'https://github.com/carissafarry/Cloethes',
    publicationLink: '',
    tag: 'website',
  },
  {
    id: 2,
    title: 'CBT',
    image: '/projects/CBT.png',
    description: 'Computer-Based Test using Laravel.',
    gitHubLink: '',
    publicationLink: '',
    tag: 'website',
  },
  {
    id: 3,
    title: 'SIAMI',
    image: '/projects/siami.png',
    description:
      'Internal Quality Audit Information System using Native PHP MVC Framework.',
    gitHubLink: 'https://github.com/carissafarry/siami',
    publicationLink: '',
    tag: 'website',
  },
  {
    id: 4,
    title: 'SIKA',
    image: '/projects/SIKA.png',
    description: 'Contractor Order Information System using Laravel.',
    gitHubLink: '',
    publicationLink: '',
    tag: 'website',
  },
  {
    id: 5,
    title: 'RedCal',
    image: '/projects/RedCal.png',
    description:
      'Simple app that help track menstrual cycle and predict the next\n' +
      '          period. Users can easily log the start and end dates of their periods,\n' +
      '          and the app will provide predicts including estimated start dates,\n' +
      '          duration, and average cycle length.',
    gitHubLink: 'https://github.com/carissafarry/RedCal',
    publicationLink: 'https://apps.apple.com/id/app/redcal/id6473384469',
    tag: 'iOS',
  },
  {
    id: 6,
    title: 'Petto Life',
    image: '/projects/PettoLife.png',
    description:
      'An iOS app for young adults who have sedentary job that can remind users to move/relax their muscle by doing stretches periodically to prevent body from being sedentary in the form of virtual pet (game).\n',
    gitHubLink: 'https://github.com/petto-app/petto',
    publicationLink: 'https://apps.apple.com/ id/app/petto-life/id6450627184',
    tag: 'iOS',
  },
  {
    id: 7,
    title: 'BowlMo',
    image: '/projects/BowlMo.png',
    description:
      'An interactive bowling game featuring advanced physics simulation, 3D environments and real-time feedback. Players can control the game using their Apple Watch, mimicking the natural movements of real-life bowling.',
    gitHubLink: 'https://github.com/ADA-MC3/Bowlmo',
    publicationLink: '',
    tag: 'iOS',
  },
  {
    id: 8,
    title: 'Moco Kids',
    image: '/projects/MocoKids.png',
    description:
      'An iOS/iPadOS app for early primary students that helps them practice early reading comprehension skill by answering story related questions using Story Card, Maze Game, and AR world with a Storybook concept.',
    gitHubLink: 'https://github.com/moco-team/Moco',
    publicationLink:
      'https://apps.apple.com/id/app/moco-enchanted-story-world/id6471516950?itsct',
    tag: 'iOS',
  },
];
