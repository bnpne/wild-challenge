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

  // refs
  const container: MutableRefObject<HTMLDivElement | undefined> = useRef()

  // on load set images
  useEffect(() => {
    let im: HTMLElement[] | any = gsap.utils.toArray('.project-image')
    if (im) setImageArray(im)
  }, [projects])

  useGSAP(
    () => {
      if (imageArray) {
        // imageArray.forEach((element: HTMLElement, i: number) => {})
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
