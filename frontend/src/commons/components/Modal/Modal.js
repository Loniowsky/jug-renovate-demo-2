import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import { useKeyPress } from "commons/util/useKeyPress";
import { useLockBodyScroll } from "commons/util/useLockBodyScroll";
import { BREAKPOINTS } from "commons/util/breakpoints";

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-index-above);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 32px;

  @media (max-width: ${BREAKPOINTS.small}) {
    padding: 0;
  }
`;

const Backdrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--backdrop);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

const Content = styled.div`
  background-color: var(--neutral-200);
  border-radius: var(--border-radius-3);
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  z-index: var(--z-index-above);

  @media (max-width: ${BREAKPOINTS.small}) {
    border-radius: var(--border-radius-0);
  }
`;

function Modal({ className, handleClose, children }) {
  useLockBodyScroll();
  useKeyPress("Escape", handleClose);

  return (
    <Box>
      <Backdrop onClick={handleClose}></Backdrop>
      <Content className={className}>{children}</Content>
    </Box>
  );
}

Modal.propTypes = {
  className: T.string,
  handleClose: T.func.isRequired,
  children: T.oneOfType([T.object, T.string, T.node]),
};

export default Modal;
