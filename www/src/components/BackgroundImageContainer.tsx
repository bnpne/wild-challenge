import {useRef, type MutableRefObject} from 'react'
import {Project} from '../sanity.types'
import {
  BackgroundImageWrapper,
  BackgroundImage,
  BackgroundImageOverlay,
  DefaultImage,
} from '../styles'
import {useGSAP} from '@gsap/react'
import {urlFor} from '../utils/urlFor'
import {isMobile} from 'react-device-detect'

// Components
import {ScrollTrigger} from 'gsap/ScrollTrigger'

/**
 * BACKGROUND CONTAINER
 * INCLUDING IMAGES
 */
export default function BackgroundImageContainer({
  projects,
}: {
  projects: Array<Project>
}) {
  // refs
  const background: MutableRefObject<HTMLDivElement | undefined> = useRef()

  // handle background images scroll
  useGSAP(
    () => {
      // create trigger
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        // markers: true,
        toggleActions: 'play none none none',
        // scrub: true,
        invalidateOnRefresh: true,
        snap:
          isMobile === true
            ? 0
            : {
                ease: 'easeOutQuint',
                snapTo: 1 / (projects.length - 1),
                duration: 1,
                directional: false,
              },
      })
    },
    {scope: background, dependencies: [background.current]},
  )

  return (
    <BackgroundImageWrapper ref={background as any}>
      <BackgroundImageOverlay />
      {projects.map((project: Project, i: number) => {
        return (
          <BackgroundImage style={{zIndex: `${projects.length - i}`}} key={i}>
            <DefaultImage
              src={urlFor(project?.image as any)
                .width(2000)
                .auto('format')
                .url()}
            />
          </BackgroundImage>
        )
      })}
    </BackgroundImageWrapper>
  )
}
