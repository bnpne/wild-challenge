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
          let hpos = 0

          // sizes
          let sh = window.innerWidth * (330 / 1600)
          let sw = window.innerWidth * (248 / 1600)
          let lh = window.innerWidth * (860 / 1600)
          let lw = window.innerWidth * (512 / 1600)

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
            top: window.innerWidth * pr,
            bottom: 'auto',
            left: 'auto',
            right: window.innerWidth * pr,
            height: sh,
            width: sw,
            onComplete: () => {
              let cs = window.getComputedStyle(element)
              let csv = cs.bottom
              hpos = parseFloat(csv)
            },
          })

          if (i === imageArray.length - 2) {
            gsap.set(element, {
              top: 'auto',
              bottom: window.innerWidth * pr,
              left: window.innerWidth * pr,
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
                  top: window.innerWidth * pr + sh / 2,
                  bottom: window.innerHeight * vr + sh / 2,
                  right: window.innerWidth * pr + sw / 2,
                  left: window.innerWidth * hr + sw / 2,
                  width: sw,
                  height: sh,
                  yPercent: -50,
                  xPercent: -50,
                },
                {
                  top: '50%',
                  bottom: '50%',
                  right: '50%',
                  left: '50%',
                  width: lw,
                  height: lh,
                  yPercent: -50,
                  xPercent: -50,
                  onComplete: () => {
                    element.style.zIndex = `${i + 1}`
                  },
                },

                {
                  width: sw,
                  height: sh,
                  top: hpos + sh / 2,
                  bottom: window.innerWidth * pr + sh / 2,
                  left: window.innerWidth * pr + sw / 2,
                  right: window.innerWidth * hr + sw / 2,
                  yPercent: -50,
                  xPercent: -50,
                  onReverseComplete: () => {
                    element.style.zIndex = `${imageArray.length - i}`
                  },
                },
              ],
              ease: 'none',
              scrollTrigger: {
                trigger: document.documentElement,
                invalidateOnRefresh: true,
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
