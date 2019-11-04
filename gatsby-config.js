require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Second Chance Church Digital Signage`,
    description: `Second Chance Church Digital Signage`,
    author: `@edolyne`,
    siteUrl: `https://signage.mysecondchancechurch.com`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `scc-digital-signage`,
        short_name: `SCC Signage`,
        start_url: `/`,
        background_color: `#C8102E`,
        theme_color: `#C8102E`,
        display: `minimal-ui`,
        icon: `src/images/SCC-fav.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "CRAFT",
        // This is field under which it's accessible
        fieldName: "craft",
        // Url to query from
        url: process.env.APOLLO_ENDPOINT,
        headers: {
          // Learn about environment variables: https://gatsby.dev/env-vars
          Authorization: `Bearer ${process.env.APOLLO_KEY}`,
        },
        refetchInterval: 60
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: process.env.SANITY_PROJECT,
        dataset: process.env.SANITY_DATASET,
        // a token with read permissions is required
        // if you have a private dataset
        token: process.env.SANITY_TOKEN,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', disallow: ['/','*'] }]
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
