import React from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";
import Icon from "commons/components/Icon";
import { useState } from "react";
import { useEnterKeyPress } from "commons/util/useEnterKeyPress";
import Divider from "commons/components/Divider";
import Popover from "../Popover";
import Typography from "../Typography";
import Button from "../Button";
import Flexbox from "../Flexbox";
import { Link } from "react-router-dom";
import ActionList from "./ActionList";

const boxStyle = css`
  display: flex;
  align-items: center;
  margin: 8px;
  padding: 8px 16px 8px 8px;
  color: var(--neutral-120);
  border-radius: var(--border-radius-1);
  /* white-space: nowrap; */
  cursor: pointer;

  &:hover,
  &:focus-visible {
    color: var(--neutral-100);
    background-color: var(--neutral-190);
  }

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      color: var(--neutral-170);
    `}

  ${({ variant }) =>
    variant === "destructive" &&
    css`
      &:hover,
      &:focus-visible {
        color: var(--red-100);
        background-color: var(--red-190);
      }
    `}
`;

const LinkBox = styled(Link)`
  ${boxStyle};
`;

const Box = styled.div`
  ${boxStyle};
`;

const StyledIcon = styled(Icon)`
  margin-right: 8px;
`;

const NextLevelIcon = styled(Icon)`
  margin-left: auto;
`;

const ConfirmationBox = styled.div`
  padding: 16px;
`;

function ActionListItem({
  className,
  id,
  icon,
  label,
  subActions = [],
  variant = "default",
  disabled,
  onClick,
  link,
}) {
  const [clickableElement, setClickableElement] = useState();
  useEnterKeyPress(clickableElement, onClick);
  const hasNextLevel = !!subActions.length;

  function onClickProxy(e, id) {
    e.preventDefault();
    e.stopPropagation();
    onClick(id);
  }

  const commonProps = {
    className,
    variant,
    disabled,
    tabIndex: disabled ? "-1" : "0",
  };

  const content = (
    <>
      {icon && <StyledIcon name={icon} size={18} />}
      <Typography variant="label">{label}</Typography>
      {hasNextLevel && <NextLevelIcon name="chevron_right" size={18} />}
    </>
  );

  return (
    <>
      {variant === "divider" && <Divider />}
      {variant === "default" && !hasNextLevel && (
        <>
          {link ? (
            <LinkBox
              {...commonProps}
              onClick={() => onClick(id)}
              to={link}
              ref={setClickableElement}
            >
              {content}
            </LinkBox>
          ) : (
            <Box
              {...commonProps}
              onClick={(e) => onClickProxy(e, id)}
              ref={setClickableElement}
            >
              {content}
            </Box>
          )}
        </>
      )}
      {variant === "default" && hasNextLevel && (
        <Popover
          trigger={<Box {...commonProps}>{content}</Box>}
          content={<ActionList actions={subActions} />}
          placement="right-start"
        />
      )}
      {variant === "destructive" && (
        <Popover
          trigger={<Box {...commonProps}>{content}</Box>}
          content={(closePopover) => {
            return (
              <ConfirmationBox>
                <Typography variant="h4" margin="0 0 8px 0">
                  Jesteś pewny(-a)?
                </Typography>
                <Typography variant="label">
                  Tej akcji nie da się cofnąć.
                </Typography>
                <Flexbox margin="16px 0 0 0" gap={8}>
                  <Button
                    variant="tertiary"
                    onClick={(e) => {
                      e.preventDefault();
                      closePopover(e);
                    }}
                  >
                    Anuluj
                  </Button>
                  <Button
                    onClick={(e) => {
                      onClickProxy(e, id);
                      closePopover();
                    }}
                    ref={setClickableElement}
                  >
                    Tak, {label}
                  </Button>
                </Flexbox>
              </ConfirmationBox>
            );
          }}
          placement="right-end"
          contentStyles={{ bottom: "-8px" }}
        />
      )}
    </>
  );
}

ActionListItem.propTypes = {
  className: T.string,
  id: T.string,
  icon: T.string,
  label: T.string,
  subActions: T.array,
  variant: T.oneOf(["default", "destructive", "divider"]),
  disabled: T.bool,
  onClick: T.func,
  link: T.string,
};

export default ActionListItem;
