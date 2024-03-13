import React from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";
import RadioButton from "commons/components/RadioButton";
import Flexbox from "commons/components/Flexbox";

const Box = styled(Flexbox)`
  min-width: 140px;
  padding: 8px 10px;
  font-size: 14px;
  line-height: 20px;
  border: 1px solid var(--neutral-180);
  border-radius: var(--border-radius-2);
  cursor: pointer;
  /* text-transform: capitalize; */

  &:hover {
    background-color: var(--neutral-190);
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      border: 1px solid var(--primary-190);
      background-color: var(--primary-190);

      &:hover {
        background-color: var(--primary-180);
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: var(--neutral-190);
      color: var(--neutral-160);
      cursor: default;

      &:hover {
        background-color: var(--neutral-190) !important;
      }
    `}
`;

const Content = styled.div`
  height: 96px;
  border: 1px solid var(--neutral-180);
  border-radius: var(--border-radius-2);
  background-color: var(--neutral-200);
`;

function RadioButtonWrap({
  className,
  label,
  isActive = false,
  children,
  onClick,
  isSingleChoice,
  disabled,
}) {
  return (
    <Box
      className={className}
      flexDirection="column"
      gap={12}
      $isActive={isActive}
      onClick={disabled ? () => {} : onClick}
      disabled={disabled}
    >
      <RadioButton
        label={label}
        isActive={isActive}
        isSingleChoice={isSingleChoice}
        disabled={disabled}
      />
      {children && <Content>{children}</Content>}
    </Box>
  );
}

RadioButtonWrap.propTypes = {
  className: T.string,
  label: T.string.isRequired,
  isActive: T.bool,
  children: T.oneOfType([T.object, T.string, T.node]),
  onClick: T.func.isRequired,
  isSingleChoice: T.bool,
  disabled: T.bool,
};

export default RadioButtonWrap;
