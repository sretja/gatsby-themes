/** @jsx jsx */
import { Box, Container, Flex, jsx, Themed } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"
import ThreeDModel from "./3d-model"
import { Circle, Donut } from "./shapes"
import CircleGrid from "../icons/circle-grid"
import Star from "../icons/star"
import { down, up } from "../styles/animations"
import useResponsive from "../hooks/use-responsive"

type StarsType = {
  githubData: {
    data: {
      repository: {
        stargazers: {
          totalCount: number
        }
      }
    }
  }
}

const Hero = () => {
  const { isBigScreen } = useResponsive()
  const data = useStaticQuery<StarsType>(graphql`
    {
      githubData {
        data {
          repository {
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  `)
  const starsCount = data?.githubData?.data?.repository?.stargazers?.totalCount

  return (
    <div>
      <Container as="section" data-name="hero" sx={{ my: [5, 6], mb: [6, 7] }}>
        <Flex sx={{ justifyContent: `space-between` }}>
          <Box>
            <Box sx={{ maxWidth: `490px` }}>
              <Themed.h1>We are YOUR Web Design & Development Experts</Themed.h1>
              <Themed.p sx={{ color: `dark`, mt: 3, mb: 4 }}>
                Creating <span sx={{ fontWeight: `bold` }}>amazing websites</span> to help{` `}
                <span sx={{ fontWeight: `bold` }}>startups and enterprises</span> connect with their customers,
                increasing conversions and enable growth
              </Themed.p>
            </Box>
            <Box>
              <a href="https://booking.tala.digital" sx={{ variant: `buttons.primary` }}>
                Let's talk
              </a>
            </Box>
          </Box>
          {isBigScreen && <ThreeDModel />}
        </Flex>
      </Container>
      <div data-name="shapes">
        <Circle
          size="210px"
          color="orange"
          top="170px"
          left={[`-185px`, `-185px`, `-185px`, `-120px`]}
          sx={{ display: [`none`, `none`, `none`, `block`] }}
        />
        <Circle size="35px" color="blue" top={[`165px`, `130px`]} left={[`-5px`, `40px`]} />
        <Circle size="120px" color="pink" top="620px" right={[`-80px`, `50px`, `90px`]} />
        <Circle
          size="40px"
          color="green"
          top="750px"
          right={[`30px`, `210px`, `250px`]}
          sx={{ animation: `${up} 6s ease-in-out infinite alternate` }}
        />
        <Donut
          size="30px"
          color="green"
          width="5px"
          top="465px"
          left={[`-15px`, `-5px`, `-5px`, `20px`]}
          sx={{ display: [`none`, `none`, `none`, `block`] }}
        />
        <Donut
          size={[`130px`, `130px`, `230px`]}
          color="purple"
          width={[`20px`, `20px`, `50px`]}
          top={[`700px`, `668px`]}
          left={[`-75px`, `-75px`, `-102px`]}
          sx={{ animation: `${down} 10s ease-in-out infinite alternate` }}
        />
        <CircleGrid color="indigo" size={175} top="220px" right={[`-180px`, `-120px`, `-120px`, `-70px`]} />
      </div>
    </div>
  )
}

export default Hero
