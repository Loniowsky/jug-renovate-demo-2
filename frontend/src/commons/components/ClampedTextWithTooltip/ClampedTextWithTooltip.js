import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Tooltip from "commons/components/Tooltip";

const Container = styled.div`
  ${({ maxLines }) => {
    if (maxLines === 1) {
      return css`
        overflow: hidden;
        text-overflow: ellipsis;
      `;
    } else {
      return css`
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      `;
    }
  }}
`;

function ClampedTextWithTooltip({ className, children, maxLines = 1 }) {
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      if (maxLines === 1) {
        setIsTextOverflowing(containerRef.current.scrollWidth > containerRef.current.offsetWidth);
      } else {
        setIsTextOverflowing(containerRef.current.scrollHeight > containerRef.current.offsetHeight);
      }
    }
  }, [containerRef, children]);

  return (
    <Tooltip label={isTextOverflowing ? children : ""} placement="top">
      <Container className={className} ref={containerRef} maxLines={maxLines}>
        {children}
      </Container>
    </Tooltip>
  );
}

ClampedTextWithTooltip.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
  maxLines: PropTypes.number,
};

export default ClampedTextWithTooltip;
