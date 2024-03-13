import React, { useEffect, useState } from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import Typography from "commons/components/Typography";
import Flexbox from "commons/components/Flexbox";
import Filter from "./Filter";
import { filterStructure } from "commons/util/constants";
import callLocalStorage from "../../commons/util/callLocalStorage";
import callApi from "commons/util/callApi";

const Box = styled.div`
  width: 380px;
  flex-shrink: 0;
  padding: 16px 8px 16px 32px;
`;

const FlexboxStyled = styled(Flexbox)`
  overflow-y: auto;
  height: calc(100vh - 270px);
`;

function Filters({ className, filters, setFilters, finalsResults }) {
  const position = callLocalStorage("userLocation", "get") || [
    50.06143, 19.93658,
  ];

  const userLocation = {
    lat: position[0],
    lng: position[1],
  };

  function updateFilters(id, value) {
    let newValue;

    if (!filters[id]) {
      newValue = [value];
    } else if (filters[id].includes(value)) {
      newValue = filters[id].filter((filterId) => filterId !== value);
    } else {
      newValue = [...filters[id], value];
    }

    const newPreferences = { ...filters, [id]: newValue };
    setFilters(newPreferences);
  }

  return (
    <Box className={className}>
      <Typography variant="h3">Filtry</Typography>
      <FlexboxStyled flexDirection="column" gap={8} marginTop={16} isBordered>
        <Filter
          id="graduationExamResults"
          label="Uwzględnij moje wyniki maturalne"
          type="bool"
          value={filters.graduationExamResults}
          onChange={(value) =>
            setFilters((currentFilters) => ({
              ...currentFilters,
              graduationExamResults: value,
            }))
          }
          disabled={
            !finalsResults || !finalsResults.filter((el) => el.subject).length
          }
        />
        <Filter
          id="stationary"
          label="Stacjonarne"
          type="bool"
          value={filters.stationary}
          onChange={(value) =>
            setFilters((currentFilters) => ({
              ...currentFilters,
              stationary: value,
            }))
          }
        />
        <Filter
          id="distance"
          label="Odległość"
          type="number"
          step={30}
          value={filters.distance ? filters.distance.distance : 0}
          min={0}
          max={10000}
          onChange={(value) => {
            const result = {
              userCoordinates: {
                latitude: userLocation.lat,
                longitude: userLocation.lng,
              },
              distance: value,
            };
            setFilters((currentFilters) => {
              if (result.distance === 0) {
                const { distance, ...newFilters } = currentFilters;
                return { ...newFilters };
              }
              return {
                ...currentFilters,
                distance: result,
              };
            });
          }}
        />
        {filterStructure.map((el) => (
          <Filter
            {...el}
            key={el.id}
            value={filters[el.id]}
            onChange={(value) => updateFilters(el.id, value)}
          />
        ))}
      </FlexboxStyled>
    </Box>
  );
}

Filters.propTypes = {
  className: T.string,
  filters: T.object,
  setFilters: T.func,
};

export default Filters;
