import React from "react";
import styled, { css } from "styled-components/macro";
import T from "prop-types";
import Flexbox from "commons/components/Flexbox";
import Typography from "commons/components/Typography";
import Tooltip from "commons/components/Tooltip";
import TagIcon from "commons/components/TagIcon";

const Box = styled(Flexbox)`
  display: inline-flex;
  padding: 2px 6px;
  flex-shrink: 0;
  border-radius: var(--border-radius-1);
  font-weight: 700;
  color: var(--neutral-200);
  text-transform: capitalize;
  user-select: none;
  min-height: 24px;

  ${({ color }) => css`
    background-color: var(--${color}-100);
  `}

  ${({ $hasIcon }) =>
    $hasIcon &&
    css`
      padding-right: 8px;
    `}

  ${({ $isCompact }) =>
    $isCompact &&
    css`
      width: 20px;
      height: 20px;
      min-height: 20px;
      padding: 0;
    `}
`;

function Tag({ className, icon, label, color, isCompact = false }) {
  const iconNode = icon && (
    <TagIcon name={icon} size={isCompact ? 16 : 18} color="neutral-200" />
  );

  const labelNode = <Typography variant="label">{label}</Typography>;
  const shortLabelNode = (
    <Typography variant="label">{label?.slice(0, 1)}</Typography>
  );

  const commonProps = {
    className,
    color,
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
    $isCompact: isCompact,
    $hasIcon: !!icon,
  };

  return (
    <>
      {isCompact ? (
        <Tooltip label={label}>
          <Box {...commonProps}>{iconNode || shortLabelNode}</Box>
        </Tooltip>
      ) : (
        <Box {...commonProps}>
          {iconNode}
          {labelNode}
        </Box>
      )}
    </>
  );
}

Tag.propTypes = {
  className: T.string,
  id: T.number,
  icon: T.string,
  label: T.string,
  color: T.string,
  isCompact: T.bool,
};

export default Tag;
