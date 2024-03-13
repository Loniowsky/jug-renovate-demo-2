import React from "react";
import T from "prop-types";
import InputBase from "../InputBase";

function TextInput({ className, value, onChange, ...inputProps }) {
  return <InputBase className={className} type="text" value={value} onChange={onChange} {...inputProps} />;
}

TextInput.propTypes = {
  className: T.string,
  value: T.string.isRequired,
  onChange: T.func,
};

export default TextInput;
