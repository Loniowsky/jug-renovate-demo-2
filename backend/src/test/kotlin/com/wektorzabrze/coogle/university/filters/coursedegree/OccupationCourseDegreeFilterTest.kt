package com.wektorzabrze.coogle.university.filters.coursedegree

import com.fasterxml.jackson.databind.ObjectMapper
import com.wektorzabrze.coogle.university.CourseDegree
import io.kotest.matchers.collections.shouldContainAll
import org.junit.jupiter.api.Test

class OccupationCourseDegreeFilterTest{

    private val sut = OccupationCourseDegreeFilter(ObjectMapper())


    @Test
    fun `should handle interests filter`() {
        //given
        val courseDegrees = listOf(
            CourseDegree("Informatyka", occupations = listOf("Programista", "Analityk biznesowy", "Architekt systemów")),
            CourseDegree("Socjologia", occupations = listOf("Socjolog")),
            CourseDegree("Geoinformatyka", occupations = listOf("Programista", "Analityk biznesowy", "Architekt systemów")),
            CourseDegree("Kierunek", occupations = listOf("Analityk biznesowy"))
        )
        val filterValue = """["programista", "socjolog"]"""

        //when
        val result = sut.filter(courseDegrees, filterValue)

        //then
        result shouldContainAll listOf(
            CourseDegree("Informatyka", occupations = listOf("Programista", "Analityk biznesowy", "Architekt systemów")),
            CourseDegree("Socjologia", occupations = listOf("Socjolog")),
            CourseDegree("Geoinformatyka", occupations = listOf("Programista", "Analityk biznesowy", "Architekt systemów"))
        )
    }
}