package com.wektorzabrze.coogle.university.filters.coursedegree

import com.fasterxml.jackson.databind.ObjectMapper
import com.wektorzabrze.coogle.university.CourseDegree
import io.kotest.matchers.collections.shouldContainAll
import org.junit.jupiter.api.Test

class InterestsCourseDegreeFilterTest {

    private val sut = InterestCourseDegreeFilter(ObjectMapper())

    @Test
    fun `should properly handle interest filter`() {
        //given
        val courseDegrees = listOf(
            CourseDegree("Informatyka", interests = listOf("Programowanie")),
            CourseDegree("Socjologia", interests = listOf("Stosunki międzyludzkie")),
            CourseDegree("Geoinformatyka", interests = listOf("Programowanie")),
            CourseDegree("Kierunek", interests = listOf("zainteresowanie"))
        )
        val filterValue = """["programowanie", "stosunki międzyludzkie"]"""

        //when
        val result = sut.filter(courseDegrees, filterValue)

        //then
        result shouldContainAll listOf(
            CourseDegree("Informatyka", interests = listOf("Programowanie")),
            CourseDegree("Socjologia", interests = listOf("Stosunki międzyludzkie")),
            CourseDegree("Geoinformatyka", interests = listOf("Programowanie"))
        )


    }

}