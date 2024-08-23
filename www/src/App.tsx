import {useEffect, useRef, useState} from 'react'
import {getData} from './config/sanity'
import {ReactLenis} from 'lenis/react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {CustomEase} from 'gsap/all'

// Styles
import {HeaderDiv, MainDiv, PageDiv} from './styles'

// Components
import BackgroundImageContainer from './components/BackgroundImageContainer'
import Cursor from './components/Cursor'

// Types
import {Project, MainResult} from './sanity.types'
import OverlayContainer from './components/OverlayContainer'

/**
 * MAIN APP
 */
export default function App() {
  // state
  const [data, setData] = useState<MainResult | null>(null)
  const [projects, setProjects] = useState<Array<Project> | []>([])

  // refs
  const lenisRef = useRef()

  // register plugins
  gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase)
  gsap.config({
    nullTargetWarn: false,
  })
  CustomEase.create('easeOutQuint', '0.22, 1, 0.36, 1')

  // Set projects
  useEffect(() => {
    getData().then(d => {
      setData(d)
      let temp: Array<Project> = []
      d?.projects?.forEach((project: Project, i: number) => {
        project.dataIndex = i
        temp[i] = project
      })

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

  return (
    <ReactLenis
      ref={lenisRef as any}
      root
      autoRaf={false}
      options={{lerp: 0.1}}
    >
      <MainDiv id="main">
        {projects.length > 0 && (
          <PageDiv className="page">
            <Cursor />
            <HeaderDiv>{data?.title}</HeaderDiv>
            <BackgroundImageContainer projects={projects} />
            <OverlayContainer projects={projects} />
          </PageDiv>
        )}
      </MainDiv>
    </ReactLenis>
  )
}
