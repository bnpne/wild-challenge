import {useRef, type MutableRefObject} from 'react'
import {Project} from '../sanity.types'
import {BackgroundImageWrapper} from '../styles'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'

// Components
import BackgroundImages from './BackgroundImages'

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
      gsap.to(background.current as HTMLDivElement, {
        xPercent: `-${(projects.length - 1) * 100}`,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          scrub: true,
          start: 'top top',
          end: 'bottom bottom',
        },
      })
    },
    {scope: background, dependencies: [background.current]},
  )

  return (
    <BackgroundImageWrapper ref={background as any}>
      {projects.map((project: Project, i: number) => {
        return <BackgroundImages key={i} project={project} />
      })}
    </BackgroundImageWrapper>
  )
}
