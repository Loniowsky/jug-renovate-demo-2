package com.wektorzabrze.coogle.university.filters.university

import com.fasterxml.jackson.databind.ObjectMapper
import com.wektorzabrze.coogle.university.University
import com.wektorzabrze.coogle.university.UniversityType
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class UniversityTypeFilterTest{

    @Test
    fun `should filter only private universities`() {
        val result = UniversityTypeFilter(ObjectMapper()).filter(
            listOf(
                University(type = UniversityType.PRIVATE),
                University(type = UniversityType.PUBLIC),
                University(type = UniversityType.PRIVATE),
            ),
            value = """["PRIVATE"]"""
        )

        assertEquals(2, result.size)
    }

    @Test
    fun `should filter only public universities`() {
        val result = UniversityTypeFilter(ObjectMapper()).filter(
            listOf(
                University(type = UniversityType.PRIVATE),
                University(type = UniversityType.PUBLIC),
                University(type = UniversityType.PRIVATE),
            ),
            value = """["PUBLIC"]"""
        )
        assertEquals(1, result.size)
    }
}