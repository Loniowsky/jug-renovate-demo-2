import React, { useState } from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import TextInput from "commons/components/TextInput";
import Popover from "commons/components/Popover";
import Flexbox from "../Flexbox";
import Button from "../Button";
import { endOfMonth, format, startOfMonth, startOfWeek, sub, subMonths } from "date-fns";
import Calendar from "../Calendar";

const Box = styled.div``;

const DatePickerWrap = styled(Flexbox)`
  padding: 16px;
`;

const RangePresets = styled(Flexbox)``;

const firstDayOfTheWeek = 1; // Monday

const presets = [
  {
    label: "Today",
    range: [new Date(), new Date()],
  },
  {
    label: "Yesterday",
    range: [sub(new Date(), { days: 1 }), sub(new Date(), { days: 1 })],
  },
  {
    label: "Last 7 days",
    range: [sub(new Date(), { days: 6 }), new Date()],
  },
  {
    label: "Last 30 days",
    range: [sub(new Date(), { days: 29 }), new Date()],
  },
  {
    label: "This week",
    range: [startOfWeek(new Date(), { weekStartsOn: firstDayOfTheWeek }), new Date()],
  },
  {
    label: "This month",
    range: [startOfMonth(new Date()), new Date()],
  },
  {
    label: "Last month",
    range: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
  },
];

function getDateRangeLabel(range) {
  if (range[0] && range[1]) {
    return `${format(range[0], "d MMM")} - ${format(range[1], "d MMM")}`;
  } else if (range[0] && !range[1]) {
    return `${format(range[0], "d MMM y")}`;
  }
  return "";
}

function DateInput({ className, label, placeholder, value = [], onChange }) {
  const [dateRangeLabel, setDateRangeLabel] = useState(getDateRangeLabel(value));

  const setPreset = (presetRange, presetLabel) => {
    onChange(presetRange);
    setDateRangeLabel(presetLabel);
  };

  const setDateRangeProxy = range => {
    onChange(range);
    setDateRangeLabel(getDateRangeLabel(range));
  };

  return (
    <Box className={className}>
      <Popover
        trigger={
          <TextInput
            value={dateRangeLabel}
            placeholder={placeholder}
            label={label}
            leftIcon="event"
            rightIcon={dateRangeLabel ? "close" : ""}
            onRightIconClick={() => {
              console.log("asdasd");
              setDateRangeProxy([]);
            }}
            isShell
          />
        }
        content={
          <DatePickerWrap gap={16}>
            <RangePresets flexDirection="column" gap={4}>
              {presets.map(preset => (
                <Button
                  key={preset.label}
                  variant="tertiary"
                  onClick={() => setPreset(preset.range, preset.label)}
                  fullWidth
                >
                  {preset.label}
                </Button>
              ))}
            </RangePresets>
            <Calendar startDate={value[0]} endDate={value[1]} onChange={setDateRangeProxy} />
          </DatePickerWrap>
        }
      />
    </Box>
  );
}

DateInput.propTypes = {
  className: T.string,
  label: T.string,
  placeholder: T.string,
  value: T.array,
  onChange: T.func,
};

export default DateInput;
