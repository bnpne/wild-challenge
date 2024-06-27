import styled from 'styled-components'

export const MainDiv = styled.div`
  position: relative;
  font-size: 16px;
  line-height: 19.2px;
  height: 100%;
  overscroll-behavior: none;

  @media (max-width: 1000px) {
    font-size: 2vw;
  }

  @media (min-width: 2400px) {
    font-size: 1vw;
  }
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 16px;

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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  // min-width: 0;
`

export const ProjectTextContainer = styled.div`
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
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 3;
  transform: translate(-50%, -50%);
  font-size: 220px;
  font-weight: 400;
  line-height: 176px;
  letter-spacing: 0.04em;
  text-align: center;
  text-transform: uppercase;
  max-width: 860px;
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ProjectTextOutline = styled.h2`
  position: relative;
  z-index: 1;
  -webkit-text-stroke: 1px #ffffff;
`

export const ProjectTextMaskContainer = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  z-index: 2;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  font-size: 220px;
  font-weight: 400;
  line-height: 176px;
  letter-spacing: 0.04em;
  text-align: center;
  text-transform: uppercase;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: center;
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
  backdrop-filter: blur(150px);
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
  z-index: 2;
`

export const ImageContainer = styled.div`
  position: absolute;
  display: block;
  z-index: 2;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-height: 680px;
  max-width: 512px;
  border-radius: 10px;
  border: 1px #000 solid;
  overflow: hidden;
`

export const DefaultImage = styled.img`
  width: 100%;
  height: 100%;
  vertical-align: top;
  object-fit: cover;
`
