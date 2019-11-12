/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const moment = require('moment')
const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: process.env.SANITY_PROJECT,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN
})

const ministryQueries = `*[_type == "ministries"] {
  _id,
  "slug": slug.current,
  title
}`

// You can delete this file if you're not using it
exports.createPages = async ({ actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const { createPage } = actions

  const pageTemplate = path.resolve(`src/@templates/signage.js`)
  const result = await client.fetch(ministryQueries)
  // Query for recipe nodes to use in creating pages.

  return (
    // Create pages for each ministry
    result.forEach(node => {
      createPage({
        path: `/${node.slug}`,
        component: pageTemplate,
        context: {
          id: node._id,
          now: moment().format('YYYY-MM-DD'),
          title: node.title
        },
      })
    })
  )
}
