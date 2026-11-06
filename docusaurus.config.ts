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
        href: 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap',
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
        {
          type: 'dropdown',
          label: 'Writing',
          position: 'left',
          items: [
            {label: 'User guides', to: '/writing/user-guides'},
            {label: 'Release notes', to: '/writing/release-notes'},
            {label: 'All writing samples', to: '/samples'},
          ],
        },
        {to: '/ai', label: 'AI', position: 'left'},
        {to: '/program-management', label: 'Program management', position: 'left'},
        {to: '/videos', label: 'Videos & podcasts', position: 'left'},
        {to: '/cv', label: 'CV', position: 'left'},
        {href: 'https://www.linkedin.com/in/vidyapatil18', label: 'LinkedIn', position: 'right'},
        {href: 'mailto:vidyapatil123@gmail.com', label: 'Email', position: 'right'},
      ],
    },
    footer: {
      style: 'light',
      links: [],
      copyright: `Vidya Patil · Prague · ${new Date().getFullYear()} · <a href="/work">Case studies</a> · <a href="/samples">Writing samples</a> · Built with Docusaurus, deployed from GitHub`,
    },
    prism: {theme: prismThemes.github, darkTheme: prismThemes.dracula, additionalLanguages: ['bash', 'json', 'yaml', 'python']},
    tableOfContents: {minHeadingLevel: 2, maxHeadingLevel: 4},
  } satisfies Preset.ThemeConfig,
};

export default config;
