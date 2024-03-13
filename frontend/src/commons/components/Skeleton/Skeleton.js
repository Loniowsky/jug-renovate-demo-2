import React from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";

export const SkeletonWrap = ({ loading, variant, width, height, children }) => {
  return (
    <>
      {loading && <Skeleton variant={variant} width={width} height={height} />}
      {children}
    </>
  );
};

SkeletonWrap.propTypes = {
  loading: T.bool,
  variant: T.string,
  width: T.number.isRequired,
  height: T.number.isRequired,
  children: T.oneOfType([T.object, T.string, T.node]),
};

const Box = styled.div`
  position: relative;
  background-color: var(--neutral-190);
  border-radius: var(--border-radius-2);
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  flex-shrink: 0;
  overflow: hidden;

  ${({ variant }) =>
    variant === "circle" &&
    css`
      border-radius: 50%;
    `}

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background: linear-gradient(90deg, var(--neutral-190) 0%, var(--neutral-180) 50%, var(--neutral-190) 100%);
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
`;

function Skeleton({ className, variant = "rectangle", width, height }) {
  return <Box className={className} variant={variant} width={width} height={height} />;
}

Skeleton.propTypes = {
  className: T.string,
  variant: T.oneOf(["rectangle", "circle"]),
  width: T.string.isRequired,
  height: T.string.isRequired,
};

export default Skeleton;
