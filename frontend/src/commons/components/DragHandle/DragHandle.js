import React, { forwardRef } from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import Icon from "../Icon";

const Wrap = styled.div`
  padding: 12px 4px;
  cursor: grab;
`;

// eslint-disable-next-line react/display-name
const DragHandle = forwardRef(({ className, onPointerDown, onKeyDown }, ref) => {
  return (
    <Wrap className={className} ref={ref} onPointerDown={onPointerDown} onKeyDown={onKeyDown}>
      <Icon name="drag_handle" size={20} />
    </Wrap>
  );
});

DragHandle.propTypes = {
  className: T.string,
  onPointerDown: T.func,
  onKeyDown: T.func,
};

export default DragHandle;
