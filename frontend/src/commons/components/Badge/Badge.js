import React from "react";
import styled, { css } from "styled-components/macro";
import T from "prop-types";

const Box = styled.div`
  padding: 2px 4px;
  border-radius: var(--border-radius-1);
  font-weight: 700;
  color: var(--neutral-160);
  border: 1px solid var(--neutral-180);
  background-color: var(--neutral-200);
  text-align: center;

  ${({ size }) =>
    size === "small" &&
    css`
      font-size: 12px;
      line-height: 14px;
      min-width: 20px;
    `}

  ${({ size }) =>
    size === "medium" &&
    css`
      padding: 2px 4px;
      font-size: 14px;
      line-height: 18px;
      min-width: 24px;
    `}
`;

function Badge({ className, label, size = "medium" }) {
  return (
    <Box className={className} size={size}>
      {label}
    </Box>
  );
}

Badge.propTypes = {
  className: T.string,
  label: T.oneOfType([T.string, T.number]).isRequired,
  size: T.oneOf(["small", "medium"]),
};

export default Badge;
