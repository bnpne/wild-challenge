import {Project} from '../sanity.types'
import {
  DefaultImage,
  ProjectDiv,
  ProjectImage,
  ProjectImageOverlay,
} from '../styles'
import {urlFor} from '../utils/urlFor'

export default function ProjectContainer({project}: {project: Project}) {
  return (
    <ProjectDiv>
      // <div>{project.title}</div>
      <ProjectImage>
        <ProjectImageOverlay />
        <DefaultImage
          src={urlFor(project?.image as any)
            .width(2000)
            .auto('format')
            .url()}
        />
      </ProjectImage>
    </ProjectDiv>
  )
}
