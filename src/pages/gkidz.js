import React from "react"
import Head from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'
import Carousel from 'react-img-carousel'

require('react-img-carousel/lib/carousel.css')

const GET_SLIDES = graphql`{
  craft {
    entries(site: "signage", section: "digitalSignage") {
      title
      ... on CRAFT_digitalSignage_digitalSignage_Entry {
        podcastImage {
          url
        }
      }
    }
  }
}`

const DigitalSignage = () => {
  const { craft: data } = useStaticQuery(GET_SLIDES)

  return (
    <>
      <Head>
        <title>gKidz Signage | Second Chance Church</title>
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
        {data.entries.map((item, i)  => (
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

export default DigitalSignage
