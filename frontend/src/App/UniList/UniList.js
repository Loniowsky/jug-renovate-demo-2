import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import Header from "./Header";
import Flexbox from "commons/components/Flexbox";
import Filters from "./Filters";
import Results from "./Results";
import Map from "./Map";
import callApi from "commons/util/callApi";
import Navigation from "App/Navigation";
import { defaultFilters } from "commons/util/constants";

const Box = styled.div``;

function UniList() {
  const [searchString, setSearchString] = useState("");
  const [location, setLocation] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [refetch, setRefetch] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [finalsResults, setFinalsResults] = useState([
    { id: 0, subject: "", percentage: "" },
  ]);

  useEffect(() => {
    async function getUserFinals() {
      const res = await callApi("users/finals", "get");
      if (res && res.length !== 0) {
        setFinalsResults(res);
      }
    }

    getUserFinals();
  }, []);

  useEffect(() => {
    async function getUniversities() {
      setIsLoading(true);
      const res = await callApi("search/universities", "post", {
        keywords: [searchString],
        universityCity: location ? [location] : undefined,
        categories: categoryList,
        favourite: onlyFavorites,
        ...filters,
      });

      setUniversities(res);
      setIsLoading(false);
    }

    getUniversities();
  }, [searchString, location, categoryList, onlyFavorites, filters, refetch]);

  function resetFilters() {
    setSearchString("");
    setLocation();
    setCategoryList([]);
    setFilters(defaultFilters);
  }

  return (
    <Box>
      <Navigation
        searchString={searchString}
        setSearchString={setSearchString}
        location={location}
        setLocation={setLocation}
        resetFilters={resetFilters}
      />
      <Header
        categoryList={categoryList}
        setCategoryList={setCategoryList}
        refetch={refetch}
        setRefetch={setRefetch}
        finalsResults={finalsResults}
        setFinalsResults={setFinalsResults}
      />
      <Flexbox>
        <Filters
          filters={filters}
          setFilters={setFilters}
          finalsResults={finalsResults}
        />
        <Results
          isLoading={isLoading}
          results={universities}
          onlyFavorites={onlyFavorites}
          setOnlyFavorites={setOnlyFavorites}
        />
        <Map
          universities={universities
            .filter((uni) => uni.coordinates)
            .map((uni) => {
              return {
                position: [uni.coordinates.latitude, uni.coordinates.longitude],
                name: uni.name,
              };
            })}
          setFilters={setFilters}
          filters={filters}
        />
      </Flexbox>
    </Box>
  );
}

export default UniList;
