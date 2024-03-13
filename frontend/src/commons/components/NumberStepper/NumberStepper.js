import React from "react";
import T from "prop-types";
import Icon from "../Icon";
import styled, { css } from "styled-components/macro";

const Box = styled.div`
  position: relative;
`;

const HiddenInput = styled.input`
  position: absolute;
  visibility: hidden;
`;

const VisibleInput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 8px;
  gap: 12px;
  background-color: var(--primary-190);
  border-radius: var(--border-radius-1);

  ${({ size }) =>
    size === "small" &&
    css`
      padding: 2px 4px;
      gap: 4px;
    `}

  ${({ $isNeutral }) =>
    $isNeutral &&
    css`
      /* background: var(--neutral-190); */
      background-color: transparent;
      box-shadow: 0 0 0 1px var(--neutral-180);
    `}
`;

const StepperButton = styled.button`
  background-color: var(--neutral-200);
  border-radius: 50%;
  padding: 0;
  color: var(--primary-100);

  &:hover,
  &:focus-visible {
    box-shadow: var(--shadow-1);
  }

  &:disabled {
    pointer-events: none;
    background-color: transparent;
    color: var(--primary-140);
  }
`;

const Value = styled.div`
  width: 28px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: var(--primary-100);
`;

function NumberStepper({
  className,
  min = 1,
  max = 100,
  step = 1,
  value = 1,
  onChange,
  size = "medium",
}) {
  function stepUp() {
    if (value + step > max) return;
    onChange(value + step);
  }

  function stepDown() {
    if (value - step < min) return;
    onChange(value - step);
  }

  return (
    <Box className={className}>
      <HiddenInput
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
      <VisibleInput size={size} $isNeutral={!value}>
        {/* disabled state */}
        <StepperButton
          type="button"
          onClick={stepDown}
          disabled={value === min}
        >
          <Icon name="remove" size={size === "medium" ? 20 : 16} />
        </StepperButton>
        <Value>{value}</Value>
        <StepperButton type="button" onClick={stepUp} disabled={value === max}>
          <Icon name="add" size={size === "medium" ? 20 : 16} />
        </StepperButton>
      </VisibleInput>
    </Box>
  );
}

NumberStepper.propTypes = {
  className: T.string,
  min: T.number,
  max: T.number,
  step: T.number,
  value: T.number,
  onChange: T.func.isRequired,
  size: T.oneOf(["medium", "small"]),
};

export default NumberStepper;
