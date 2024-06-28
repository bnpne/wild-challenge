import {MutableRefObject, useRef, useEffect, useState} from 'react'
import {Project} from '../sanity.types'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'

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

  // ref
  const container: MutableRefObject<HTMLDivElement | undefined> = useRef()

  // on load set images
  useEffect(() => {
    let im: HTMLElement[] | any = gsap.utils.toArray('.project-image')
    if (im) setImageArray(im)

    // setImagePosition(im, scroll.currentIndex)
  }, [projects])

  useGSAP(
    () => {
      // console.log(imageArray)
      if (imageArray) {
        imageArray.forEach((element: HTMLElement, i: number) => {
          //   gsap
          //     .timeline({
          //       scrollTrigger: {
          //         trigger: document.body,
          //         start: window.innerWidth * i - window.innerWidth,
          //         end: window.innerWidth * i + window.innerWidth,
          //         scrub: true,
          //         markers: true,
          //       },
          //     })
          //     .fromTo(
          //       element,
          //       {
          //         y: '0%',
          //         x: '0%',
          //         left: 16,
          //         bottom: 16,
          //         height: 330,
          //         width: 248,
          //       },
          //       {
          //         width: 512,
          //         height: 860,
          //         bottom: 'unset',
          //         top: '50%',
          //         left: '50%',
          //         y: '-50%',
          //         x: '-50%',
          //       },
          //     )
          //     .to(element, {
          //       height: 330,
          //       width: 248,
          //       right: 16,
          //       top: 16,
          //       y: '0%',
          //       x: '0%',
          //       bottom: 'unset',
          //     })
          // gsap.fromTo(
          //   element,
          //   {
          //     y: '0%',
          //     x: '0%',
          //     left: 16,
          //     bottom: 16,
          //     height: 330,
          //     width: 248,
          //   },
          //   {
          //     width: 512,
          //     height: 860,
          //     bottom: 'unset',
          //     top: '50%',
          //     left: '50%',
          //     y: '-50%',
          //     x: '-50%',
          //     scrollTrigger: {
          //       trigger: document.body,
          //       scrub: true,
          //       markers: true,
          //       start: window.innerWidth * i,
          //       end: window.innerWidth * i + window.innerWidth / 2,
          //     },
          //   },
          // )
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
