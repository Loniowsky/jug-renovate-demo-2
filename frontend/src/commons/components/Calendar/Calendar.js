import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import DatePicker from "react-datepicker";
import Button from "commons/components/Button";
import Typography from "commons/components/Typography";
import Flexbox from "commons/components/Flexbox";

import "react-datepicker/dist/react-datepicker.css";
import "./calendar.css";

const NavigationButton = styled(Button)`
  padding: 4px;
`;
const firstDayOfTheWeek = 1; // Monday

function Calendar({ className, startDate, endDate, onChange }) {
  return (
    <DatePicker
      className={className}
      selected={startDate}
      addDays
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
      calendarStartDay={firstDayOfTheWeek}
      maxDate={new Date()}
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <Flexbox justifyContent="space-between" alignItems="center" padding="0 8px">
          <NavigationButton
            variant="tertiary"
            icon="chevron_left"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          />
          <Typography variant="h4">{date.toLocaleString("default", { month: "long" })}</Typography>
          <NavigationButton
            variant="tertiary"
            icon="chevron_right"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          />
        </Flexbox>
      )}
    />
  );
}

Calendar.propTypes = {
  className: T.string,
  startDate: T.instanceOf(Date),
  endDate: T.instanceOf(Date),
  onChange: T.func,
};

export default Calendar;
