import React from "react";
import styled from "styled-components/macro";
import { Outlet } from "react-router-dom";

const Box = styled.div`
  min-height: 100vh;
  overflow: hidden;
`;

function App() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}

export default App;
