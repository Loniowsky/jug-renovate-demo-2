import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import Typography from "commons/components/Typography";

const Box = styled.div`
  border-radius: var(--border-radius-1);
  cursor: text;
  width: 100%;

  &:hover,
  &:focus-within {
    background-color: var(--neutral-190);
  }
`;

const Input = styled.input`
  all: inherit;
  width: 100%;
`;

function TypographyInput({ className, value = "", onChange, autoFocus, ...typographyProps }) {
  function onChangeProxy(e) {
    if (onChange) onChange(e.target.value);
  }

  // function handleFocus(event) {
  //   event.target.select();
  // }

  return (
    <Box className={className}>
      <Typography {...typographyProps}>
        <Input
          value={value}
          onChange={onChangeProxy}
          // onFocus={handleFocus}
          autoFocus={autoFocus}
        />
      </Typography>
    </Box>
  );
}

TypographyInput.propTypes = {
  className: T.string,
  value: T.oneOfType([T.string, T.number]),
  onChange: T.func,
  autoFocus: T.bool,
  typographyProps: T.object,
};

export default TypographyInput;
