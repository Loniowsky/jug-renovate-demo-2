package com.wektorzabrze.coogle.university.filters.coursedegree

import com.fasterxml.jackson.databind.ObjectMapper
import com.wektorzabrze.coogle.university.CourseDegree
import io.kotest.matchers.collections.shouldContainAll
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.Test

class KeywordCourseDegreeFilterTest {

    private val sut = KeywordCourseDegreeFilter(ObjectMapper())

    @Test
    fun `should properly handle empty course list`() {
        //given
        val courseDegrees = emptyList<CourseDegree>()
        val filterValue = """["Informatyka"]"""

        //when
        val result = sut.filter(courseDegrees, filterValue)

        //then
        result shouldBe emptyList()
    }


    @Test
    fun `should properly handle single value filter`() {
        //given
        val courseDegrees = listOf(
            CourseDegree("Informatyka"),
            CourseDegree("Socjologia"),
            CourseDegree("Geoinformatyka"),
            CourseDegree("Nieinfa", "Informatyka dla niemców")
        )
        val filterValue = """["Informatyka"]"""

        //when
        val result = sut.filter(courseDegrees, filterValue)

        //then
        result shouldContainAll listOf(
            CourseDegree("Informatyka"),
            CourseDegree("Geoinformatyka"),
            CourseDegree("Nieinfa", "Informatyka dla niemców")
        )
    }

    @Test
    fun `should properly handle multiple value filter`() {
        //given
        val courseDegrees = listOf(
            CourseDegree("Informatyka"),
            CourseDegree("Socjologia"),
            CourseDegree("Pielęgniarstwo"),
            CourseDegree("Chirurgia"),
            CourseDegree("Geoinformatyka"),
            CourseDegree("Nieinfa", "Informatyka dla niemców")
        )
        val filterValue = """["Informatyka", "socjologia"]"""

        //when
        val result = sut.filter(courseDegrees, filterValue)

        //then
        result shouldContainAll listOf(
            CourseDegree("Informatyka"),
            CourseDegree("Socjologia"),
            CourseDegree("Geoinformatyka"),
            CourseDegree("Nieinfa", "Informatyka dla niemców")
        )
    }

    @Test
    fun `should properly empty filter list`() {
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

}