import React from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";
import Flexbox from "../Flexbox";
import Icon from "../Icon";

const FlexboxStyled = styled(Flexbox)``;

const Circle = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid var(--neutral-180);
  background-color: var(--neutral-200);
  border-radius: 50%;
  flex-shrink: 0;

  ${({ $isActive }) =>
    $isActive &&
    css`
      background-color: var(--primary-100);
      border: none;
    `}

  ${({ $isActive, $isSingleChoice }) =>
    $isActive &&
    $isSingleChoice &&
    css`
      &:after {
        content: "";
        position: absolute;
        top: 6px;
        left: 6px;
        width: 8px;
        height: 8px;
        background-color: var(--neutral-200);
        border-radius: 50%;
      }
    `}

  ${({ $isActive, disabled }) =>
    $isActive &&
    disabled &&
    css`
      background-color: var(--neutral-170);
    `}
`;

const Check = styled(Icon)`
  position: absolute;
  top: -2px;
  left: -2px;
`;

function RadioButton({
  className,
  label,
  isActive,
  onClick,
  isSingleChoice = false,
  disabled = false,
}) {
  return (
    <FlexboxStyled
      className={className}
      gap={12}
      onClick={disabled ? () => {} : onClick}
      disabled={disabled}
    >
      <Circle
        $isActive={isActive}
        $isSingleChoice={isSingleChoice}
        disabled={disabled}
      >
        {isActive && !isSingleChoice && (
          <Check size={25} name="check" color="neutral-200" />
        )}
      </Circle>
      {label}
    </FlexboxStyled>
  );
}

RadioButton.propTypes = {
  className: T.string,
  label: T.string.isRequired,
  isActive: T.bool,
  onClick: T.func,
  disabled: T.bool,
};

export default RadioButton;
