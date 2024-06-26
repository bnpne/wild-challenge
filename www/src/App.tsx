import {useEffect, useState} from 'react'
import {getData} from './config/sanity'
import {Project, MainQuery} from './sanity.types'
import {HeaderDiv, MainDiv, PageDiv} from './styles'
import ProjectContainer from './components/ProjectContainer'

export default function App() {
  const [data, setData] = useState<MainQuery | null>(null)
  const [projects, setProjects] = useState<Array<Project> | []>([])

  // Set projects
  useEffect(() => {
    getData().then(d => {
      console.log(d)
      setData(d)

      let temp: Array<Project> = []
      d?.projects?.forEach((project: Project, i: number) => {
        temp[i] = project
      })

      setProjects(temp)
    })
  }, [])

  return (
    <MainDiv>
      {projects && (
        <PageDiv className="page">
          <HeaderDiv>{data?.title}</HeaderDiv>
          {projects.map((project: Project, i: number) => {
            return <ProjectContainer key={i} project={project} />
          })}
        </PageDiv>
      )}
    </MainDiv>
  )
}
