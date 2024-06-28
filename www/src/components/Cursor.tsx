import {useEffect, useState, useRef} from 'react'
import {CursorSVG} from '../styles'
import {useGSAP} from '@gsap/react'
import {useLenis} from 'lenis/react'
import Lenis from 'lenis'

type ProgressCircle = {
  circ: number
  prog: number
}

export default function Cursor() {
  const [progress, setProgress] = useState<number>(0)
  const [progressCircle, setProgressCircle] = useState<ProgressCircle>()
  const lenis = useLenis()

  const cursor = useRef(null)

  useEffect(() => {
    window.addEventListener('pointermove', (e: PointerEvent) => {
      let xPosition = e.clientX - 24 + 'px'
      let yPosition = e.clientY - 24 + 'px'

      // @ts-ignore
      cursor.current.style.transform =
        'translate(' + xPosition + ',' + yPosition + ') scale(1)'
    })

    lenis?.on('scroll', (e: Lenis) => {
      setProgress(e.progress)
    })
  }, [])

  useGSAP(
    () => {
      if (progress) {
        let circ = 2 * Math.PI * 20
        let prog = circ * progress
        setProgressCircle({circ: circ, prog: prog})
      }
    },
    {scope: cursor, dependencies: [progress]},
  )

  return (
    <CursorSVG ref={cursor as any}>
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 42 42"
        style={{transform: 'rotate(-90deg)'}}
      >
        <circle cx="21" cy="21" r="2" fill="#fff" />
        <circle opacity=".1" cx="21" cy="21" r="20" stroke="#fff" />
        {progressCircle && (
          <circle
            cx="21"
            cy="21"
            r="20"
            stroke="#fff"
            strokeDasharray={`${progressCircle.prog} ${progressCircle.circ - progressCircle.prog}`}
          />
        )}
      </svg>
    </CursorSVG>
  )
}
