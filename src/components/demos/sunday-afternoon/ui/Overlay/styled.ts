import { motion } from "framer-motion";
import styled from "styled-components";

export const OverlayContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  pointer-events: none;
  button,
  a {
    pointer-events: all;
  }
`;

export const InfoContainer = styled.div`
  position: absolute;
  bottom: 4rem;
  left: 4rem;

  /* If vertical */
  @media (orientation: portrait) {
    left: 0;
    bottom: 2rem;
    width: 100%;
  }
`;

export const TitleContainer = styled.div`
  h2,
  p {
    margin: 0;
    color: white;
    @media (orientation: portrait) {
      width: 100%;
      text-align: center;
    }
  }

  h2 {
    font-size: clamp(1.5rem, 3vw, 3rem);
    font-weight: normal;
    font-family: "Homemade Apple", cursive;
    padding-left: 4rem;
    @media (orientation: portrait) {
      padding-left: 0;
    }
  }

  p {
    font-size: clamp(1rem, 2vw, 1rem);
    font-family: "Raleway Variable", sans-serif;
    letter-spacing: clamp(0rem, 0.8vw, 0.3rem);
    font-weight: 300;
  }
`;
