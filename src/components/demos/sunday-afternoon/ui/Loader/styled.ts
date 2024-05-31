import { motion } from "framer-motion";
import styled from "styled-components";

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
