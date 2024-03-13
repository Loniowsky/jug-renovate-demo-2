import React, { useEffect, useMemo, useRef, useState } from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";
import { usePopper } from "react-popper";

const TriggerWrap = styled.span`
  cursor: pointer;
`;

const ContentWrap = styled.div`
  z-index: var(--z-index-above);
  background-color: var(--neutral-200);
  box-shadow: var(--shadow-3);
  border-radius: var(--border-radius-2);

  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
`;

function Popover({
  className,
  trigger,
  content,
  placement = "bottom-end",
  isFullWidth = false,
  isTriggerTabbable = false,
  onClose,
  triggerStyles,
  contentStyles,
}) {
  const [isVisible, setIsVisibile] = useState(false);
  const [triggerElement, setTriggerElement] = useState(null);
  const [contentElement, setContentElement] = useState(null);
  const popoverRef = useRef();

  const triggerElementWidth = useMemo(() => {
    return triggerElement?.offsetWidth;
  }, [triggerElement, isVisible]);

  function closePopover() {
    if (onClose) onClose();
    setIsVisibile(false);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (isVisible && popoverRef.current && !popoverRef.current.contains(e.target)) {
        closePopover();
      }
    }

    if (isVisible) {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isVisible]);

  function handleTriggerClick(e) {
    e.preventDefault();

    if (isVisible) {
      closePopover();
    } else {
      setIsVisibile(true);
    }
  }

  const { styles, attributes } = usePopper(triggerElement, contentElement, {
    placement: placement,
    strategy: "fixed",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  function onKeyDown(e) {
    if (e.key === "Enter") {
      handleTriggerClick(e);
    }
  }

  return (
    <span className={className} ref={popoverRef}>
      <TriggerWrap
        ref={setTriggerElement}
        onClick={handleTriggerClick}
        style={triggerStyles}
        tabIndex={isTriggerTabbable ? "0" : "-1"}
        onKeyDown={isTriggerTabbable ? onKeyDown : undefined}
      >
        {typeof trigger === "function" ? trigger(handleTriggerClick) : trigger}
      </TriggerWrap>

      {isVisible && (
        <ContentWrap
          ref={setContentElement}
          width={isFullWidth ? triggerElementWidth : ""}
          style={{ ...styles.popper, ...contentStyles }}
          {...attributes.popper}
        >
          {typeof content === "function" ? content(closePopover) : content}
        </ContentWrap>
      )}
    </span>
  );
}

Popover.propTypes = {
  className: T.string,
  trigger: T.oneOfType([T.object, T.string, T.node, T.func]),
  content: T.oneOfType([T.object, T.string, T.node, T.func]),
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
  isFullWidth: T.bool,
  isTriggerTabbable: T.bool,
  onClose: T.func,
  triggerStyles: T.object,
  contentStyles: T.object,
};

export default Popover;
