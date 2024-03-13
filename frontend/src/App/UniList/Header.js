import React, { useEffect, useState } from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";
import Flexbox from "commons/components/Flexbox";
import Icon from "commons/components/Icon";
import Typography from "commons/components/Typography";
import { categories } from "commons/util/constants";
import Modal from "commons/components/Modal";
import Button from "commons/components/Button";
import SelectInput from "commons/components/SelectInput";
import NumberInput from "commons/components/NumberInput";
import callApi from "../../commons/util/callApi";

const Box = styled(Flexbox)`
  padding: 14px 32px;
  border-bottom: 1px solid var(--neutral-180);
  border-radius: var(--border-radius-0);
`;

const Circle = styled(Flexbox)`
  margin-top: 4px;
  position: relative;
  color: var(--neutral-200);
  padding: 8px;
  border-radius: 50%;

  &:after {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    width: calc(100% + 8px);
    height: calc(100% + 8px);
    border-radius: 50%;
    background-color: var(--neutral-180);
    z-index: var(--z-index-below);
    opacity: 0;
  }

  &:hover {
    &:after {
      opacity: 1;
    }
  }
`;

const Category = styled(Flexbox)`
  cursor: pointer;
  text-align: center;
  width: 100%;

  &:hover {
    color: var(--neutral-90);

    ${Circle}:after {
      opacity: 1;
    }
  }

  &:nth-child(1) {
    ${Circle} {
      background-color: var(--red-100);
    }
  }
  &:nth-child(2) {
    ${Circle} {
      background-color: var(--orange-100);
    }
  }
  &:nth-child(3) {
    ${Circle} {
      background-color: var(--yellow-100);
    }
  }
  &:nth-child(4) {
    ${Circle} {
      background-color: var(--lime-100);
    }
  }
  &:nth-child(5) {
    ${Circle} {
      background-color: var(--green-100);
    }
  }
  &:nth-child(6) {
    ${Circle} {
      background-color: var(--turquoise-100);
    }
  }
  &:nth-child(7) {
    ${Circle} {
      background-color: var(--blue-100);
    }
  }
  &:nth-child(8) {
    ${Circle} {
      background-color: var(--violet-100);
    }
  }
  &:nth-child(9) {
    ${Circle} {
      background-color: var(--purple-100);
    }
  }
  &:nth-child(10) {
    ${Circle} {
      background-color: var(--pink-100);
    }
  }

  ${({ $isActive, $shouldHighlightActive }) =>
    $shouldHighlightActive &&
    !$isActive &&
    css`
      ${Circle} {
        background-color: var(--neutral-170) !important;
      }
    `}
`;

const CategoryIcon = styled(Icon)`
  font-size: 20px;
`;

const ModalStyled = styled(Modal)`
  max-width: 640px;
  min-height: 409px;
  max-height: 640px;
  height: auto;
  overflow-y: auto;
`;

const NumberInputStyled = styled(NumberInput)`
  width: 200px;
`;

const SaveButton = styled(Button)`
  align-self: flex-end;
  margin-top: auto;
`;

function Header({
  className,
  categoryList,
  setCategoryList,
  refetch,
  setRefetch,
  finalsResults,
  setFinalsResults,
}) {
  const [showModal, setShowModal] = useState(false);
  function toggleCategory(id) {
    if (categoryList.includes(id)) {
      setCategoryList(categoryList.filter((categoryId) => categoryId !== id));
    } else {
      setCategoryList([...categoryList, id]);
    }
  }

  return (
    <>
      <Box
        className={className}
        alignItems="flex-start"
        justifyContent="space-between"
        gap={24}
      >
        <Flexbox gap={24}>
          {categories.map((category) => (
            <Category
              key={category.id}
              flexDirection="column"
              alignItems="center"
              gap={4}
              onClick={() => toggleCategory(category.id)}
              $shouldHighlightActive={categoryList.length > 0}
              $isActive={categoryList.includes(category.id)}
            >
              <Circle>
                <CategoryIcon name={category.icon} />
              </Circle>
              <Typography variant="label">{category.label}</Typography>
            </Category>
          ))}
        </Flexbox>
        <Button variant="secondary" onClick={() => setShowModal(true)}>
          Moje wyniki maturalne
        </Button>
      </Box>

      {showModal && (
        <ModalStyled handleClose={() => setShowModal(false)}>
          <Flexbox flexDirection="column" padding={40} gap={24}>
            <Typography variant="h3">Wyniki maturalne</Typography>
            {finalsResults.map((result) => (
              <React.Fragment key={result.id}>
                <Flexbox alignItems="flex-end" gap={16}>
                  <SelectInput
                    label="Przedmiot"
                    placeholder="Wybierz przedmiot"
                    options={[
                      { id: "matematyka", label: "Matematyka" },
                      { id: "fizyka", label: "Fizyka" },
                      { id: "polski", label: "Polski" },
                      { id: "geografia", label: "Geografia" },
                      { id: "angielski", label: "Angielski" },
                    ].map((it) => ({
                      ...it,
                      disabled: finalsResults.some((e) => e.subject === it.id),
                    }))}
                    value={result.subject}
                    onChange={(e) => {
                      let newArr = [...finalsResults]; // copying the old datas array
                      if (!newArr[result.id]) {
                        return;
                      }
                      newArr[result.id].subject = e;
                      setFinalsResults(newArr);
                    }}
                  />
                  <NumberInputStyled
                    label="Twój wynik"
                    rightIcon="percent"
                    value={result.percentage}
                    min={0}
                    max={100}
                    onChange={(e) => {
                      let newArr = [...finalsResults]; // copying the old datas array
                      if (!newArr[result.id]) {
                        return;
                      }
                      newArr[result.id].percentage = e;
                      setFinalsResults(newArr);
                    }}
                  />
                  <Button
                    variant="tertiary"
                    icon="delete"
                    size="medium"
                    onClick={() => {
                      setFinalsResults(
                        finalsResults.filter((res) => res.id !== result.id)
                      );
                    }}
                  />
                </Flexbox>
              </React.Fragment>
            ))}
            <Button
              variant="secondary"
              icon="add"
              onClick={() =>
                setFinalsResults([
                  ...finalsResults,
                  { id: finalsResults.length, subject: "", percentage: "" },
                ])
              }
            >
              Dodaj wynik
            </Button>

            <SaveButton
              size="medium"
              onClick={() => {
                setShowModal(false);
                callApi("users/finals", "put", finalsResults);
                setRefetch(!refetch);
              }}
              marginTop="auto"
            >
              Zapisz
            </SaveButton>
          </Flexbox>
        </ModalStyled>
      )}
    </>
  );
}

Header.propTypes = {
  className: T.string,
  searchString: T.string,
  setSearchString: T.func,
  categoryList: T.arrayOf(T.string),
  setCategoryList: T.func,
  location: T.string,
  setLocation: T.func,
};

export default Header;
