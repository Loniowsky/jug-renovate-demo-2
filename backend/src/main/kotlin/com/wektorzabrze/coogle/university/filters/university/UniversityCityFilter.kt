package com.wektorzabrze.coogle.university.filters.university

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.wektorzabrze.coogle.university.University
import org.springframework.stereotype.Component

@Component
class UniversityCityFilter(val mapper: ObjectMapper): UniversitySearchFilter {
    override fun filter(universities: Collection<University>, value: String): Collection<University> {
        val cities = mapper.readValue(value, object : TypeReference<List<String>>() {})
        if (cities.isEmpty()) {
            return universities
        }
        return universities.filter { uni -> uni.address.city.uppercase() in cities.map { it.uppercase() } }
    }

    override val discriminator: String
        get() = "universityCity"

}