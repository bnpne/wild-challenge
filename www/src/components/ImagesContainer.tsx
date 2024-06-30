import {MutableRefObject, useRef, useEffect, useState} from 'react'
import {Project} from '../sanity.types'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import {useLenis} from 'lenis/react'
import Lenis from 'lenis'

// Styles
import {DefaultImage, ImageContainer, ProjectImagesContainer} from '../styles'

// Utils
import {urlFor} from '../utils/urlFor'

const calcViewWidth = (pixels: number) => {
  return (pixels * 100) / 1600
}

export default function ImagesContainer({
  projects,
}: {
  projects: Array<Project>
}) {
  // state
  const [imageArray, setImageArray] = useState<HTMLDivElement[] | []>([])

  // refs
  const container: MutableRefObject<HTMLDivElement | undefined> = useRef()
  const lenis: Lenis | undefined = useLenis()

  // on load set images
  useEffect(() => {
    let im: HTMLElement[] | any = gsap.utils.toArray('.project-image')

    if (im) setImageArray(im)
  }, [projects])

  const handleClick = (index: number) => {
    let pos = window.innerHeight * index
    lenis?.scrollTo(pos)
  }

  useGSAP(
    () => {
      if (imageArray) {
        imageArray.forEach((element: HTMLElement, i: number) => {
          let pos = window.innerHeight * i

          let sh = `${calcViewWidth(330)}vw`
          let sw = `${calcViewWidth(248)}vw`
          let lh = `${calcViewWidth(860)}vw`
          let lw = `${calcViewWidth(512)}vw`

          // ratios to keep responsive
          let hr = 0.835 // for left and right
          let vr = 0.61555555555556 // for top and bottom
          let pr = 0.01 // for padding

          // set z-index
          element.style.zIndex = `${imageArray.length - i}`
          if (i === imageArray.length - 1) {
            element.style.zIndex = `${-10}`
          }

          gsap.set(element, {
            top: `${window.innerWidth * pr}px`,
            bottom: 'auto',
            left: 'auto',
            right: `${window.innerWidth * pr}px`,
            height: sh,
            width: sw,
          })

          if (i === imageArray.length - 2) {
            gsap.set(element, {
              top: 'auto',
              bottom: `${window.innerWidth * pr}px`,
              left: `${window.innerWidth * pr}px`,
              right: 'auto',
              height: sh,
              width: sw,
              zIndex: -10,
            })
          }

          if (i < imageArray.length - 2) {
            gsap.to(element, {
              keyframes: [
                {
                  top: `${window.innerWidth * pr}px`,
                  bottom: `${window.innerHeight * vr}px`,
                  right: `${window.innerWidth * pr}px`,
                  left: `${window.innerWidth * hr}px`,
                  width: sw,
                  height: sh,
                },
                {
                  top: `${calcViewWidth(110)}vw`,
                  bottom: `${calcViewWidth(110)}vw`,
                  left: `${calcViewWidth(544)}vw`,
                  right: `${calcViewWidth(544)}vw`,
                  width: lw,
                  height: lh,
                  onComplete: () => {
                    element.style.zIndex = `${i + 1}`
                  },
                },

                {
                  width: sw,
                  height: sh,
                  top: 'unset',
                  bottom: `${window.innerWidth * pr}px`,
                  left: `${window.innerWidth * pr}px`,
                  right: `${window.innerWidth * hr}px`,
                  onReverseComplete: () => {
                    element.style.zIndex = `${imageArray.length - i}`
                  },
                },
              ],
              ease: 'none',
              scrollTrigger: {
                trigger: document.documentElement,
                scrub: true,
                start: pos - window.innerHeight,
                end: pos + window.innerHeight / 2,
                toggleActions: 'play none reverse none',
              },
            })
          }
        })
      }
    },
    {scope: container, dependencies: [imageArray]},
  )

  return (
    <ProjectImagesContainer ref={container as any}>
      {projects.map((project: Project, i: number) => (
        <ImageContainer
          key={i}
          className="project-image"
          onClick={() => handleClick(project.dataIndex ? project.dataIndex : 0)}
        >
          <DefaultImage
            src={urlFor(project?.image as any)
              .width(2000)
              .auto('format')
              .url()}
          />
        </ImageContainer>
      ))}
    </ProjectImagesContainer>
  )
}
