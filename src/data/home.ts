// Homepage: a short intro and four tiles. Everything else lives on the destination pages.

export const intro = {
  name: 'Vidya Patil',
  title: 'Senior Manager, Documentation at Lyric',
  facts: ['Prague', 'Authorized to work in the Czech Republic'],
  line: 'A hands-on documentation leader. I write complex product guides, lead cross-functional release programs, and build prototypes and AI tools.',
};

export type Tile = {
  n: string;
  title: string;
  text: string;
  links: {label: string; to: string}[];
};

export const tiles: Tile[] = [
  {
    n: '01',
    title: 'Writing',
    text: 'User guides for a complex supply chain planning platform, with demos readers can try, and release notes that range from plain to playful.',
    links: [
      {label: 'User guides', to: '/writing/user-guides'},
      {label: 'Release notes', to: '/writing/release-notes'},
    ],
  },
  {
    n: '02',
    title: 'AI',
    text: 'What I build with AI: site changes I shipped, prototypes, Claude skills my team uses every day, release work automated from Jira, and an AI assistant I evaluated.',
    links: [{label: 'See the AI work', to: '/ai'}],
  },
  {
    n: '03',
    title: 'Program management',
    text: 'One platform rollout from planning to publication, the sprint checkpoints product managers work to, and how Product and Customer Success agree before each release.',
    links: [{label: 'See the program work', to: '/program-management'}],
  },
  {
    n: '04',
    title: 'Videos & podcasts',
    text: 'Release walkthroughs, product explainers and a release podcast, all published to customers.',
    links: [{label: 'Open the library', to: '/videos'}],
  },
];
