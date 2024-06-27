import {Project} from '../sanity.types'
import {
  BackgroundImage,
  BackgroundImageDiv,
  BackgroundImageOverlay,
  DefaultImage,
} from '../styles'
import {urlFor} from '../utils/urlFor'

export default function BackgroundImages({project}: {project: Project}) {
  return (
    <BackgroundImageDiv>
      <BackgroundImage>
        <BackgroundImageOverlay />
        <DefaultImage
          src={urlFor(project?.image as any)
            .width(2000)
            .auto('format')
            .url()}
        />
      </BackgroundImage>
    </BackgroundImageDiv>
  )
}
