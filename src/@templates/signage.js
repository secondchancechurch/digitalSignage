import React from "react"
import Head from 'react-helmet'
import { graphql } from 'gatsby'
import Carousel from 'react-img-carousel'

require('react-img-carousel/lib/carousel.css')
require('../styles/main.css')

const DigitalSignage = (props) => {
  if (!props.data.craft) {
    return <div />
  }

  console.log(props)

  return (
    <>
      <Head>
        <title>{props.pageContext.title || ''} Signage | Second Chance Church</title>
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
        {props.data.craft.entries.map((item, i)  => (
          <div
            key={i}
            style={{
              height: '100vh',
              width: '100vw',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundImage: `url('${item.podcastImage ? item.podcastImage[0].url : null}')`
            }}
          />
        ))}
      </Carousel>
    </>
  )
}

export const pageQuery = graphql`
  query GetContent($id: [CRAFT_QueryArgument]) {
    craft {
      entries(site: "signage", section: "digitalSignage", ministry: $id) {
        title
        ... on CRAFT_digitalSignage_digitalSignage_Entry {
          podcastImage {
            url(width: 3048, immediately: true)
          }
        }
      }
    }
  }`

export default DigitalSignage
