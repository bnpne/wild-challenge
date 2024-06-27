import {useEffect, useState} from 'react'
import {Project} from '../sanity.types'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'

// Styles
import {DefaultImage, ImageContainer, ProjectImagesContainer} from '../styles'

// Utils
import {urlFor} from '../utils/urlFor'

type ScrollObject = {
  current: number
  is?: boolean | string
  progress?: number
  currentIndex?: number
}

export default function ImagesContainer({
  projects,
  scroll,
}: {
  projects: Array<Project>
  scroll: ScrollObject
}) {
  // state
  const [imageArray, setImageArray] = useState<Array<HTMLDivElement> | []>([])

  // on load set images
  useEffect(() => {
    let im = gsap.utils.toArray('.project-image')
    console.log(im)
  }, [])

  // useEffect(() => {
  // }, [scroll.is])
  //
  return (
    <ProjectImagesContainer>
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
