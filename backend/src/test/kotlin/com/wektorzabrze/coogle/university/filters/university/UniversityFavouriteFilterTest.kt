package com.wektorzabrze.coogle.university.filters.university

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.wektorzabrze.coogle.university.University
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class UniversityFavouriteFilterTest {
    @Test
    fun `should return all`() {
        val result = UniversityFavouriteFilter(jacksonObjectMapper()).filter(
            listOf(
                University(isFavourite = false),
                University(isFavourite = true),
            ),
            value = "false"
        )
        assertEquals(2, result.size)
    }

    @Test
    fun `should return favourites`() {
        val result = UniversityFavouriteFilter(jacksonObjectMapper()).filter(
            listOf(
                University(isFavourite = false),
                University(isFavourite = true),
            ),
            value = "true"
        )
        assertEquals(1, result.size)
    }
}