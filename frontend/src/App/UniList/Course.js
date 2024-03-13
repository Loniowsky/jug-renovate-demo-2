import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import Detail from "./Detail";
import Typography from "commons/components/Typography";
import Flexbox from "commons/components/Flexbox";

const Box = styled(Flexbox)`
  width: 100%;
`;

const TypographyFlex = styled(Typography)`
  display: flex;
  justify-content: space-between;
  color: var(--primary-100);
`;

const Tuition = styled.div`
  color: var(--primary-140);
  font-size: 24px;
`;

const levelMap = {
  "1inz": "I stopnia (inżynierskie)",
  "1lic": "I stopnia (licencjackie)",
  2: "II stopnia",
  "2jednolite": "Jednoliste magisterskie",
};

function Course({ className, course }) {
  return (
    <Box className={className} padding={16} isBordered flexDirection="column">
      {console.log(course)}
      <TypographyFlex variant="h2">
        {course.name}
        <Tuition>{course.tuition} PLN</Tuition>
      </TypographyFlex>

      <Flexbox gap={32} margin="24px 0 32px 0">
        <Detail
          variant="vertical"
          label="Poziom studiów"
          value={levelMap[course.level] || course.level}
        />
        <Detail
          variant="vertical"
          label="Tryb"
          value={course.stationary ? "Stacjonarne" : "Niestacjonarne"}
        />
        <Detail variant="vertical" label="Język" value={course.language} />
        <Detail
          variant="vertical"
          label="Mediana zarobków"
          value={course.earningsMedian + " PLN" || "-"}
        />
      </Flexbox>

      <Typography variant="h3">Syllabus:</Typography>
      {course.syllabus.semesters.map((semester) => (
        <Flexbox padding="8px 0" flexDirection="column" key={semester.ordinal}>
          <b>Semestr {semester.ordinal}:</b>
          {semester.subjects.join(", ")}
        </Flexbox>
      ))}
    </Box>
  );
}

Course.propTypes = {
  className: T.string,
};

export default Course;
