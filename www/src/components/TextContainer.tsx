import {Project} from '../sanity.types'
import {useState, useEffect, useRef, MutableRefObject} from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import {format, parse} from 'date-fns'
import {isMobile} from 'react-device-detect'

// Styes
import {
  ProjectDetailButton,
  ProjectDetailContainer,
  ProjectText,
  ProjectTextContainer,
  ProjectTextMask,
  ProjectTextOuterSpan,
  ProjectTextOutline,
  SliderBulletOutline,
  SliderBullet,
  SliderBullets,
  SliderPosition,
} from '../styles'

export default function TextContainer({projects}: {projects: Array<Project>}) {
  // state
  const [splitArray, setSplitArray] = useState<Array<string[]> | []>([])
  const [loading, setLoading] = useState<boolean>(true)
  let t: HTMLElement[] | undefined
  const [index, setIndex] = useState<number>(1)

  // refs
  const overlay: MutableRefObject<HTMLDivElement | undefined> = useRef()
  const sliderBullet: MutableRefObject<HTMLDivElement | undefined> = useRef()
  const slider: MutableRefObject<HTMLDivElement | undefined> = useRef()

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
        if (isMobile === false) {
          // get width of slider
          let sliderWidth = slider.current!.getBoundingClientRect().width

          // width of the bullets, which is the same as the bullet outlinens
          let bulletWidth =
            sliderBullet.current!.getBoundingClientRect().width / 2

          // subtract the width as we need the center of the bullet first outline to the center of the last bullet outline
          sliderWidth -= bulletWidth * 2

          // get the interval for the slider
          let sliderInterval = sliderWidth / (projects.length - 1)
          // Scroll Position
          gsap.to(
            {},
            {
              scrollTrigger: {
                trigger: document.documentElement,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                invalidateOnRefresh: true,
                onUpdate: self => {
                  let progress = self.progress * (projects.length - 1)
                  let progressFloor = Math.floor(progress)

                  setIndex(progressFloor + 1)

                  console.log(progress * sliderInterval)
                  sliderBullet.current!.style.transform = `translateX(${progress * sliderInterval}px)`
                },
              },
            },
          )
        }

        // Text Animation
        t = gsap.utils.toArray('.project-text')
        let info: HTMLDivElement[] | [] = gsap.utils.toArray('.project-info')
        t.forEach((element: HTMLElement, i: number) => {
          let pos = window.innerHeight * i
          let inner: HTMLElement[] | [] = gsap.utils.toArray(
            '.project-text-inner',
            element,
          )

          gsap.set(inner, {yPercent: -200, opacity: 0})
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
                  yPercent: 200,
                  opacity: 0,
                },
                {
                  yPercent: 0,
                  opacity: 1,
                },
                {
                  yPercent: -200,
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
                  yPercent: 200,
                  opacity: 0,
                },
                {
                  yPercent: 0,
                  opacity: 1,
                },
                {
                  yPercent: -200,
                  opacity: 0,
                },
              ],
            },
            '<',
          )
        })
      }
    },
    {scope: overlay, dependencies: [loading, sliderBullet.current, isMobile]},
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
      {isMobile === false && (
        <SliderPosition>
          <div>{index} OF 5</div>
          <SliderBullets ref={slider as any}>
            <SliderBullet ref={sliderBullet as any} />
            {projects.map((_, i: number) => {
              return <SliderBulletOutline key={i} />
            })}
          </SliderBullets>
        </SliderPosition>
      )}

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
