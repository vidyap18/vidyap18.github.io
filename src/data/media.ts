// Video and podcast library. All media are hosted publicly on Wistia by the company.

export type Media = {id: string; title: string; length: string; text: string; thumb: string};
export type Group = {title: string; intro: string; items: Media[]};

const T = 'https://embed-ssl.wistia.com/deliveries/';

export const featured = {
  id: 'nh4bb7rchx',
  title: 'Development and production environments: release walkthrough',
  length: '3:38',
  text: 'A platform change for every customer, explained for the rollout. Presented by the product leader from the briefing I wrote. I set up and recorded the session.',
};

export const groups: Group[] = [
  {
    title: 'Release highlights and product explainers',
    intro: 'A whole release in a minute, and how a feature works in two to four minutes.',
    items: [
      {id: 'b7rydgtgyf', title: 'October 2026 release highlights', length: '1:15', text: 'A whole release in a minute, with links into the docs. It opens the docs site home page.', thumb: T + '8d202701850672fe5690386beb382664.jpg'},
      {id: 'a9vkvljckd', title: 'The new Science Notes interface', length: '4:26', text: 'A tour of the redesigned interface for the platform’s pre-built analytics notes.', thumb: T + '114cb44bf686230ef7d605f179293c68c11aa22a.jpg'},
      {id: 'knohl2w7z5', title: 'Semantic model introduction', length: '1:58', text: 'An introduction to the semantic model, presented by a synthetic presenter.', thumb: T + 'd01b9c33bad3ce4b47ad85197667f3a24c2398e3.jpg'},
      {id: 'rfbmiks1bb', title: 'Adding notes inline', length: '1:43', text: 'A how-to in under two minutes.', thumb: T + '60fd335c4ea21d64d9136eb0b957353a6eaa3383.jpg'},
    ],
  },
  {
    title: 'Podcasts',
    intro: 'A two-host release podcast, scripted with Claude and voiced with ElevenLabs.',
    items: [
      {id: 'lwy45h61u4', title: 'Episode 1: card caching', length: '4:56', text: 'The first episode: why a transform used to make you wait, and what caching changed.', thumb: T + '35ee3c5b0facc81109fd5ba91a31b867.jpg'},
      {id: 'qd8skyd6d2', title: 'The Science Notes experience', length: '3:17', text: 'The redesigned notes experience, as a conversation.', thumb: T + '62d11147876cfd395d51f0b2ffd3f9e9.jpg'},
      {id: 'ccesr9g9ae', title: 'The file upload wizard', length: '2:11', text: 'A new way to bring files into the platform, explained in two minutes.', thumb: ''},
    ],
  },
];
