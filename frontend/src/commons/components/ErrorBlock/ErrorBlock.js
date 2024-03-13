import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import Icon from "commons/components/Icon";
import Flexbox from "../Flexbox";
import Typography from "../Typography";

const Box = styled(Flexbox)`
  background-color: var(--red-190);
  font-weight: 500;
  border: 1px solid var(--red-100);
`;

const ErrorIcon = styled(Icon)`
  color: var(--neutral-200);
  background-color: var(--red-100);
  border-radius: 50%;
  margin-top: 2px;
`;

function ErrorBlock({ className, children }) {
  if (!children) return null;
  return (
    <Box className={className} alignItems="flex-start" padding="12px" gap={12}>
      <ErrorIcon name="priority_high" />
      <Typography variant="body" color="red-100">
        {children}
      </Typography>
    </Box>
  );
}

ErrorBlock.propTypes = {
  className: T.string,
  children: T.string,
};

export default ErrorBlock;
