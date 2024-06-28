import {useEffect, useRef, useState, type MutableRefObject} from 'react'
import {Project} from '../sanity.types'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'

// Components
import ImagesContainer from './ImagesContainer'
import TextContainer from './TextContainer'

// Styles
import {OverlayWrapper} from '../styles'

/**
 * OVERLAY CONTAINER
 * INCLUDING IMAGES AND TEXT
 */
export default function OverlayContainer({
  projects,
}: {
  projects: Array<Project>
}) {
  // state
  const [textArray, setTextArray] = useState<HTMLElement[] | []>([])

  // refs
  const overlay: MutableRefObject<HTMLDivElement | undefined> = useRef()

  // on load
  useEffect(() => {
    let t: HTMLElement[] = gsap.utils.toArray('.project-text')
    setTextArray(t)
  }, [])

  // on scroll
  useGSAP(() => {}, {
    scope: overlay,
  })

  return (
    <OverlayWrapper ref={overlay as any}>
      {/**<TextContainer projects={projects} />*/}
      <ImagesContainer projects={projects} />
    </OverlayWrapper>
  )
}
