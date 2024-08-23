import {MutableRefObject, useRef} from 'react'
import {Project} from '../sanity.types'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import Lenis from 'lenis'

// Styles
import {
  CenterContainer,
  DefaultImage,
  LeftContainer,
  RightContainer,
  MainImageContainer,
  ProjectImagesContainer,
  LittleImageContainer,
} from '../styles'

// Utils
import {urlFor} from '../utils/urlFor'
import {useLenis} from 'lenis/react'

export default function ImagesContainer({
  projects,
}: {
  projects: Array<Project>
}) {
  // state

  // refs
  const container: MutableRefObject<HTMLDivElement | undefined> = useRef()
  const lenis: Lenis | undefined = useLenis()

  // Handle Animation
  useGSAP(
    () => {
      let mainImages: HTMLElement[] | undefined = gsap.utils.toArray(
        '.main-project-image',
        container.current,
      )
      let leftImages: HTMLElement[] | undefined = gsap.utils.toArray(
        '.left-project-image',
        container.current,
      )
      let rightImages: HTMLElement[] | undefined = gsap.utils.toArray(
        '.right-project-image',
        container.current,
      )

      if (mainImages.length > 0) {
        // Set current index
        mainImages.forEach((main: HTMLElement, i: number) => {
          let rightIndex = i === mainImages.length - 1 ? 0 : i + 1
          let leftIndex = i === 0 ? mainImages.length - 1 : i - 1

          gsap.to([main, leftImages[leftIndex], rightImages[rightIndex]], {
            keyframes: {opacity: [0, 1, 0], yPercent: [80, 0, -80]},
            scrollTrigger: {
              onLeave: () => {
                main.style.pointerEvents = 'none'
                leftImages[leftIndex].style.pointerEvents = 'none'
                rightImages[rightIndex].style.pointerEvents = 'none'
              },
              onLeaveBack: () => {
                main.style.pointerEvents = 'none'
                leftImages[leftIndex].style.pointerEvents = 'none'
                rightImages[rightIndex].style.pointerEvents = 'none'
              },
              onEnter: () => {
                main.style.pointerEvents = 'none'
                leftImages[leftIndex].style.pointerEvents = 'auto'
                rightImages[rightIndex].style.pointerEvents = 'auto'
              },
              onEnterBack: () => {
                main.style.pointerEvents = 'none'
                leftImages[leftIndex].style.pointerEvents = 'auto'
                rightImages[rightIndex].style.pointerEvents = 'auto'
              },
              invalidateOnRefresh: true,
              trigger: document.documentElement,
              start: window.innerHeight * i - window.innerHeight / 4,
              end: window.innerHeight * i + window.innerHeight / 4,
              scrub: true,
              // preventOverlaps: true,
              fastScrollEnd: true,
            },
          })
        })
      }
    },
    {scope: container, dependencies: [container.current]},
  )

  const handleClick = (index: number) => {
    let scroll: number = window.innerHeight * index
    lenis!.scrollTo(scroll, {lerp: 0.1, duration: 1})
  }

  return (
    <ProjectImagesContainer ref={container as any}>
      <LeftContainer>
        {projects.map((project: Project, i: number) => (
          <LittleImageContainer
            onClick={() => handleClick(i)}
            className="left-project-image"
            key={i}
          >
            <DefaultImage
              src={urlFor(project?.image as any)
                .width(2000)
                .auto('format')
                .url()}
            />
          </LittleImageContainer>
        ))}
      </LeftContainer>
      <CenterContainer>
        {projects.map((project: Project, i: number) => (
          <MainImageContainer
            onClick={() => handleClick(i)}
            className="main-project-image"
            key={i}
          >
            <DefaultImage
              src={urlFor(project?.image as any)
                .width(2000)
                .auto('format')
                .url()}
            />
          </MainImageContainer>
        ))}
      </CenterContainer>
      <RightContainer>
        {projects.map((project: Project, i: number) => (
          <LittleImageContainer
            onClick={() => handleClick(i)}
            className="right-project-image"
            key={i}
          >
            <DefaultImage
              src={urlFor(project?.image as any)
                .width(2000)
                .auto('format')
                .url()}
            />
          </LittleImageContainer>
        ))}
      </RightContainer>
    </ProjectImagesContainer>
  )
}
