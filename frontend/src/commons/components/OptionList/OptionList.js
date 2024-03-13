import React from "react";
import T from "prop-types";
import OptionListItem from "./OptionListItem.js";

function OptionList({ options = [], onChange, selectedOptionId, closePopover }) {
  return (
    <>
      {options.map((option, i) => (
        <OptionListItem
          key={option.label || i}
          {...option}
          onClick={id => {
            if (onChange) onChange(id);
            closePopover();
          }}
          isActive={option.id === selectedOptionId}
        />
      ))}
    </>
  );
}

OptionList.propTypes = {
  options: T.arrayOf(T.object).isRequired,
  onChange: T.func,
  selectedOptionId: T.oneOfType([T.string, T.number]),
  closePopover: T.func,
};

export default OptionList;
