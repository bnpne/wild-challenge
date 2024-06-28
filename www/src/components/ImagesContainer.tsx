import {MutableRefObject, useRef, useEffect, useState} from 'react'
import {Project} from '../sanity.types'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'

// Styles
import {DefaultImage, ImageContainer, ProjectImagesContainer} from '../styles'

// Utils
import {urlFor} from '../utils/urlFor'

const calcViewWidth = (pixels: number, viewportWidth: number) => {
  return (pixels * viewportWidth) / 1600
}

export default function ImagesContainer({
  projects,
}: {
  projects: Array<Project>
}) {
  // state
  const [imageArray, setImageArray] = useState<HTMLDivElement[] | []>([])
  // const [projectImages, setProjectImages] = useState<Project[] | []>([])

  // refs
  const container: MutableRefObject<HTMLDivElement | undefined> = useRef()

  // on load set images
  useEffect(() => {
    let im: HTMLElement[] | any = gsap.utils.toArray('.project-image')

    // to acheive a `pseudo-infinite` effect duplicate the second item and throw it at the back

    if (im) setImageArray(im)
  }, [projects])

  useGSAP(
    () => {
      if (imageArray) {
        imageArray.forEach((element: HTMLElement, i: number) => {
          let pos = window.innerHeight * i

          let sh = calcViewWidth(330, window.innerWidth)
          let sw = calcViewWidth(248, window.innerWidth)
          let lh = calcViewWidth(860, window.innerWidth)
          let lw = calcViewWidth(512, window.innerWidth)

          // set z-index
          element.style.zIndex = `${imageArray.length - i}`
          if (i === imageArray.length - 1) {
            element.style.zIndex = `${-i}`
          }

          // todo, set the pixels to percentages based on width

          gsap.set(element, {
            top: calcViewWidth(16, window.innerWidth),
            bottom: calcViewWidth(554, window.innerWidth),
            left: 1336,
            right: calcViewWidth(16, window.innerWidth),
            height: sh,
            width: sw,
          })

          if (i === imageArray.length - 2) {
            gsap.set(element, {
              top: calcViewWidth(554, window.innerWidth),
              bottom: calcViewWidth(16, window.innerWidth),
              left: calcViewWidth(16, window.innerWidth),
              right: calcViewWidth(1336, window.innerWidth),
              height: sh,
              width: sw,
              zIndex: 0,
            })
          }

          if (i < imageArray.length - 2) {
            gsap.to(element, {
              keyframes: [
                {
                  right: calcViewWidth(16, window.innerWidth),
                  left: calcViewWidth(1336, window.innerWidth),
                  bottom: calcViewWidth(554, window.innerWidth),
                  top: calcViewWidth(16, window.innerWidth),
                  width: sw,
                  height: sh,
                },
                {
                  top: calcViewWidth(110, window.innerWidth),
                  bottom: calcViewWidth(110, window.innerWidth),
                  left: calcViewWidth(544, window.innerWidth),
                  right: calcViewWidth(544, window.innerWidth),
                  width: lw,
                  height: lh,
                  zIndex: `${i + 1}`,
                },

                {
                  top: calcViewWidth(554, window.innerWidth),
                  bottom: calcViewWidth(16, window.innerWidth),
                  left: calcViewWidth(16, window.innerWidth),
                  right: calcViewWidth(1336, window.innerWidth),
                  width: sw,
                  height: sh,
                },
              ],
              ease: 'none',
              scrollTrigger: {
                trigger: document.documentElement,
                scrub: true,
                start: pos - window.innerHeight,
                end: pos + window.innerHeight / 2,
                toggleActions: 'play revert reverse none',
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
        <ImageContainer key={i} className="project-image">
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
