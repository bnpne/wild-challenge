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
import Cursor from './components/Cursor'

// Types
import {Project, MainResult} from './sanity.types'

/**
 * MAIN APP
 */
export default function App() {
  // state
  const [data, setData] = useState<MainResult | null>(null)
  const [projects, setProjects] = useState<Array<Project> | []>([])
  const [projectsAnima, setProjectsAnima] = useState<Array<Project> | []>([])

  // refs
  const lenis: Lenis | undefined = useLenis()
  const lenisRef = useRef()

  // register plugins
  gsap.registerPlugin(useGSAP, ScrollTrigger)
  gsap.config({
    nullTargetWarn: false,
  })
  // ScrollTrigger.normalizeScroll(true)

  // Set projects
  useEffect(() => {
    getData().then(d => {
      setData(d)
      console.log(d)
      let temp: Array<Project> = []
      let tempAnima: Array<Project> = []
      d?.projects?.forEach((project: Project, i: number) => {
        temp[i] = project
        tempAnima[i] = project
      })

      // to handle a `pseudo-infinite` we need to put a duplicate of the first element on the end
      let first = temp[0]
      let second = temp[temp.length - 1]
      // tempAnima.push(first)
      tempAnima.push(second)
      tempAnima.push(first)

      setProjects(temp)
      setProjectsAnima(tempAnima)
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
      lenis.stop()
      lenis.scrollTo(0)
      lenis.start()
    }
  }, [lenis, projects])

  return (
    <ReactLenis
      ref={lenisRef as any}
      root
      autoRaf={false}
      options={{lerp: 0.1, syncTouch: true}}
    >
      <MainDiv id="main">
        {projects.length > 0 && (
          <PageDiv className="page">
            <Cursor />
            <HeaderDiv>{data?.title}</HeaderDiv>
            <BackgroundImageContainer projects={projects} />
            <OverlayContainer
              animaProjects={projectsAnima}
              projects={projects}
            />
          </PageDiv>
        )}
      </MainDiv>
    </ReactLenis>
  )
}
