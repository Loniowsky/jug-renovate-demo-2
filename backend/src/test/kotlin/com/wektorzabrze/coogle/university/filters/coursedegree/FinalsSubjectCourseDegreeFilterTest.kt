package com.wektorzabrze.coogle.university.filters.coursedegree

import com.fasterxml.jackson.databind.ObjectMapper
import com.wektorzabrze.coogle.university.CourseDegree
import io.kotest.matchers.collections.shouldContainAll
import io.kotest.matchers.equals.shouldBeEqual
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class FinalsSubjectCourseDegreeFilterTest {

    private val sut = FinalsSubjectCourseDegreeFilter(ObjectMapper())

    @Test
    fun `should return correct discriminator`() = assertEquals("finalsSubjects", sut.discriminator)

    @Test
    fun `should filter based on multiple value filter`() {
        //given
        val expectedCourse1 = CourseDegree("Informatyka", finalsSubjects = listOf("matematyka", "informatyka"))
        val expectedCourse2 = CourseDegree("Geoinformatyka", finalsSubjects = listOf("geografia", "informatyka"))
        val courseDegrees = listOf(
            expectedCourse1,
            CourseDegree("Socjologia", finalsSubjects = listOf("polski", "historia")),
            CourseDegree("Pielęgniarstwo", finalsSubjects = listOf("biologia")),
            expectedCourse2,
        )
        val filterValue = """["Informatyka", "matEMatyka"]"""

        //when
        val result = sut.filter(courseDegrees, filterValue)

        //then
        result shouldContainAll listOf(expectedCourse1, expectedCourse2)
    }

    @Test
    fun `should not filter out courses for empty filter list`() {
        //given
        val courseDegrees = listOf(
            CourseDegree("Informatyka"),
            CourseDegree("Socjologia")
        )
        val filterValue = """[]"""

        //when
        val result = sut.filter(courseDegrees, filterValue)

        //then
        result shouldContainAll listOf(
            CourseDegree("Informatyka"),
            CourseDegree("Socjologia")
        )
    }

    @Test
    fun `should filter courses with empty finals subjects`() {
        //given
        val courseDegrees = listOf(
            CourseDegree("Informatyka"),
            CourseDegree("Socjologia")
        )
        val filterValue = """["some test value"]"""

        //when
        val result = sut.filter(courseDegrees, filterValue)

        //then
        result.isEmpty() shouldBeEqual true
    }
}