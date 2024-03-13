package com.wektorzabrze.coogle.university.filters.coursedegree

import com.fasterxml.jackson.databind.ObjectMapper
import com.wektorzabrze.coogle.university.CourseDegree
import io.kotest.matchers.collections.shouldContainAll
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class StationaryCourseDegreeFilterTest {

    private val sut = StationaryCourseDegreeFilter(ObjectMapper())

    @Test
    fun `should return correct discriminator`() = assertEquals("stationary", sut.discriminator)

    @Test
    fun `should filter based on chosen stationary`() {
        //given
        val courseDegrees = listOf(
            CourseDegree("Informatyka", stationary = true),
            CourseDegree("Socjologia", stationary = false),
            CourseDegree("Geoinformatyka", stationary = false),
        )
        val filterValue = "false"

        //when
        val result = sut.filter(courseDegrees, filterValue)

        //then
        result shouldContainAll listOf(
            CourseDegree("Socjologia", stationary = false),
            CourseDegree("Geoinformatyka", stationary = false),
        )
    }

}