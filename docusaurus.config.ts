import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// GitHub Pages: set GITHUB_USER (and optionally REPO) at build time.
// Default assumes a user site: https://<user>.github.io/
const githubUser = process.env.GITHUB_USER ?? 'vidyapatil';
const repo = process.env.REPO ?? `${githubUser}.github.io`;
const isProjectSite = !repo.endsWith('.github.io');

const config: Config = {
  title: 'Vidya Patil',
  tagline: 'Senior technical writer and documentation lead',
  favicon: 'img/favicon.svg',
  future: {v4: true},

  url: `https://${githubUser}.github.io`,
  baseUrl: isProjectSite ? `/${repo}/` : '/',
  organizationName: githubUser,
  projectName: repo,
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {hooks: {onBrokenMarkdownLinks: 'warn'}},

  i18n: {defaultLocale: 'en', locales: ['en']},

  headTags: [
    {
      tagName: 'link',
      attributes: {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    },
    {
      tagName: 'link',
      attributes: {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'},
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap',
      },
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          showLastUpdateTime: false,
          breadcrumbs: true,
        },
        blog: false,
        theme: {customCss: './src/css/custom.css'},
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {respectPrefersColorScheme: true},
    docs: {sidebar: {hideable: false, autoCollapseCategories: true}},
    navbar: {
      title: 'Vidya Patil',
      hideOnScroll: false,
      items: [
        {to: '/work', label: 'Work', position: 'left', activeBaseRegex: '^/work'},
        {to: '/samples', label: 'Writing samples', position: 'left', activeBaseRegex: '^/samples'},
        {to: '/cv', label: 'CV', position: 'left'},
        {href: 'https://www.linkedin.com/in/vidyapatil18', label: 'LinkedIn', position: 'right'},
        {href: 'mailto:vidyapatil123@gmail.com', label: 'Email', position: 'right'},
      ],
    },
    footer: {
      style: 'light',
      links: [],
      copyright: `Vidya Patil · Prague · ${new Date().getFullYear()} · Built with Docusaurus, deployed from GitHub.`,
    },
    prism: {theme: prismThemes.github, darkTheme: prismThemes.dracula, additionalLanguages: ['bash', 'json', 'yaml', 'python']},
    tableOfContents: {minHeadingLevel: 2, maxHeadingLevel: 4},
  } satisfies Preset.ThemeConfig,
};

export default config;
