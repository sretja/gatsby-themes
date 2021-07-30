/** @jsx jsx */
import { Flex, Box, jsx, Themed, Container, useColorMode } from "theme-ui"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage as Img, IGatsbyImageData } from "gatsby-plugin-image"
import { Circle, Donut } from "./shapes"
import iconExternal from "../icons/icon-external-window.svg"

type Props = {
  allThemes: {
    nodes: {
      title: string
      url: string
      preview: string
      description: string
      shapes: {
        color:
          | `blue`
          | `orange`
          | `pink`
          | `purple`
          | `gray`
          | `black`
          | `red`
          | `yellow`
          | `green`
          | `indigo`
          | `teal`
          | `darkIndigo`
          | `strangerThings`
        type: `circle` | `donut`
        size: string[]
        xOffset: string[]
        yOffset: string[]
        opacity: number
      }[]
      image: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
    }[]
  }
}

const cardStyle = {
  position: `relative`,
  transition: `all 0.3s ease-in-out`,
  display: `block`,
  boxShadow: [`md`, `md`, `lg`],
  zIndex: 2,
  borderRadius: `lg`,
  "&:hover": {
    transform: `translateY(-4px)`,
    boxShadow: [`lg`, `lg`, `xl`],
    "[data-name='card-overlay']": {
      opacity: 1,
    },
  },
  ".gatsby-image-wrapper": {
    display: `block !important`,
  },
  ".gatsby-image-wrapper [data-placeholder-image], .gatsby-image-wrapper [data-main-image]": {
    borderRadius: `lg`,
  },
}

const Listing = () => {
  const {
    allThemes: { nodes: themes },
  } = useStaticQuery<Props>(ListingQuery)

  const [mode] = useColorMode()

  let buttonStyles = {}
  let overlayStyles = {}

  if (mode === `strangerThings`) {
    buttonStyles = {
      background: `black`,
      border: `2px solid #E7251D`,
    }
    overlayStyles = {
      backgroundColor: `rgba(231, 37, 29, 0.9)`,
    }
  }

  return (
    <Container sx={{ py: 4 }}>
      {themes.map((theme, index) => {
        const isEven = index % 2 === 0

        return (
          <Box
            key={theme.title}
            sx={{
              py: [5, 5, 6],
              display: `grid`,
              gridTemplateColumns: [`1fr`, `1fr`, `1fr 1fr`],
              gridGap: [3, 4, 5],
              alignItems: `flex-start`,
            }}
          >
            <div
              sx={{
                width: `100%`,
                maxWidth: [`600px`, `900px`, `600px`],
                position: `relative`,
                order: isEven ? 1 : [1, 1, 2],
              }}
            >
              {theme.shapes.map((shape) => {
                switch (shape.type) {
                  case `circle`:
                    return (
                      <Circle
                        key={`${shape.size}-${shape.color}-${shape.xOffset}`}
                        size={shape.size}
                        color={shape.color}
                        left={isEven ? shape.xOffset : `unset`}
                        right={isEven ? `unset` : shape.xOffset}
                        top={shape.yOffset}
                        sx={{ zIndex: 0, opacity: shape.opacity }}
                      />
                    )
                  case `donut`:
                    return (
                      <Donut
                        key={`${shape.size}-${shape.color}-${shape.xOffset}`}
                        width="20px"
                        size={shape.size}
                        color={shape.color}
                        left={isEven ? shape.xOffset : `unset`}
                        right={isEven ? `unset` : shape.xOffset}
                        top={shape.yOffset}
                        sx={{ zIndex: 0, opacity: shape.opacity }}
                      />
                    )
                  default:
                    return null
                }
              })}
              <a
                href={theme.preview}
                rel="noopener noreferrer"
                target="_blank"
                aria-label={`Visit a preview of theme ${theme.title}`}
                sx={{
                  ...cardStyle,
                  "[data-name='card-overlay']": {
                    position: `absolute`,
                    borderRadius: `lg`,
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    zIndex: 10,
                    backgroundColor: `rgba(90, 103, 216, 0.9)`,
                    color: `white`,
                    fontFamily: `body`,
                    fontSize: 4,
                    display: `flex`,
                    justifyContent: `center`,
                    alignItems: `center`,
                    transition: `all 0.3s ease-in-out`,
                    opacity: 0,
                    ...overlayStyles,
                  },
                }}
              >
                <div data-name="card-overlay" aria-hidden>
                  <div sx={{ display: `flex`, alignItems: `center` }}>
                    <img width="40" height="40" sx={{ mr: 3 }} alt="" src={iconExternal} /> Preview
                  </div>
                </div>
                {theme?.image?.childImageSharp?.gatsbyImageData && (
                  <Img image={theme.image.childImageSharp.gatsbyImageData} alt="" />
                )}
              </a>
            </div>
            <Flex sx={{ flexDirection: `column`, alignItems: `flex-start`, order: isEven ? 2 : [2, 2, 1] }}>
              <Themed.h1 as="h3">{theme.title}</Themed.h1>
              <Themed.p>{theme.description}</Themed.p>
              <a href={theme.url} sx={{ variant: `buttons.primary`, mt: 3, ...buttonStyles }}>
                Visit Website
              </a>
            </Flex>
          </Box>
        )
      })}
      <p sx={{ mt: 6, fontSize: [1, 2, 2, 3], textAlign: `center` }}>
        <span sx={{ fontWeight: `bold` }}>We are ridiculously client-focused</span> <br /> We know how many nights
        you've spent rehearsing your speech, or fighting with a tiny detail <br />
        that probably no one is going to notice. We've been there, we know the struggle. We build products close to our
        hearts, and put everything we’ve got into them, so the final products we deliver speak for themselves. <br />
        <br />
        Our workflow is not standard, and neither are we -- nor the brands we help create. !
      </p>
    </Container>
  )
}

export default Listing

const ListingQuery = graphql`
  query {
    allThemes(sort: { fields: title, order: ASC }) {
      nodes {
        title
        url
        preview
        description
        shapes {
          color
          type
          size
          xOffset
          yOffset
          opacity
        }
        image {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 900, quality: 90, aspectRatio: 1.7, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
  }
`
