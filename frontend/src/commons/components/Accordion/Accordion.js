import React, { useState } from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import Icon from "commons/components/Icon";
import Flexbox from "commons/components/Flexbox";

const Box = styled.div`
  background-color: var(--neutral-190);
  border-radius: var(--border-radius-2);
`;

const Header = styled(Flexbox)`
  padding: 12px;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: var(--neutral-180);
  }
`;

const Content = styled.div`
  padding: 8px 12px 16px;
`;

function Accordion({ className, label, children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box className={className}>
      <Header justifyContent="space-between" alignItems="center" onClick={() => setIsExpanded(open => !open)}>
        {label}
        <Icon name={isExpanded ? "expand_less" : "expand_more"} />
      </Header>
      {isExpanded && <Content>{children}</Content>}
    </Box>
  );
}

Accordion.propTypes = {
  className: T.string,
  label: T.string,
  children: T.oneOfType([T.object, T.string, T.node]),
};

export default Accordion;
