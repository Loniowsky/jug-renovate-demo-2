package com.wektorzabrze.coogle.university.filters.university

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.wektorzabrze.coogle.university.Coordinates
import com.wektorzabrze.coogle.university.University
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class UniversityDistanceFilterTest{

    @Test
    fun `should return correct discriminator`() = assertEquals(UniversityDistanceFilter(jacksonObjectMapper()).discriminator, "distance")
    
    @Test
    fun `Polaniec should be in less than 200km distanece from Kraków`() {
        val result = UniversityDistanceFilter(jacksonObjectMapper()).filter(listOf(University(coordinates = Coordinates(latitude = 50.43324, longitude = 21.2812))), value = """{"userCoordinates": {"latitude": 50.06143, "longitude": 19.93658}, "distance": 200}""")
        assertEquals(1, result.size)
    }

    @Test
    fun `0 0 cords should be not in less than 200km distanece from Kraków`() {
        val result = UniversityDistanceFilter(jacksonObjectMapper()).filter(listOf(University(coordinates = Coordinates(latitude = 0.0, longitude = 0.0))), value = """{"userCoordinates": {"latitude": 50.06143, "longitude": 19.93658}, "distance": 200}""")
        assertEquals(0, result.size)
    }
}