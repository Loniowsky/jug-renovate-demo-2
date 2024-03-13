import React from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";
import Icon from "commons/components/Icon";
import Badge from "commons/components/Badge";
import { Link } from "react-router-dom";
import Typography from "../Typography";

const tabStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 6px 12px;
  margin: 4px;
  font-weight: 500;
  border-radius: var(--border-radius-1);
  cursor: pointer;
  white-space: nowrap; // ?

  padding: ${({ $hasIcon }) => ($hasIcon ? "8px" : "6px 12px")};

  ${({ $isActive }) =>
    $isActive &&
    css`
      color: var(--primary-100);
      background-color: var(--neutral-200);
      pointer-events: none;
    `}

  ${({ $isActive }) =>
    !$isActive &&
    css`
      color: var(--neutral-140);

      &:hover,
      &:focus-visible {
        color: var(--neutral-120);
      }
    `}
`;

const LinkBox = styled(Link)`
  ${tabStyle};
`;

const Box = styled.div`
  ${tabStyle};
`;

function Tab({ className, isActive = false, label, badge, icon, onClick, link }) {
  const commonProps = {
    className: className,
    $isActive: isActive,
    onClick: onClick,
    $hasIcon: !!icon,
    tabIndex: "0",
    onKeyDown: e => {
      if (e.key === "Enter") onClick(e);
    },
  };

  const content = (
    <>
      {label && !icon && <Typography variant="label">{label}</Typography>}
      {!!badge && <Badge label={badge} size="small" />}
      {icon && <Icon name={icon} size={16} />}
    </>
  );

  return (
    <>
      <>
        {link ? (
          <LinkBox to={link} {...commonProps}>
            {content}
          </LinkBox>
        ) : (
          <Box onClick={onClick} {...commonProps}>
            {content}
          </Box>
        )}
      </>
    </>
  );
}

Tab.propTypes = {
  className: T.string,
  isActive: T.bool,
  label: T.string.isRequired,
  badge: T.oneOfType([T.string, T.number]),
  icon: T.string,
  onClick: T.func,
  link: T.string,
};

export default Tab;
