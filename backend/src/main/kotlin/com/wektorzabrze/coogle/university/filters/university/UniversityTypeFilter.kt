package com.wektorzabrze.coogle.university.filters.university

import com.fasterxml.jackson.databind.ObjectMapper
import com.wektorzabrze.coogle.infrastructure.asList
import com.wektorzabrze.coogle.university.University
import com.wektorzabrze.coogle.university.UniversityType
import org.springframework.stereotype.Component

@Component
class UniversityTypeFilter(val objectMapper: ObjectMapper) : UniversitySearchFilter {
    override fun filter(universities: Collection<University>, value: String): Collection<University> {
        val universityTypes = objectMapper.asList(value, UniversityType::class.java)
        return universities.filter { uni -> if(universityTypes.isEmpty()) true else universityTypes.contains(uni.type) }
    }

    override val discriminator: String
        get() = "universityType"

}

