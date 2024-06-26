import styled from 'styled-components'

export const PageDiv = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
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

export const MainDiv = styled.div`
  position: relative;
  font-size: 16px;
  line-height: 19.2px;
  height: 100%;

  @media (max-width: 1000px) {
    font-size: 2vw;
  }

  @media (min-width: 2400px) {
    font-size: 1vw;
  }
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

export const ProjectDiv = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  min-height: 100vh;
`

export const ProjectImage = styled(ProjectDiv)`
  position: absolute;
  z-index: 1;
  display: block;
`

export const ProjectImageOverlay = styled(ProjectDiv)`
  position: absolute;
  z-index: 2;
  display: block;
  backdrop-filter: blur(150px);
`

export const DefaultImage = styled.img`
  width: 100%;
  height: 100%;
  vertical-align: top;
  object-fit: cover;
`
