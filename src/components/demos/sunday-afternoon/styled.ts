import styled from "styled-components";

export const UiContainer = styled.main`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  z-index: 1000;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  padding: 2rem;
  box-sizing: border-box;
  pointer-events: none;
`;
