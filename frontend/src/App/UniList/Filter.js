import React, { useState } from "react";
import T from "prop-types";
import Flexbox from "commons/components/Flexbox";
import Typography from "commons/components/Typography";
import RadioButtonWrap from "commons/components/RadioButtonWrap";
import NumberStepper from "commons/components/NumberStepper";
import styled from "styled-components/macro";
import Button from "commons/components/Button";
import Tooltip from "commons/components/Tooltip";

const RadioButtonWrapFullWidth = styled(RadioButtonWrap)`
  width: 100%;
`;

function Filter({
  type,
  label,
  value,
  options = [],
  min = 1,
  max = 100,
  step = 1,
  content,
  onChange,
  isSingleChoice,
  disabled,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Flexbox flexDirection="column" padding="16px" gap={10}>
      <Typography variant="h4">{label}</Typography>

      {type === "select" && (
        <Flexbox gap={4} alignItems="flex-start" flexWrap="wrap">
          {options
            .filter((_, i) => isExpanded || i < 5)
            .map((option) => (
              <RadioButtonWrapFullWidth
                key={option.value}
                label={option.label}
                isActive={value?.includes(option.value)}
                onClick={() => onChange(option.value)}
                isSingleChoice={isSingleChoice}
              />
            ))}
          {options.length > 5 && (
            <Button
              variant="tertiary"
              onClick={() => setIsExpanded((exp) => !exp)}
              fullWidth
            >
              {isExpanded ? "Pokaż mniej" : "Pokaż więcej"}
            </Button>
          )}
        </Flexbox>
      )}

      {type === "bool" && (
        <Tooltip
          label={
            disabled
              ? "Wgraj swoje wyniki maturalne, aby móc uwzględnić je w filtrach"
              : ""
          }
        >
          <Flexbox gap={4} alignItems="flex-start" flexWrap="wrap">
            <RadioButtonWrap
              label="Tak"
              isActive={!!value}
              onClick={() => onChange(true)}
              disabled={disabled}
              isSingleChoice
            />
            <RadioButtonWrap
              label="Nie"
              isActive={!value}
              onClick={() => onChange(false)}
              disabled={disabled}
              isSingleChoice
            />
          </Flexbox>
        </Tooltip>
      )}

      {type === "number" && (
        <Flexbox gap={12} alignItems="flex-start">
          <NumberStepper
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
          />
        </Flexbox>
      )}

      {type === "custom" && <>{content}</>}
    </Flexbox>
  );
}

Filter.propTypes = {
  type: T.oneOf(["select", "bool", "number", "custom"]).isRequired,
  label: T.string.isRequired,
  value: T.any,
  options: T.array,
  min: T.number,
  max: T.number,
  step: T.number,
  content: T.oneOfType([T.object, T.string, T.node]),
  onChange: T.func,
  validate: T.func,
  isSingleChoice: T.bool,
  disabled: T.bool,
};

export default Filter;
