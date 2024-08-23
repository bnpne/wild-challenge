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
}: {
  projects: Array<Project>
}) {
  return (
    <OverlayWrapper>
      <TextContainer projects={projects} />
      <ImagesContainer projects={projects} />
    </OverlayWrapper>
  )
}
