import React from "react";
import styled, { css } from "styled-components/macro";
import T from "prop-types";
import Icon from "commons/components/Icon";

const AddIcon = styled(Icon)`
  background-color: var(--primary-190);
  border-radius: 50%;
  color: var(--primary-100);
`;

const ButtonBox = styled.button`
  display: flex;
  align-items: center;
  border-radius: var(--border-radius-1);
  background-color: var(--neutral-200);
  width: fit-content;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
  white-space: nowrap;
  color: var(--neutral-100);
  padding: 8px;
  font-size: 14px;
  line-height: 16px;

  &:hover,
  &:focus-visible {
    background-color: var(--primary-190);

    ${AddIcon} {
      background-color: var(--primary-180);
    }
  }

  &:active {
    background-color: var(--primary-180);

    ${AddIcon} {
      background-color: var(--primary-170) !important;
    }
  }

  &:disabled {
    pointer-events: none;
  }

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;

const Label = styled.div`
  padding-left: 8px;
  padding-right: 4px;
`;

function AddButton({ className, children, onClick, fullWidth }) {
  return (
    <ButtonBox className={className} onClick={onClick} type="button" fullWidth={fullWidth}>
      <AddIcon name={"add"} size={16} />
      {children && <Label>{children}</Label>}
    </ButtonBox>
  );
}

AddButton.propTypes = {
  className: T.string,
  children: T.oneOfType([T.object, T.string]),
  onClick: T.func,
  fullWidth: T.bool,
};

export default AddButton;
