import {useEffect, useRef, useState} from 'react'
import {getData} from './config/sanity'
import {ReactLenis, useLenis} from 'lenis/react'
import Lenis from 'lenis'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

// Styles
import {HeaderDiv, MainDiv, PageDiv} from './styles'

// Components
import OverlayContainer from './components/OverlayContainer'
import BackgroundImageContainer from './components/BackgroundImageContainer'

// Types
import {Project, MainQuery} from './sanity.types'

/**
 * MAIN APP
 */
export default function App() {
  // state
  const [data, setData] = useState<MainQuery | null>(null)
  const [projects, setProjects] = useState<Array<Project> | []>([])
  const [containerWidth, setContainerWidth] = useState<number>(0)

  // refs
  const lenis: Lenis | undefined = useLenis()
  const lenisRef = useRef()

  // register plugins
  gsap.registerPlugin(useGSAP, ScrollTrigger)
  gsap.config({
    nullTargetWarn: false,
  })

  // Set projects
  useEffect(() => {
    getData().then(d => {
      setData(d)

      let temp: Array<Project> = []
      d?.projects?.forEach((project: Project, i: number) => {
        temp[i] = project
      })

      // to handle a `pseudo-infinite` we need to put a duplicate of the first element on the end
      let first = temp[0]
      temp.push(first)

      setProjects(temp)
    })
  }, [])

  // Set lenis RAF to GSAP RAF
  useEffect(() => {
    function update(time: number) {
      // @ts-ignore
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => {
      gsap.ticker.remove(update)
    }
  })

  // wait for lenis and projects to initiate
  useEffect(() => {
    if (lenis && projects) {
      lenis.scrollTo(0)
      lenis.stop()

      // set height of container
      let w = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0,
      )
      let wi = w * (projects.length - 1)
      wi += window.innerHeight
      setContainerWidth(wi)

      lenis.start()
    }
  }, [lenis, projects])

  return (
    <ReactLenis
      ref={lenisRef as any}
      root
      autoRaf={false}
      options={{lerp: 0.1, syncTouch: true, infinite: true}}
    >
      <MainDiv
        style={{
          height: containerWidth > 0 ? `${containerWidth}px` : '100vh',
        }}
      >
        {projects.length > 0 && (
          <PageDiv className="page">
            <HeaderDiv>{data?.title}</HeaderDiv>
            <BackgroundImageContainer projects={projects} />
            <OverlayContainer projects={projects} />
          </PageDiv>
        )}
      </MainDiv>
    </ReactLenis>
  )
}
