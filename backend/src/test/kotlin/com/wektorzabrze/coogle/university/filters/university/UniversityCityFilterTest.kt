package com.wektorzabrze.coogle.university.filters.university

import com.wektorzabrze.coogle.university.University
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.wektorzabrze.coogle.university.Address

class UniversityCityFilterTest{
    @Test
    fun `should filter only universities in Kraków`() {
        val result = UniversityCityFilter(jacksonObjectMapper()).filter(
            listOf(
                University(address = Address(city = "Kraków")),
                University(address = Address(city = "Wrocław")),
                University(address = Address(city = "Kraków")),
            ),
            value = """["Kraków"]"""
        )

        assertEquals(2, result.size)
    }

    @Test
    fun `should filter only universities in Kraków and Wrocław`() {
        val result = UniversityCityFilter(jacksonObjectMapper()).filter(
            listOf(
                University(address = Address(city = "Kraków")),
                University(address = Address(city = "Wrocław")),
                University(address = Address(city = "Kraków")),
            ),
            value = """["Kraków", "Wrocław"]"""
        )

        assertEquals(3, result.size)
    }

    @Test
    fun `should filter all universities`() {
        val result = UniversityCityFilter(jacksonObjectMapper()).filter(
            listOf(
                University(address = Address(city = "Kraków")),
                University(address = Address(city = "Wrocław")),
                University(address = Address(city = "Kraków")),
                University(address = Address(city = "Zbąszynek")),
            ),
            value =  """[]"""
        )

        assertEquals(4, result.size)
    }

    @Test
    fun `should filter non universities`() {
        val result = UniversityCityFilter(jacksonObjectMapper()).filter(
            listOf(
                University(address = Address(city = "Kraków")),
                University(address = Address(city = "Wrocław")),
                University(address = Address(city = "Kraków")),
            ),
            value = """["Zbąszynek"]"""
        )

        assertEquals(0, result.size)
    }
}