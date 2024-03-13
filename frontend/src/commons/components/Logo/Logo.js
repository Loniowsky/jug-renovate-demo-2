import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import Icon from "../Icon";

const LogoLink = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;
  font-family: "Gabarito";
  font-weight: 600;
  font-size: 28px;
  color: var(--primary-100);
`;

const LogoIcon = styled(Icon)`
  font-variation-settings: "FILL" 1;
`;

function Logo({ className, link }) {
  return (
    <LogoLink className={className} to={link}>
      <LogoIcon name="local_library" />
      Coogle
    </LogoLink>
  );
}

Logo.propTypes = {
  className: T.string,
  link: T.string,
};

export default Logo;
