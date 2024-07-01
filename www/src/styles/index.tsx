import styled from 'styled-components'

export const MainDiv = styled.div`
  position: relative;
  font-size: 16px;
  line-height: 19.2px;
  height: 100%;
  overscroll-behavior: none;

  @media (max-width: 1000px) {
    font-size: 3vw;
  }

  @media (min-width: 2400px) {
    font-size: 1vw;
  }

  cursor: none;
`

export const PageDiv = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;

  // padding: 16px;
  //
  // @media (max-width: 1000px) {
  //   padding: 2vw;
  // }
  //
  // @media (min-width: 2400px) {
  //   padding: 1vw;
  // }
`

export const HeaderDiv = styled.header`
  text-transform: uppercase;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: calc((16 * 100vw) / 1600);

  letter-spacing: 0.08em;

  @media (max-width: 1000px) {
    padding: 2vw;
  }

  @media (min-width: 2400px) {
    padding: 1vw;
  }
`
export const BackgroundImageWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  flex-direction: column;
  z-index: 1;
  // min-width: 0;
  pointer-events: none;
`

export const ProjectTextContainer = styled.div`
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
`

export const ProjectText = styled.div`
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 3;
  transform: translate(-50%, -50%);
  font-size: 220px;
  font-weight: 400;
  line-height: 180px;
  letter-spacing: 0.04em;
  text-align: center;
  text-transform: uppercase;
  width: calc((860 * 100vw) / 1600);
  // opacity: 0;
  white-space: normal;

  @media (max-width: 1000px) {
    font-size: 15vw;
    line-height: 13vw;
  }

  @media (min-height: 2000px) {
    font-size: 15vw;
    line-height: 12vw;
  }
`

export const ProjectTextOuterSpan = styled.span`
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
`

export const ProjectTextInnerSpan = styled(ProjectTextOuterSpan)

export const ProjectTextOutline = styled.h2`
  column-gap: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  color: transparent;
  -webkit-text-stroke: 1px #ffffff;
  display: flex;
  flex-direction: row;
  width: calc((860 * 100vw) / 1600);
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @media (max-width: 1000px) {
    column-gap: 3vw;
  }
`

export const ProjectTextMask = styled(ProjectTextOutline)`
  color: #ffffff;
  mask-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjY4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNTEyIiBoZWlnaHQ9IjY4MCIgZmlsbD0id2hpdGUiIHN0cm9rZT0iYmxhY2siIC8+Cjwvc3ZnPg==');
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: calc((512 * 100vw) / 1600) calc((680 * 100vw) / 1600);
`

export const ProjectTextMaskText = styled.h2`
  text-align: center;
  text-transform: uppercase;
`

export const BackgroundImageDiv = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100%;
`

export const BackgroundImage = styled(BackgroundImageDiv)`
  position: absolute;
  z-index: 1;
  display: block;
`

export const BackgroundImageOverlay = styled(BackgroundImageDiv)`
  position: absolute;
  z-index: 2;
  display: block;
  -webkit-backdrop-filter: blur(150px);
  backdrop-filter: blur(150px);
  pointer-events: none;
`

export const OverlayWrapper = styled.div`
  position: fixed;
  z-index: 2;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const ProjectImagesContainer = styled(ProjectTextContainer)`
  pointer-events: auto;
  z-index: 2;
  display: block;
`

export const ImageContainer = styled.div`
  position: absolute;
  display: block;
  z-index: 2;
  max-height: calc((680 * 100vw) / 1600);
  max-width: calc((512 * 100vw) / 1600);
  aspect-ratio: 512 / 680;
  border-radius: 10px;
  border: 1px #000 solid;
  overflow: hidden;
`

export const DefaultImage = styled.img`
  width: 100%;
  height: 100%;
  vertical-align: top;
  object-fit: cover;
  scale: 1;
  transition: scale 200ms ease-out;

  &:hover {
    scale: 1.1;
  }
`

export const ProjectDetailContainer = styled.div`
  pointer-events: all;
  width: 100%;
  height: 100%;
  max-width: calc((109 * 100vw) / 1600);
  max-height: calc((107 * 100vw) / 1600);
  position: absolute;
  right: calc((155 * 100vw) / 1600);
  bottom: calc((93 * 100vw) / 1600);
  text-transform: uppercase;
  font-family: Arial;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.08em;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: 1000px) {
    font-size: 2vw;
    line-height: 2.2vw;

    max-width: 20vw;
    max-height: 20vw;
    right: 10vw;
    bottom: 10vw;
  }

  @media (min-width: 2400px) {
    font-size: 0.8vw;
    line-height: 1vw;

    max-width: calc((130 * 100vw) / 1600);
    max-height: calc((130 * 100vw) / 1600);
  }
`

export const ProjectDetailButton = styled.a`
  background: #ffffff;
  padding: calc((9 * 100vw) / 1600) calc((16 * 100vw) / 1600);
  border-radius: 24px;
  width: 100%;
  color: #000;
  text-align: center;

  @media (max-width: 1000px) {
    padding: 2vw 2vw;
  }

  @media (min-width: 2400px) {
    border-radius: 2vw;
  }
`

export const CursorSVG = styled.div`
  pointer-events: none;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  max-width: calc((42 * 100vw) / 1600);
  max-height: calc((42 * 100vw) / 1600);
  z-index: 10000;
`
