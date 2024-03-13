package com.wektorzabrze.coogle.university.filters.coursedegree

import com.fasterxml.jackson.databind.ObjectMapper
import com.wektorzabrze.coogle.infrastructure.asList
import com.wektorzabrze.coogle.university.CourseDegree
import org.springframework.stereotype.Component

@Component
class LevelCourseDegreeFilter(val objectMapper: ObjectMapper) : CourseDegreeSearchFilter {

    override fun filter(courseDegrees: Collection<CourseDegree>, filterValue: String): Collection<CourseDegree> {
        val levels = mapFilterValue(filterValue)
        if (levels.isEmpty()) {
            return courseDegrees
        }

        return courseDegrees.filter { courseDegree ->
            levels.any { interest ->
                interest.uppercase() == courseDegree.level.uppercase()
            }
        }
    }

    override val discriminator: String
        get() = "level"

    private fun mapFilterValue(filterValue: String): List<String> =
        objectMapper.asList(filterValue, String::class.java)
}