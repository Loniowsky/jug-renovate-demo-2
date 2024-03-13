import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import Logo from "commons/components/Logo";
import Flexbox from "commons/components/Flexbox";
import TextInput from "commons/components/TextInput";
import Button from "commons/components/Button";
import Popover from "commons/components/Popover";
import Icon from "commons/components/Icon";
import Filter from "./UniList/Filter";

const Box = styled(Flexbox)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--neutral-200);
  width: 100%;
  z-index: var(--z-index-above);
  padding: 14px 32px;
  border-bottom: 1px solid var(--neutral-180);
  border-radius: var(--border-radius-0);
  /* z-index: var(--z-index-0); */
`;

const FlexboxStyled = styled(Flexbox)`
  /* width: 100%; */
`;

const SearchInput = styled(TextInput)`
  width: 240px;
`;

const ButtonStyled = styled(Button)`
  width: 160px;
`;

const LocationsDropdown = styled(Flexbox)`
  width: 340px;
`;

const NavigationPlaceholder = styled.div`
  height: 69px;
`;

function Navigation({
  className,
  searchString,
  setSearchString,
  location,
  setLocation,
  resetFilters,
}) {
  return (
    <>
      <Box
        className={className}
        alignItems="center"
        justifyContent="space-between"
      >
        <Logo link="/" />

        <FlexboxStyled alignItems="flex-start" gap={16} marginLeft={40}>
          <SearchInput
            value={searchString}
            placeholder="Szukaj"
            leftIcon="search"
            onChange={setSearchString}
          />
          <Popover
            trigger={
              <ButtonStyled variant="tertiary" size="medium" icon="location_on">
                <Flexbox alignItems="center" gap={4}>
                  {location ? (
                    location
                  ) : (
                    <>
                      Lokalizacja <Icon name="expand_more" />
                    </>
                  )}
                </Flexbox>
              </ButtonStyled>
            }
            content={
              <LocationsDropdown padding={8}>
                <Filter
                  id="location"
                  label="Lokalizacja"
                  type="select"
                  options={[
                    { label: "Warszawa", value: "Warszawa" },
                    { label: "Kraków", value: "Kraków" },
                    { label: "Wrocław", value: "Wrocław" },
                    { label: "Poznań", value: "Poznań" },
                    { label: "Łódź", value: "Łódź" },
                    { label: "Gdańsk", value: "Gdańsk" },
                    { label: "Katowice", value: "Katowice" },
                    { label: "Szczecin", value: "Szczecin" },
                    { label: "Bydgoszcz", value: "Bydgoszcz" },
                    { label: "Białystok", value: "Białystok" },
                  ]}
                  value={location}
                  onChange={setLocation}
                  isSingleChoice
                />
              </LocationsDropdown>
            }
            placement="bottom-start"
          />
          <Button
            variant="tertiary"
            size="medium"
            icon="filter_alt_off"
            onClick={resetFilters}
          >
            Wyczyść wszystkie filtry
          </Button>
        </FlexboxStyled>
      </Box>
      <NavigationPlaceholder />
    </>
  );
}

Navigation.propTypes = {
  className: T.string,
  searchString: T.string,
  setSearchString: T.func,
  location: T.string,
  setLocation: T.func,
  resetFilters: T.func,
};

export default Navigation;
