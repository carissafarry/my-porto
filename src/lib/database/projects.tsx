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
    description: '',
    gitHubLink: 'https://github.com/petto-app/petto',
    publicationLink: 'https://apps.apple.com/ id/app/petto-life/id6450627184',
    tag: 'iOS',
  },
  {
    id: 7,
    title: 'BowlMo',
    image: '/projects/BowlMo.png',
    description: '',
    gitHubLink: 'https://github.com/ADA-MC3/Bowlmo',
    publicationLink: '',
    tag: 'iOS',
  },
  {
    id: 8,
    title: 'Moco Kids',
    image: '/projects/MocoKids.png',
    description: 'Kids Game',
    gitHubLink: 'https://github.com/moco-team/Moco',
    publicationLink:
      'https://apps.apple.com/id/app/moco-enchanted-story-world/id6471516950?itsct',
    tag: 'iOS',
  },
];
