import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import T from "prop-types";
import Icon from "../Icon";

const linkStyles = css`
  display: inline-block;
  text-decoration: none;
  color: var(--primary-100);
  transition: color 0.1s;

  &:hover,
  &:focus-visible {
    color: var(--primary-90);
  }
`;

const ExternalLink = styled.a`
  ${linkStyles};

  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const RouterLink = styled(Link)`
  ${linkStyles};

  text-decoration: underline;
`;

function TextLink({ className, children, to, isAbsolute }) {
  return (
    <>
      {isAbsolute ? (
        <ExternalLink href={to} target="_blank">
          {children}
          <Icon name="open_in_new" />
        </ExternalLink>
      ) : (
        <RouterLink className={className} to={to}>
          {children}
        </RouterLink>
      )}
    </>
  );
}

TextLink.propTypes = {
  className: T.string,
  children: T.string,
  to: T.string,
  isAbsolute: T.bool,
};

export default TextLink;
