import React from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";
import SVG from "react-inlinesvg";

const SVGStyled = styled(SVG)`
  display: block;
  flex-shrink: 0;
  user-select: none;

  & path,
  & circle {
    fill: ${({ color }) => color && `var(--${color})`};
  }

  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `}
`;

function TagIcon({ className, name, size = 18, color, onClick }) {
  return (
    <SVGStyled
      className={className}
      src={`/icons/${name}.svg`}
      width={size}
      height={size}
      title={name}
      color={color}
      onClick={onClick}
    />
  );
}

TagIcon.propTypes = {
  className: T.string,
  name: T.string,
  size: T.number,
  color: T.string,
  onClick: T.func,
};

export default TagIcon;
