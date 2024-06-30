import {useRef, type MutableRefObject} from 'react'
import {Project} from '../sanity.types'
import {BackgroundImageWrapper} from '../styles'
import {useGSAP} from '@gsap/react'

// Components
import BackgroundImages from './BackgroundImages'
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
        toggleActions: 'play restart none none',
        scrub: true,
        invalidateOnRefresh: true,
        snap: {
          snapTo: 1 / (projects.length - 1),
          duration: 0.5,
          directional: false,
        },
      })
    },
    {scope: background, dependencies: [background.current]},
  )

  return (
    <BackgroundImageWrapper ref={background as any}>
      {projects.map((project: Project, i: number) => {
        return (
          <BackgroundImages
            className={`project-${i}`}
            key={i}
            project={project}
          />
        )
      })}
    </BackgroundImageWrapper>
  )
}
