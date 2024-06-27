import {Project} from '../sanity.types'

// Styes
import {ProjectText, ProjectTextContainer, ProjectTextOutline} from '../styles'

export default function TextContainer({projects}: {projects: Array<Project>}) {
  return (
    <ProjectTextContainer>
      {projects.map((project: Project, i: number) => (
        <ProjectText key={i} className="project-text">
          <ProjectTextOutline>{project.title}</ProjectTextOutline>
          {/**
              <ProjectTextMaskContainer>
                <ProjectTextMaskText>{project.title}</ProjectTextMaskText>
              </ProjectTextMaskContainer>
              */}
        </ProjectText>
      ))}
    </ProjectTextContainer>
  )
}
