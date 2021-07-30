/** @jsx jsx */
import { Container, jsx, Themed, Box, Flex, useColorMode } from "theme-ui"
import { Circle, Donut } from "./shapes"
import { down, upWide } from "../styles/animations"
import Logo from "../icons/logo"
import CircleGrid from "../icons/circle-grid"

const AboutMe = () => {
  const [mode] = useColorMode()

  const isStrange = mode === `strangerThings`

  return (
    <section data-name="about-me" sx={{ position: `relative`, py: 6 }}>
      <Container>
        <div sx={{ maxWidth: `760px` }}>
          <Themed.h1 as="h2">WHO WE ARE</Themed.h1>
          <Themed.p>
            Hi{` `}
            <span role="img" aria-label="Hand Wave">
              👋
            </span>
          </Themed.p>
          <Themed.p>tala.digital is unconventional at heart</Themed.p>
          <Themed.p>
            tala.digital is a Croatian based design-led technology agency. We create digital products, platforms, and
            divergent eCommerce experiences that differentiate brands from the noise.
          </Themed.p>
          <Themed.p>
            Our digital strategists, creatives, and technologists work lockstep with our clients in creating digital
            experiences that speaks to cultural relevancy. Whereas most merely design and build, we architect digital
            experiences that shape how brands engage with their customers.
          </Themed.p>
          <Themed.p>
            We’re building a human-first business rooted in purpose and impact for a greater good - working with brands
            that share the same values.
          </Themed.p>
        </div>
      </Container>
      <Circle size={[`200px`, `200px`, `300px`]} color="red" top="-75px" right="-75px" />
      <Circle
        size={[`25px`, `25px`, `50px`]}
        color="gray"
        top="-25px"
        right={[`175px`, `175px`, `275px`]}
        sx={{ zIndex: 10 }}
      />
      <Circle
        size={[`15px`, `15px`, `25px`]}
        color="pink"
        top="50px"
        right={[`145px`, `145px`, `375px`]}
        sx={{ animation: `${upWide} 20s ease-in-out infinite alternate` }}
      />
      <Logo
        sx={{
          width: [70, 70, 90],
          height: [70, 70, 90],
          top: `112px`,
          right: [`40px`, `40px`, `240px`],
          position: `absolute`,
          color: `white`,
        }}
      />
      <Circle
        size={[`100px`, `100px`, `120px`]}
        color="darkIndigo"
        top="90px"
        right={[`25px`, `25px`, `225px`]}
        sx={{ boxShadow: `0 0 0 30px rgba(90, 103, 216, 0.15)` }}
      />
      <Donut color="yellow" size="200px" top="-100px" width="30px" left="-50px" sx={{ opacity: 0.5 }} />
      <Donut
        color="blue"
        size="50px"
        top="-25px"
        width="8px"
        left="180px"
        sx={{ opacity: 0.5, animation: `${down} 10s ease-in-out infinite alternate` }}
      />
      <Container sx={{ mt: [6, 7], position: `relative` }}>
        <Box
          sx={{
            borderRadius: `xl`,
            variant: isStrange ? `gradients.strangerThings` : `gradients.indigo`,
            p: [4, 4, 5],
            color: `white`,
            boxShadow: (t: { colors: { [key: string]: any[] } }) => `0px 20px 25px ${t.colors.shadow}`,
          }}
        >
          <h3
            sx={{
              fontWeight: `bold`,
              fontSize: [2, 3, 4],
              textAlign: `center`,
              mb: 4,
              mt: 0,
              textShadow: `0 1px 1px rgba(0, 0, 0, 0.2)`,
            }}
          >
            Got a project? Let's talk!
          </h3>
          <Themed.p sx={{ textShadow: `0 1px 1px rgba(0, 0, 0, 0.2)` }}>
            We go to 💯 for our clients. Get in touch to share the good news about your next project, or book a time to
            chat with us here. Get in touch for creative web design, Jamstack and Webflow development, SEO, business
            strategy, and content creation services.
          </Themed.p>
          <Flex
            sx={{
              justifyContent: `space-evenly`,
              mt: 4,
              flexWrap: `wrap`,
              a: { mt: 3, textAlign: `center` },
              div: { mt: 3 },
              flexDirection: [`column`, `row`],
            }}
          >
            <a href="https://booking.tala.digital" sx={{ variant: `buttons.white` }}>
              Let's talk
            </a>
          </Flex>
        </Box>
        <Circle
          color="orange"
          size={[`60px`, `80px`, `130px`]}
          top={[`0px`, `-30px`, `-60px`]}
          right={[`20px`, `70px`]}
          sx={{ zIndex: 10 }}
        />
        <Circle
          color="green"
          size={[`20px`, `25px`, `30px`]}
          top={[`-10px`, `-40px`, `-80px`]}
          right={[`100px`, `170px`, `220px`]}
          sx={{ zIndex: 10 }}
        />
        <Donut color="pink" size={[`300px`, `340px`]} top="150px" width="40px" right="-160px" sx={{ opacity: 0.35 }} />
        <CircleGrid color="blue" size={260} top="-20px" left={[`-180px`, `-120px`, `-120px`]} />
      </Container>
    </section>
  )
}

export default AboutMe
