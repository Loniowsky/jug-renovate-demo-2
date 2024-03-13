import React, { useState } from "react";
import { usePopper } from "react-popper";
import T from "prop-types";
import styled, { css } from "styled-components/macro";
import Typography from "../Typography";

const Arrow = styled.div`
  visibility: hidden;

  &,
  &:before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
  }

  &:before {
    content: "";
    visibility: hidden;
    background-color: var(--neutral-100);
    transform: rotate(45deg);
  }

  ${({ placement }) => {
    if (placement.startsWith("top")) {
      return css`
        bottom: -4px;
      `;
    }

    if (placement.startsWith("bottom")) {
      return css`
        top: -4px;
      `;
    }

    if (placement.startsWith("left")) {
      return css`
        right: -4px;
      `;
    }

    if (placement.startsWith("right")) {
      return css`
        left: -4px;
      `;
    }
  }};
`;

const Box = styled.div`
  background-color: var(--neutral-100);
  padding: 4px 8px;
  border-radius: var(--border-radius-1);
  z-index: var(--z-index-inf);
  max-width: 200px;
  visibility: hidden;

  &[data-show="true"] {
    visibility: visible;

    ${Arrow}:before {
      visibility: visible;
    }
  }
`;

const TypographyStyled = styled(Typography)`
  font-weight: 500;
`;

function Tooltip({ className, children, label, placement = "top", triggerStyles }) {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes, update } = usePopper(referenceElement, popperElement, {
    placement: placement,
    strategy: "fixed",
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  const showTooltip = () => {
    if (label) {
      popperElement.setAttribute("data-show", true);
      update();
    }
  };

  const hideTooltip = () => {
    if (label) popperElement.removeAttribute("data-show");
  };

  return (
    <>
      <span
        ref={setReferenceElement}
        onMouseEnter={showTooltip}
        onFocus={showTooltip}
        onMouseLeave={hideTooltip}
        onBlur={hideTooltip}
        style={triggerStyles}
      >
        {children}
      </span>

      <Box className={className} ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        <TypographyStyled variant="label" color="neutral-200">
          {label}
        </TypographyStyled>
        <Arrow ref={setArrowElement} style={styles.arrow} placement={placement} />
      </Box>
    </>
  );
}

Tooltip.propTypes = {
  className: T.string,
  children: T.oneOfType([T.object, T.string, T.node]),
  label: T.string,
  placement: T.oneOf([
    "auto",
    "auto-start",
    "auto-end",
    "bottom-end",
    "bottom-start",
    "bottom",
    "left-end",
    "left-start",
    "left",
    "right-end",
    "right-start",
    "right",
    "top-end",
    "top-start",
    "top",
  ]),
  triggerStyles: T.object,
};

export default Tooltip;
