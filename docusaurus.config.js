// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OPEVA - Filo Yönetim Sistemi ve Rotalama',
  tagline: 'Elektrikli Araç Rotalama ve Operasyonel Dökümantasyon',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  // Set the production url of your site here
  url: 'https://pilestin.github.io',
  baseUrl: '/opeva-routing-documentation/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // GitHub pages deployment config
  organizationName: 'Pilestin', // GitHub kullanıcı adınız
  projectName: 'opeva-routing-documentation', // Repo adınız

  onBrokenLinks: 'warn', // 'throw' yerine 'warn' yapın

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'OPEVA',
        logo: {
          alt: 'OPEVA Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/docs/overview/introduction',
            label: 'Overview',
            position: 'left',
          },
          {
            to: '/docs/platform/',
            label: 'Platform',
            position: 'left',
          },
          {
            to: '/docs/ecosystem/',
            label: 'Ecosystem',
            position: 'left',
          },
          {
            to: '/docs/resources/',
            label: 'Resources',
            position: 'left',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'OPEVA Project',
            items: [
              {
                label: 'Overview',
                to: '/docs/overview/introduction',
              },
              {
                label: 'Platform Architecture',
                to: '/docs/platform/',
              },
              {
                label: 'Ecosystem Tools',
                to: '/docs/ecosystem/',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Research Papers',
                to: '/docs/resources/research/papers',
              },
              {
                label: 'Media & Videos',
                to: '/docs/resources/media/videos',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} OPEVA Documentation Portal. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
