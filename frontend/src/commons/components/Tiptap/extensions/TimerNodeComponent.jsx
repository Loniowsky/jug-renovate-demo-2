/* eslint-disable react/prop-types */
import React from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";
import Flexbox from "commons/components/Flexbox";
import Icon from "commons/components/Icon";

import { NodeViewWrapper } from "@tiptap/react";
import DurationInput from "commons/components/DurationInput";
import Tooltip from "commons/components/Tooltip";

const StyledFlexbox = styled(Flexbox)`
  display: inline-flex;
  padding: 2px 8px 2px 4px;
  background: var(--primary-190);
  border-radius: var(--border-radius-1);
  color: var(--primary-100);
  font-weight: 600;
  vertical-align: top;

  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
      &:hover {
        background: var(--primary-180);
      }
    `}

  ${({ selected }) =>
    selected &&
    css`
      background-color: var(--primary-180);
    `}

  &:focus-within {
    background-color: var(--primary-180);
  }
`;

const DurationInputShrinked = styled(DurationInput)`
  input {
    min-height: 0;
    padding-top: 4px;
    padding-bottom: 4px;
  }
`;

function TimerNodeComponent(props) {
  const changeValue = val => {
    props.updateAttributes({
      value: val,
    });
  };

  return (
    <NodeViewWrapper style={{ display: "inline-block", verticalAlign: "middle" }}>
      <StyledFlexbox alignItems="center" gap={2} selected={props.selected}>
        <Icon name="play_arrow" size={18} isFilled />
        <DurationInputShrinked value={props.node.attrs.value} onChange={changeValue} size="small" />
        <Tooltip label="Remove timer">
          <Icon name="close" size={18} color="neutral-120" onClick={props.deleteNode} />
        </Tooltip>
      </StyledFlexbox>
    </NodeViewWrapper>
  );
}

TimerNodeComponent.propTypes = {
  props: T.object,
};

export default TimerNodeComponent;
