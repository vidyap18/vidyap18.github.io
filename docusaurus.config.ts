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

  // Visit counting with GoatCounter: no cookies, no personal data. See src/clientModules/goatcounter.ts.
  scripts: [
    {
      src: 'https://gc.zgo.at/count.js',
      async: true,
      'data-goatcounter': 'https://vidyap18.goatcounter.com/count',
    },
  ],
  clientModules: ['./src/clientModules/goatcounter.ts'],

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
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400..700;1,14..32,400..500&family=JetBrains+Mono:wght@400;500&display=swap',
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
        // Tailored CV versions are hidden: keep them out of the sitemap.
        sitemap: {ignorePatterns: ['/cv/**']},
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
            {label: 'User Guides', to: '/writing/user-guides'},
            {label: 'Release Notes', to: '/writing/release-notes'},
            {label: 'API Documentation', to: '/samples/api'},
          ],
        },
        {to: '/work', label: 'Case Studies', position: 'left'},
        {to: '/ai', label: 'AI', position: 'left'},
        {to: '/program-management', label: 'Program Management', position: 'left'},
        {to: '/videos', label: 'Videos & Podcasts', position: 'left'},
        {to: '/cv', label: 'CV', position: 'left'},
        {href: 'https://www.linkedin.com/in/vidyapatil18', label: 'LinkedIn', position: 'right'},
        {href: 'mailto:vidyapatil123@gmail.com', label: 'Email', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Work',
          items: [
            {label: 'Case Studies', to: '/work'},
            {label: 'AI', to: '/ai'},
            {label: 'Program Management', to: '/program-management'},
          ],
        },
        {
          title: 'Writing',
          items: [
            {label: 'User Guides', to: '/writing/user-guides'},
            {label: 'Release Notes', to: '/writing/release-notes'},
            {label: 'API Documentation', to: '/samples/api'},
          ],
        },
        {
          title: 'Contact',
          items: [
            {label: 'Email', href: 'mailto:vidyapatil123@gmail.com'},
            {label: 'LinkedIn', href: 'https://www.linkedin.com/in/vidyapatil18'},
            {label: 'CV', to: '/cv'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Vidya Patil · Prague · Product names and data in samples are masked or fictional.`,
    },
    prism: {theme: prismThemes.github, darkTheme: prismThemes.dracula, additionalLanguages: ['bash', 'json', 'yaml', 'python']},
    tableOfContents: {minHeadingLevel: 2, maxHeadingLevel: 4},
  } satisfies Preset.ThemeConfig,
};

export default config;
