import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import Typography from "commons/components/Typography";
import Flexbox from "commons/components/Flexbox";

const Box = styled(Flexbox)`
  height: ${({ height }) => height && height};
`;

const Image = styled.img`
  height: 144px;
  width: 144px;
`;

const Label = styled(Typography)`
  max-width: 320px;
  text-align: center;
`;

function EmptyState({ className, height, image, label }) {
  return (
    <Box
      className={className}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height={height}
      gap={24}
    >
      {image && <Image src={image} />}
      <Label variant="h4" color="neutral-160">
        {label}
      </Label>
    </Box>
  );
}

EmptyState.propTypes = {
  className: T.string,
  height: T.string,
  image: T.string,
  label: T.string.isRequired,
};

export default EmptyState;
