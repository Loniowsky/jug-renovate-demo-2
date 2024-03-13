import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import Flexbox from "../Flexbox";

const Container = styled(Flexbox)`
  width: 100%;
  height: ${({ $containerHeight }) => $containerHeight};
`;

const Ripple = styled.div`
  position: absolute;
  box-shadow: inset 0 0 0 2px ${({ color }) => color && `var(--${color})`};
  border-radius: 50%;
  animation: ripple 2s ease-out infinite;

  &:first-child {
    animation-delay: 1s;
  }

  @keyframes ripple {
    0% {
      width: 0;
      height: 0;
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      width: 40px;
      height: 40px;
      opacity: 0;
    }
  }
`;

function Loader({
  className,
  color = "primary-100",
  containerHeight = "40px",
}) {
  return (
    <Container
      className={className}
      $containerHeight={containerHeight}
      justifyContent="center"
      alignItems="center"
    >
      <Ripple color={color} />
      <Ripple color={color} />
    </Container>
  );
}

Loader.propTypes = {
  className: T.string,
  color: T.string,
  containerHeight: T.string,
};

export default Loader;
