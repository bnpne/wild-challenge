import {MutableRefObject, useRef, useEffect, useState} from 'react'
import {Project} from '../sanity.types'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'

// Styles
import {DefaultImage, ImageContainer, ProjectImagesContainer} from '../styles'

// Utils
import {urlFor} from '../utils/urlFor'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

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

          // set z-index
          element.style.zIndex = `${-i + 1}`
          if (i === imageArray.length - 1) {
            element.style.zIndex = `${-i}`
          }

          // todo, set the pixels to percentages based on width
          gsap.set(element, {
            left: 16,
            bottom: 16,
            height: 330,
            width: 248,
            right: 1336,
            top: 554,
          })

          if (i === imageArray.length - 3) {
            gsap.set(element, {
              height: 330,
              width: 248,
              right: 16,
              left: 1336,
              bottom: 554,
              top: 16,
            })
          }

          gsap.to(element, {
            keyframes: [
              {
                left: 16,
                bottom: 16,
                height: 330,
                width: 248,
                right: 1336,
                top: 554,
              },
              {
                width: 512,
                height: 860,
                top: 110,
                bottom: 110,
                right: 544,
                left: 544,
                zIndex: `${i + 1}`,
              },
              {
                height: 330,
                width: 248,
                right: 16,
                left: 1336,
                bottom: 554,
                top: 16,
              },
            ],
            ease: 'none',
            scrollTrigger: {
              trigger: document.documentElement,
              scrub: true,
              start: pos - window.innerHeight,
              end: pos + window.innerHeight / 2,
              toggleActions: 'restart revert reverse none',
              onEnter: () => {},
              onLeave: () => {
                // gsap.set(element, {
                //   left: 16,
                //   bottom: 16,
                //   height: 330,
                //   width: 248,
                //   right: 1336,
                //   top: 554,
                // })
              },
            },
          })
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
