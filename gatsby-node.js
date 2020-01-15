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

const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

// You can delete this file if you're not using it
exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const { createPage } = actions

  const pageTemplate = path.resolve(`src/@templates/signage.js`)
  // const result = await client.fetch(ministryQueries)
  const result = await wrapper(
    graphql(`
      {
        craft {
          categories {
            title
            id
            slug
          }
        }
      }
    `)
  )
  // Query for recipe nodes to use in creating pages.

  return (
    // Create pages for each ministry
    result.data.craft.categories.forEach(node => {
      createPage({
        path: `/${node.slug}`,
        component: pageTemplate,
        context: {
          id: [node.id],
          title: node.title
        },
      })
    })
  )
}
