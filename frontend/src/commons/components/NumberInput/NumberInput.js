import React from "react";
import T from "prop-types";
import InputBase from "../InputBase";
import styled from "styled-components/macro";

const InputBaseStyled = styled(InputBase)`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

function NumberInput({ className, value, onChange, min, max, step, ...inputProps }) {
  function onChangeProxy(value) {
    if (onChange) onChange(value === "" ? "" : +value);
  }

  return (
    <InputBaseStyled
      className={className}
      type="number"
      value={value}
      onChange={onChangeProxy}
      min={min}
      max={max}
      step={step}
      {...inputProps}
    />
  );
}

NumberInput.propTypes = {
  className: T.string,
  value: T.oneOfType([T.number, T.string]).isRequired,
  onChange: T.func,
  min: T.number,
  max: T.number,
  step: T.number,
};

export default NumberInput;
