package com.wektorzabrze.coogle.university.filters.coursedegree

import com.fasterxml.jackson.databind.ObjectMapper
import com.wektorzabrze.coogle.university.CourseDegree
import io.kotest.matchers.collections.shouldContainAll
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class LevelCourseDegreeFilterTest {

    private val sut = LevelCourseDegreeFilter(ObjectMapper())

    @Test
    fun `should return correct discriminator`() = assertEquals("level", sut.discriminator)

    @Test
    fun `should filter based on chosen levels`() {
        //given
        val courseDegrees = listOf(
            CourseDegree("Informatyka", level = "1inz"),
            CourseDegree("Socjologia", level = ""),
            CourseDegree("Geoinformatyka", level = "2jednolite"),
            CourseDegree("Kierunek", level = "1lic")
        )
        val filterValue = """["1inz", "1lic"]"""

        //when
        val result = sut.filter(courseDegrees, filterValue)

        //then
        result shouldContainAll listOf(
            CourseDegree("Informatyka", level = "1inz"),
            CourseDegree("Kierunek", level = "1lic")

        )
    }

}