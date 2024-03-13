import React from "react";
import styled from "styled-components/macro";
import Button from "commons/components/Button";
import Typography from "commons/components/Typography";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 144px;
  height: 100vh;
  background-color: var(--neutral-80);
`;

const Title = styled(Typography)`
  margin-bottom: 16px;
`;

const Subtitle = styled(Typography)`
  text-align: center;
  margin-bottom: 32px;
  font-weight: 500;
`;

function Page404() {
  return (
    <Box>
      <Title variant="h1" color="neutral-200">
        Looks like you&apos;re lost
      </Title>
      <Subtitle variant="paragraph" color="neutral-200">
        The page you are looking for does not exist.
      </Subtitle>
      <Button link="/" size="medium">
        Go to homepage
      </Button>
    </Box>
  );
}

export default Page404;
