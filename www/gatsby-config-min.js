require(`dotenv`).config()
const thoughtsFeed = require(`./src/utils/feed`)
const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE
const googleAnalyticsTrackingId = process.env.GOOGLE_ANALYTICS_ID
const githubToken = process.env.GITHUB_TOKEN

module.exports = {
  siteMetadata: {
    title: `tala. digital Jamstack & Webflow Development Experts`,
    titleAlt: `tala.digital | Jamstack & Webflow Web Development Experts`,
    siteUrl: `https://tala.digital`,
    description: `Creating amazing websites built on Jamstack and with Webflow to help startups and enterprises connect with their customers, increasing conversions and enable growth`,
    headline: `We are YOUR Web Design & Development Experts`,
    language: `en`,
    image: `/banner.png`,
    author: `@igor`,
  },
  flags: { DEV_SSR: !1, FAST_DEV: !0 },
  plugins: [
    { resolve: `gatsby-source-filesystem`, options: { name: `data`, path: `${__dirname}/data` } },
    { resolve: `gatsby-source-filesystem`, options: { name: `thoughts`, path: `${__dirname}/thoughts` } },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: !0,
        preconnect: [`https://fonts.gstatic.com`],
        interval: 300,
        timeout: 3e4,
        web: [
          {
            name: `IBM Plex Sans`,
            file: `https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap`,
          },
        ],
      },
    },
    githubToken && {
      resolve: `gatsby-source-github-api`,
      options: {
        token: githubToken,
        variables: {},
        graphQLQuery: `\n          query {\n            repository(owner: "sretja", name: "gatsby-themes") {\n              stargazers {\n                totalCount\n              }\n            }\n          }\n        `,
      },
    },
    googleAnalyticsTrackingId && {
      resolve: `gatsby-plugin-google-analytics`,
      options: { trackingId: process.env.GOOGLE_ANALYTICS_ID },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        lessBabel: !0,
        gatsbyRemarkPlugins: [`gatsby-remark-autolink-headers`, `gatsby-remark-smartypants`],
        plugins: [`gatsby-remark-autolink-headers`, `gatsby-remark-smartypants`],
      },
    },
    { resolve: `gatsby-transformer-yaml`, options: { typeName: `Themes` } },
    `gatsby-plugin-image`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-theme-ui`,
    { resolve: `gatsby-plugin-feed`, options: thoughtsFeed },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Free & Open Source Gatsby Themes by LekoArts`,
        short_name: `GatsbyThemes`,
        description: `Get high-quality and customizable Gatsby themes to quickly bootstrap your website! Choose from many professionally created and impressive designs with a wide variety of features and customization options. Use Gatsby Themes to take your project to the next level and let you and your customers take advantage of the many benefits Gatsby has to offer.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#5A67D8`,
        display: `standalone`,
        icons: [
          { src: `/android-chrome-192x192.png`, sizes: `192x192`, type: `image/png` },
          { src: `/android-chrome-512x512.png`, sizes: `512x512`, type: `image/png` },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: { analyzerMode: `static`, reportFilename: `_bundle.html`, openAnalyzer: !1 },
    },
  ].filter(Boolean),
}
