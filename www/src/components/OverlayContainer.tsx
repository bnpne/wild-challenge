import {useEffect, useRef, useState, type MutableRefObject} from 'react'
import {Project} from '../sanity.types'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'

// Components
import ImagesContainer from './ImagesContainer'
import TextContainer from './TextContainer'

// Styles
import {OverlayWrapper} from '../styles'

type ScrollObject = {
  current: number
  is?: boolean | string
  progress?: number
}

/**
 * OVERLAY CONTAINER
 * INCLUDING IMAGES AND TEXT
 */
export default function OverlayContainer({
  projects,
  scroll,
}: {
  projects: Array<Project>
  scroll: ScrollObject
}) {
  // state
  const [currentScroll, setCurrentScroll] = useState<number>(0)
  const [textArray, setTextArray] = useState<HTMLElement[] | []>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isStopped, setIsStopped] = useState<boolean>(true)

  // refs
  const overlay: MutableRefObject<HTMLDivElement | undefined> = useRef()

  // on load
  useEffect(() => {
    let t: HTMLElement[] = gsap.utils.toArray('.project-text')
    setTextArray(t)
  }, [])

  // set initial text to opacity 1
  useEffect(() => {
    if (textArray.length > 0) {
      gsap.set(textArray[0], {opacity: 1})
    }
  }, [textArray])

  // scrolling, handing debouce and check if currently scrolling
  useEffect(() => {
    // set scroll state
    setCurrentScroll(scroll.current)

    // debounce timer
    const debounce = setTimeout(() => {
      setIsStopped(true)
    }, 150)

    setIsStopped(false)
    // set to true is scrolling
    gsap.to(textArray, {
      opacity: 0,
      duration: 0.6,
      ease: 'expo.out',
    })

    return () => clearTimeout(debounce)
  }, [scroll.current])

  // on scroll
  useGSAP(
    () => {
      if (isStopped === true) {
        // get index
        let i = Math.floor(scroll.current / window.innerWidth)

        // set index
        setCurrentIndex(i)

        // animate text at index
        gsap.to(textArray[i], {
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
        })
      }
    },
    {dependencies: [scroll.current, isStopped], scope: overlay},
  )

  return (
    <OverlayWrapper ref={overlay as any}>
      <TextContainer projects={projects} />
      <ImagesContainer
        projects={projects}
        scroll={{
          current: currentScroll,
          currentIndex: currentIndex,
          is: isStopped,
        }}
      />
    </OverlayWrapper>
  )
}
