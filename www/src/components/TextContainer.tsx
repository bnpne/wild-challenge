import {Project} from '../sanity.types'
import {useState, useEffect, useRef, MutableRefObject} from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import {format, parse} from 'date-fns'

// Styes
import {
  ProjectDetailButton,
  ProjectDetailContainer,
  ProjectText,
  ProjectTextContainer,
  ProjectTextMask,
  ProjectTextOuterSpan,
  ProjectTextOutline,
} from '../styles'

export default function TextContainer({projects}: {projects: Array<Project>}) {
  // state
  const [splitArray, setSplitArray] = useState<Array<string[]> | []>([])
  const [loading, setLoading] = useState<boolean>(true)
  let t: HTMLElement[] | undefined

  // refs
  const overlay: MutableRefObject<HTMLDivElement | undefined> = useRef()

  useEffect(() => {
    if (loading === true) {
      projects.forEach((project: Project, i: number) => {
        let text: string | undefined = project.title
        let spltArray: string[] | [] = []
        let splt: string[] | undefined = text?.split(' ')

        splt?.forEach((s: string, j: number) => {
          spltArray[j] = s
        })

        let temp = splitArray
        temp[i] = spltArray
        setSplitArray(temp)
      })

      setLoading(false)
    }
  }, [overlay])

  useGSAP(
    () => {
      if (loading === false) {
        t = gsap.utils.toArray('.project-text')
        let info: HTMLDivElement[] | [] = gsap.utils.toArray('.project-info')
        t.forEach((element: HTMLElement, i: number) => {
          let pos = window.innerHeight * i
          let inner: HTMLElement[] | [] = gsap.utils.toArray(
            '.project-text-inner',
            element,
          )

          gsap.set(inner, {yPercent: 100, opacity: 0})
          gsap.set(info[i], {opacity: 0})

          let tl = gsap.timeline({
            ease: 'none',
            scrollTrigger: {
              trigger: document.documentElement,
              scrub: true,
              start: pos - window.innerHeight,
              end: pos + window.innerHeight / 2,
              toggleActions: 'play revert reverse none',
            },
          })

          tl.to(
            inner,
            {
              keyframes: [
                {
                  yPercent: 100,
                  opacity: 0,
                },
                {
                  yPercent: 0,
                  opacity: 1,
                },
                {
                  yPercent: -100,
                  opacity: 0,
                },
              ],
            },
            '<',
          )
          tl.to(
            info[i],
            {
              keyframes: [
                {
                  yPercent: 100,
                  opacity: 0,
                },
                {
                  yPercent: 0,
                  opacity: 1,
                },
                {
                  yPercent: -100,
                  opacity: 0,
                },
              ],
            },
            '<',
          )
        })
      }
    },
    {scope: overlay, dependencies: [loading]},
  )

  return (
    <ProjectTextContainer ref={overlay as any}>
      {splitArray &&
        splitArray.map((array: string[], i: number) => (
          <ProjectText key={i} className="project-text">
            <ProjectTextOutline>
              {array.map((s: string, j: number) => (
                <ProjectTextOuterSpan key={j}>
                  <ProjectTextOuterSpan className="project-text-inner">
                    {s}
                  </ProjectTextOuterSpan>
                </ProjectTextOuterSpan>
              ))}
            </ProjectTextOutline>
            <ProjectTextMask>
              {array.map((s: string, j: number) => (
                <ProjectTextOuterSpan key={j}>
                  <ProjectTextOuterSpan className="project-text-inner">
                    {s}
                  </ProjectTextOuterSpan>
                </ProjectTextOuterSpan>
              ))}
            </ProjectTextMask>
          </ProjectText>
        ))}
      {projects &&
        projects.map((project: Project, i: number) => {
          /**@ts-ignore*/
          let parsed = parse(project.data, 'yyyy-MM-dd', new Date())
          return (
            <ProjectDetailContainer className="project-info" key={i}>
              <p>Johanna Hobel for {project.client?.clientTitle}</p>
              <p>{format(parsed, 'MMM yyyy')}</p>
              <ProjectDetailButton
                target="_blank"
                href={project.client?.clientLink}
              >
                Have a Look
              </ProjectDetailButton>
            </ProjectDetailContainer>
          )
        })}
    </ProjectTextContainer>
  )
}
