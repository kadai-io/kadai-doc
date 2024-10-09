// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.github;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Documentation',
  tagline: 'KADAI Documentation',
  url: 'https://kadai-io.github.io',
  baseUrl: '/kadai-doc',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo-small.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'kadai-io', // Usually your GitHub org/user name.
  projectName: 'kadai-doc', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    ['drawio', {}],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'KADAI',
        hideOnScroll: true,
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo-small.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'user-guide/userGuideIntro',
            position: 'left',
            label: 'User Guide',
          },
          {
            type: 'doc',
            docId: 'contact-us/contactUs',
            position: 'left',
            label: 'Contact Us',
          },
          {
            href: 'https://github.com/kadai-io/kadai',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://kadai-io.azurewebsites.net/kadai/swagger-ui/index.html',
            label: 'REST API Doc',
            position: 'right',
          },
          {
            href: 'https://kadai-io.azurewebsites.net/kadai/docs/java/kadai-core/index.html',
            label: 'KADAI core Java Doc',
            position: 'right',
          },
          {
            type: 'doc',
            docId: 'demo-app/demoApp',
            label: 'Demo App',
            position: 'right',
          }
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: "Social",
            items: [
              {
                label: 'Contact Us',
                to: '/docs/contact-us/contactUs',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/kadai-io/kadai',
              }
            ]

          },
          {
            title: "Docs:",
            items: [

              {
                label: 'User Guide',
                to: '/docs/user-guide/userGuideIntro',
              },
              {
                label: 'REST API Documentation',
                href: 'https://kadai-io.azurewebsites.net/kadai/swagger-ui/index.html',
              },
              {
                label: 'KADAI core Java Documentation',
                href: 'https://kadai-io.azurewebsites.net/kadai/docs/java/kadai-core/index.html',
              }
            ]
          },
          {
            title: "Demo App",
            items: [

              {
                label: 'Demo App',
                to: 'docs/demo-app/demoApp'
              }
            ]
          }

        ],
        copyright: `Built with Docusaurus. KADAI is a brand name registered by envite consulting GmbH`,

      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
