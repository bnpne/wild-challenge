import {Project} from '../sanity.types'

// Components
import ImagesContainer from './ImagesContainer'
import TextContainer from './TextContainer'

// Styles
import {OverlayWrapper} from '../styles'

/**
 * OVERLAY CONTAINER
 * INCLUDING IMAGES AND TEXT
 */
export default function OverlayContainer({
  projects,
  animaProjects,
}: {
  projects: Array<Project>
  animaProjects: Array<Project>
}) {
  return (
    <OverlayWrapper>
      <TextContainer projects={projects} />
      <ImagesContainer projects={animaProjects} />
    </OverlayWrapper>
  )
}
