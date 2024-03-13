import React from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";

const variantsMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  paragraph: "p",
  label: "span",
  timer: "span",
  mono: "span",
};

const StyledComponent = styled.div`
  color: ${({ color }) => (color ? `var(--${color})` : "inherit")};
  margin: ${({ margin }) => margin};

  ${({ variant }) =>
    variant === "h1" &&
    css`
      font-family: "Gabarito", sans-serif;
      font-size: 48px;
      line-height: 64px;
      font-weight: 700;
      letter-spacing: -0.02em;
    `};

  ${({ variant }) =>
    variant === "h2" &&
    css`
      font-family: "Gabarito", sans-serif;
      font-size: 36px;
      line-height: 48px;
      font-weight: 700;
      letter-spacing: -0.02em;
    `};

  ${({ variant }) =>
    variant === "h3" &&
    css`
      font-family: "Gabarito", sans-serif;
      font-size: 22px;
      line-height: 32px;
      font-weight: 700;
      letter-spacing: -0.02em;
    `};

  ${({ variant }) =>
    variant === "h4" &&
    css`
      font-family: "Gabarito", sans-serif;
      font-size: 18px;
      line-height: 28px;
      font-weight: 600;
      letter-spacing: -0.02em;
    `};

  ${({ variant }) =>
    variant === "label" &&
    css`
      font-size: 14px;
      line-height: 20px;
    `};

  ${({ variant }) =>
    variant === "body" &&
    css`
      font-size: 16px;
      line-height: 20px;
    `};

  ${({ variant }) =>
    variant === "paragraph" &&
    css`
      font-size: 16px;
      line-height: 28px;
    `};

  ${({ variant }) =>
    variant === "timer" &&
    css`
      font-size: 18px;
      line-height: 20px;
    `};

  ${({ variant }) =>
    variant === "mono" &&
    css`
      font-family: "Roboto Mono";
      font-size: 20px;
      line-height: 24px;
      font-weight: 500;
    `};

  ${({ variant }) =>
    variant === "tableHeader" &&
    css`
      font-size: 12px;
      line-height: 20px;
      font-weight: 500;
      text-transform: uppercase;
    `};
`;

function Typography({
  className,
  variant = "body",
  color,
  children,
  as,
  margin = "",
  ...props
}) {
  const component = as || variantsMapping[variant] || "p";

  return (
    <StyledComponent
      className={className}
      as={component}
      variant={variant}
      color={color}
      margin={margin}
      {...props}
    >
      {children}
    </StyledComponent>
  );
}

Typography.propTypes = {
  className: T.string,
  variant: T.oneOf([
    "h1",
    "h2",
    "h3",
    "h4",
    "label",
    "body",
    "paragraph",
    "timer",
    "mono",
    "tableHeader",
  ]),
  color: T.string,
  children: T.oneOfType([T.object, T.string, T.node]),
  as: T.string,
  margin: T.string,
};

export default Typography;
