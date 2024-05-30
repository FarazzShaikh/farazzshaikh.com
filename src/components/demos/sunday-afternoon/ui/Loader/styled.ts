import { motion } from "framer-motion";
import styled from "styled-components";

export const LoaderContainer = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(30px) opacity(1);
`;

export const TitleContainer = styled(motion.div)`
  position: relative;

  h2,
  p {
    margin: 0;
    color: white;
  }

  h2 {
    font-size: clamp(0rem, 6vw, 2rem);
    font-weight: normal;
    font-family: "Homemade Apple", cursive;
  }

  p {
    font-size: clamp(0rem, 3vw, 1rem);
    font-family: "Raleway Variable", sans-serif;
    letter-spacing: clamp(0rem, 0.8vw, 0.3rem);
    font-weight: 300;

    position: absolute;
    bottom: 0;
    right: clamp(-4rem, -10vw, 0.3rem);
  }
`;

export const LoadingTextContainer = styled(motion.div)`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000;

  p {
    font-size: clamp(0rem, 3vw, 1rem);
    font-family: "Raleway Variable", sans-serif;
    letter-spacing: clamp(0rem, 0.8vw, 0.3rem);
    font-weight: 300;
    color: white;
  }
`;

export const StartButton = styled(motion.button)`
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  font-size: clamp(0rem, 3vw, 1rem);
  font-family: "Raleway Variable", sans-serif;
  font-style: italic;
  letter-spacing: clamp(0rem, 0.8vw, 0.3rem);
  font-weight: 700;
  color: white;
  background-color: transparent;
  border: none;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: all 0.3s;

  &::after {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    background-color: white;
    transition: width 0.3s;
  }

  &:hover {
    &::after {
      width: 100%;
    }
  }

  span {
    font-size: clamp(0rem, 3vw, 1.5rem);
  }
`;
