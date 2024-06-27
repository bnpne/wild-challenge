import {useState, useRef, type MutableRefObject, useEffect} from 'react'
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
  scroll,
}: {
  projects: Array<Project>
  scroll: number
}) {
  // state
  const [currentScroll, setCurrentScroll] = useState<number>(0)

  // refs
  const background: MutableRefObject<HTMLDivElement | undefined> = useRef()

  // update scroll
  useEffect(() => {
    if (scroll) setCurrentScroll(scroll)
  }, [scroll])

  // handle background images scroll
  useGSAP(
    () => {
      gsap.set(background.current as HTMLDivElement, {
        x: -currentScroll,
      })
    },
    {scope: background, dependencies: [currentScroll]},
  )

  return (
    <BackgroundImageWrapper ref={background as any}>
      {projects.map((project: Project, i: number) => {
        return <BackgroundImages key={i} project={project} />
      })}
    </BackgroundImageWrapper>
  )
}
