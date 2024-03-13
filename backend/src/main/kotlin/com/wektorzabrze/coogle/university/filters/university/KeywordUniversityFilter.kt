package com.wektorzabrze.coogle.university.filters.university

import com.fasterxml.jackson.databind.ObjectMapper
import com.wektorzabrze.coogle.infrastructure.asList
import com.wektorzabrze.coogle.university.University
import org.springframework.stereotype.Component

@Component
class KeywordUniversityFilter(val objectMapper: ObjectMapper) : UniversitySearchFilter {
    override fun filter(universities: Collection<University>, value: String): Collection<University> {
        val keywords = objectMapper.asList(value, String::class.java)
        return universities.filter { university -> if(keywords.isEmpty()) true else keywords.any{ university.name.contains(it) } }
    }

    override val discriminator: String
        get() = "keywords"
}