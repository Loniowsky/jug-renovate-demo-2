import React, { useState } from "react";
import T from "prop-types";
import Flexbox from "commons/components/Flexbox";
import styled, { css } from "styled-components/macro";
import NumberInput from "commons/components/NumberInput";
import { useUpdateEffect } from "commons/util/useUpdateEffect";

const Box = styled.div``;

const Label = styled.label`
  display: block;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 4px;
  color: var(--neutral-120);
`;

const Colon = styled.div`
  padding: 0 4px;
  line-height: 0;
`;

const NumberInputStyled = styled(NumberInput)`
  ${({ unit }) =>
    unit &&
    css`
      & > div:before {
        content: "${unit}";
        position: absolute;
        left: 40px;
        width: 24px;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
        color: var(--neutral-140);
        font-size: 16px;
        line-height: 20px;
        font-weight: 400;
        text-wrap: nowrap;
      }
    `}

  input {
    width: 72px;
  }
`;

function DurationInput({ className, value, onChange, label, ...inputProps }) {
  const [minutes, setMinutes] = useState(value % 60);
  const [hours, setHours] = useState(Math.floor(value / 60));

  useUpdateEffect(() => {
    onChange(+minutes + +hours * 60);
  }, [minutes, hours]);

  return (
    <Box className={className}>
      {!!label && <Label>{label}</Label>}
      <Flexbox alignItems="center">
        <NumberInputStyled
          type="number"
          value={hours}
          onChange={value => setHours(value)}
          min={0}
          max={100}
          step={1}
          onBlur={() => {
            if (hours === "") setHours(0);
          }}
          unit="h"
          {...inputProps}
        />
        <Colon>:</Colon>
        <NumberInputStyled
          type="number"
          value={minutes}
          onChange={value => setMinutes(value)}
          min={0}
          max={55}
          step={5}
          onBlur={() => {
            if (minutes === "") setMinutes(0);
          }}
          unit="min"
          {...inputProps}
        />
      </Flexbox>
    </Box>
  );
}

DurationInput.propTypes = {
  className: T.string,
  value: T.number.isRequired,
  onChange: T.func,
  label: T.string,
};

export default DurationInput;
