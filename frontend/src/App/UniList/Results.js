import React, { useState } from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import Typography from "commons/components/Typography";
import Result from "./Result";
import Tabs from "commons/components/Tabs";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import Loader from "commons/components/Loader";

const Box = styled.div`
  width: 100%;
  height: 80vh;
  overflow-y: auto;
  position: relative;
  padding: 16px;
`;

const TypographyRelative = styled(Typography)`
  position: relative;
`;

const LoaderAbsolute = styled(Loader)`
  position: absolute;
  top: -4px;
  left: 220px;
  width: 40px;
`;

const MotionCard = styled(motion.div)``;

const AnimatedItem = ({ children }) => {
  const isPresent = useIsPresent();
  const animations = {
    style: {
      position: isPresent ? "static" : "absolute",
    },
    initial: { y: 4, scale: 0.95, opacity: 0 },
    animate: { y: 0, scale: 1, opacity: 1 },
    exit: { y: 4, scale: 0.95, opacity: 0 },
  };
  return (
    <MotionCard {...animations} layout>
      {children}
    </MotionCard>
  );
};

function Results({
  className,
  isLoading,
  results,
  onlyFavorites,
  setOnlyFavorites,
}) {
  const [activeTabId, setActiveTabId] = useState(onlyFavorites ? "fav" : "all");

  function toggleFavTab() {
    if (activeTabId === "fav") {
      setActiveTabId("all");
      setOnlyFavorites(false);
    } else {
      setActiveTabId("fav");
      setOnlyFavorites(true);
    }
  }

  return (
    <Box className={className}>
      <TypographyRelative variant="h3" margin="0 0 16px 0">
        Wyniki wyszukiwania
        {isLoading && <LoaderAbsolute />}
      </TypographyRelative>
      <Tabs
        tabs={[
          { id: "all", label: "Wszystkie wyniki" },
          { id: "fav", label: "Ulubione" },
        ]}
        setActiveTabId={toggleFavTab}
        activeTabId={activeTabId}
      />
      {!isLoading && !results.length ? (
        <Typography margin="16px 0 0 0">Brak wyników</Typography>
      ) : (
        <>
          <AnimatePresence>
            {results.map((result) => (
              <AnimatedItem key={result.id}>
                <Result
                  id={result.id}
                  name={result.name}
                  imageUrl={result.photoUrl}
                  location={result.address.city}
                  isFavorite={result.isFavourite}
                  courses={result.courseDegrees}
                  rating={result.rating}
                  {...result}
                />
              </AnimatedItem>
            ))}
          </AnimatePresence>
        </>
      )}
    </Box>
  );
}

Results.propTypes = {
  className: T.string,
  isLoading: T.bool,
  results: T.array,
  onlyFavorites: T.bool,
  setOnlyFavorites: T.func,
};

export default Results;
