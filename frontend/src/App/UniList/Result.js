import React, { useState } from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import Image from "commons/components/Image";
import Flexbox from "commons/components/Flexbox";
import Icon from "commons/components/Icon";
import Typography from "commons/components/Typography";
import callApi from "commons/util/callApi";
import Modal from "commons/components/Modal";
import Tag from "commons/components/Tag";
import TextLink from "commons/components/TextLink";
import Tooltip from "../../commons/components/Tooltip";
import Course from "./Course";

const Box = styled(Flexbox)`
  position: relative;
  background-color: var(--neutral-200);
  box-shadow: var(--shadow-1);
  overflow: hidden;
  cursor: pointer;
  min-height: 140px;

  &:hover {
    box-shadow: var(--shadow-2);
  }
`;

const FavoriteIcon = styled(Icon)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const RatingBadge = styled.div`
  background: ${(props) => props.color};
  width: 32px;
  height: 32px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  color: var(--neutral-200);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlexTypography = styled(Typography)`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const DetailsModal = styled(Modal)`
  max-width: 800px;
  max-height: 800px;
  overflow-y: auto;
`;

const ImageRounded = styled(Image)`
  border-radius: var(--border-radius-1);
`;

function Result({
  className,
  id,
  name,
  imageUrl,
  location,
  isFavorite: initIsFavorite,
  courses,
  rating,
  ...rest
}) {
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(initIsFavorite);

  function getRatingColor() {
    if (rating <= 100 && rating >= 80) {
      return "#93e08c";
    } else if (rating < 80 && rating >= 60) {
      return "#cbdd63";
    } else if (rating < 60 && rating >= 40) {
      return "#facc2b";
    } else if (rating < 40 && rating >= 20) {
      return "#f69a67";
    } else if (rating < 20 && rating >= 0) {
      return "#ee7575";
    }
    return "#39393a";
  }

  return (
    <>
      <Box
        className={className}
        gap={16}
        marginTop={16}
        onClick={() => setShowModal(true)}
      >
        <Image
          src={imageUrl || ""}
          alt={`${name} image`}
          width="100px"
          height="100%"
        />
        <FavoriteIcon
          name="favorite"
          color="red-100"
          size={20}
          isFilled={isFavorite}
          onClick={(e) => {
            e.stopPropagation();
            if (isFavorite) {
              callApi("university/" + id + "/favourite", "delete");
            } else {
              callApi("university/" + id + "/favourite", "post");
            }
            setIsFavorite(!isFavorite);
          }}
        />
        <Tooltip
          label={"Ranking Perspektywy 2023"}
          triggerStyles={{
            position: "absolute",
            bottom: "8px",
            right: "8px",
          }}
        >
          <RatingBadge color={getRatingColor()}>{rating}</RatingBadge>
        </Tooltip>
        <Flexbox
          flexDirection="column"
          gap={4}
          paddingTop={8}
          paddingBottom={16}
          paddingRight={16}
        >
          <Typography variant="h4" margin="0 12px 0 0">
            {name}
          </Typography>
          <FlexTypography variant="body">
            <Icon name="location_on" />
            {location}
          </FlexTypography>
          <Flexbox flexWrap="wrap" gap={4} marginTop="auto" marginRight={24}>
            {courses.map((course) => (
              <Tag key={course.name} label={course.name} color="grey" />
            ))}
          </Flexbox>
        </Flexbox>
      </Box>

      {showModal && (
        <DetailsModal handleClose={() => setShowModal(false)}>
          <Flexbox flexDirection="column" padding="24px" gap={8}>
            <ImageRounded
              src={imageUrl || ""}
              alt={`${name} image`}
              width="100%"
              height="200px"
            />

            <Flexbox justifyContent="space-between" alignItems="center">
              <Typography variant="h2">{name}</Typography>
              <Tooltip label="Ranking Perspektywy 2023">
                <RatingBadge color={getRatingColor()}>{rating}</RatingBadge>
              </Tooltip>
            </Flexbox>
            <FlexTypography variant="body">
              <Icon name="location_on" />
              {rest.address.city}, ul.{rest.address.street}{" "}
              {rest.address.buildingNumber}
            </FlexTypography>
            <TextLink to={rest.siteURL} isAbsolute>
              {rest.siteURL}
            </TextLink>

            <Typography variant="paragraph" margin="32px 0 0 0">
              <b>Typ uczelni:</b>{" "}
              {rest.type === "PUBLIC" ? "Publiczna" : "Prywatna"}
            </Typography>
            <Typography variant="paragraph">
              <b>Stypendia:</b> {rest.scholarships.map((el) => el).join(", ")}
            </Typography>
            <Typography variant="paragraph">
              <b>Kluby:</b> {rest.clubs.map((el) => el.name).join(", ")}
            </Typography>
            <Typography variant="paragraph">
              <b>W pobliżu:</b>{" "}
              {rest.amenities
                .map((el) => `${el.name} - ${el.distance}m`)
                .join(", ")}
            </Typography>
            <Typography variant="paragraph">
              <b>Udogodnienia dla niepełnosprawnych:</b>{" "}
              {rest.accessibilitiesForDisabled.map((el) => el).join(", ")}
            </Typography>
            <Typography variant="h3" margin="32px 0 0 0">
              Kierunki:
            </Typography>
            <Flexbox flexWrap="wrap" gap={24}>
              {rest.courseDegrees.map((course) => (
                <Course key={course.name} course={course} />
              ))}
            </Flexbox>
          </Flexbox>
        </DetailsModal>
      )}
    </>
  );
}

Result.propTypes = {
  className: T.string,
  id: T.string,
  name: T.string,
  imageUrl: T.string,
  location: T.string,
  isFavorite: T.bool,
};

export default Result;
