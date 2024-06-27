import {useEffect, useState} from 'react'
import {getData} from './config/sanity'
import {ReactLenis, useLenis} from 'lenis/react'
import Snap from 'lenis/snap'
import Lenis from 'lenis'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'

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
  const [snap, setSnap] = useState<Snap>()
  const [scroll, setScroll] = useState<number>(0)

  // refs
  const lenis: Lenis | undefined = useLenis()

  // register plugins
  gsap.registerPlugin(useGSAP)

  // Set projects
  useEffect(() => {
    getData().then(d => {
      setData(d)

      let temp: Array<Project> = []
      d?.projects?.forEach((project: Project, i: number) => {
        temp[i] = project
      })

      setProjects(temp)
    })
  }, [])

  // wait for lenis and projects to initiate
  useEffect(() => {
    if (lenis && projects) {
      lenis.scrollTo(0)
      lenis.stop()
      let s = new Snap(lenis!, {
        lerp: 0.08,
        duration: 0.6,
      })
      setSnap(s)

      let w = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0,
      )

      let wi = w * (projects.length - 1)
      wi += window.innerHeight
      setContainerWidth(wi)

      // Listen to scrolling
      if (containerWidth) {
        lenis!.on('scroll', (e: Lenis) => {
          setScroll(e.scroll)
        })
      }

      // add snaps
      projects.forEach((_, i: number) => {
        snap?.add(i * w)
      })

      lenis.start()
    }
  }, [lenis, projects])

  return (
    <ReactLenis root options={{lerp: 0.4}}>
      <MainDiv
        style={{
          height: containerWidth > 0 ? `${containerWidth}px` : '100vh',
        }}
      >
        {projects.length > 0 && (
          <PageDiv className="page">
            <HeaderDiv>{data?.title}</HeaderDiv>
            <BackgroundImageContainer projects={projects} scroll={scroll} />
            <OverlayContainer
              projects={projects}
              scroll={{
                current: scroll,
                is: lenis?.isScrolling,
                progress: lenis?.progress,
              }}
            />
          </PageDiv>
        )}
      </MainDiv>
    </ReactLenis>
  )
}
