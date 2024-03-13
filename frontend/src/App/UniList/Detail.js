import React from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";
import Flexbox from "commons/components/Flexbox";
import Typography from "commons/components/Typography";
import Icon from "commons/components/Icon";

const Box = styled(Flexbox)`
  width: 100%;

  ${({ variant }) =>
    variant === "vertical" &&
    css`
      /* align-items: center; */
    `}
`;

const Label = styled(Typography)`
  display: flex;
  gap: 8px;
  align-items: center;
`;

function Detail({ className, label, value, icon }) {
  return (
    <Box className={className} flexDirection={"column"} gap={4}>
      <Label color="neutral-140" variant="body">
        {icon && <Icon name={icon} />}
        {label}
      </Label>
      <Typography variant="body" as="div">
        {value}
      </Typography>
    </Box>
  );
}

Detail.propTypes = {
  className: T.string,
  label: T.string,
  value: T.oneOfType([T.object, T.string, T.node]),
  icon: T.string,
};

export default Detail;
