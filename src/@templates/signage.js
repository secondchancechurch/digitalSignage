import React from "react"
import Head from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'
import Carousel from 'react-img-carousel'


require('react-img-carousel/lib/carousel.css')
require('../styles/main.css')

const DigitalSignage = (props) => {
  if (!props.data.allSanitySignage) {
    return <div />
  }

  return (
    <>
      <Head>
        <title>{props.data.ministry.title || ''} Signage | Second Chance Church</title>
      </Head>
      <Carousel
        viewportWidth="100vw"
        cellPadding={0}
        infinite={true}
        dots={false}
        viewportHeight={"100vh"}
        arrows={false}
        autoplay={true}
        transition={'fade'}
        autoplaySpeed={10000}
        style={{
          slide: {
            opacity: 0,
            margin: 0
          },
          selectedSlide: {
            opacity: 1
          }
        }}
      >
        {props.data.allSanitySignage.nodes.map((item, i)  => (
          <div
            key={i}
            style={{
              height: '100vh',
              width: '100vw',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundImage: `url('${item.image ? item.image.asset.url : null}')`
            }}
          />
        ))}
      </Carousel>
    </>
  )
}

export const pageQuery = graphql`
  query GetContent($id: String!, $now: Date) {
    ministry: sanityMinistries(_id: { eq: $id }) {
      title
    }
    allSanitySignage(
      filter: {
        ministry: { _id: { eq: $id }},
        startDate: { lte: $now },
        endDate: { gte: $now }
      },
      sort: { fields: _createdAt, order: ASC}
    ) {
      nodes {
        title
        image {
          asset {
            url
          }
        }
      }
    }
  }`

export default DigitalSignage