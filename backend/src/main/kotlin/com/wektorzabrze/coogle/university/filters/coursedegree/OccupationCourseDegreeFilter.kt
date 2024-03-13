package com.wektorzabrze.coogle.university.filters.coursedegree

import com.fasterxml.jackson.databind.ObjectMapper
import com.wektorzabrze.coogle.infrastructure.asList
import com.wektorzabrze.coogle.university.CourseDegree
import org.springframework.stereotype.Component

@Component
class OccupationCourseDegreeFilter(private val objectMapper: ObjectMapper) : CourseDegreeSearchFilter {
    override fun filter(courseDegrees: Collection<CourseDegree>, filterValue: String): Collection<CourseDegree> =
        courseDegrees.filter { courseDegree ->
            val occupations = objectMapper.asList(filterValue, String::class.java)
            if (occupations.isEmpty()) true else occupations.any { occupation ->
                courseDegree.occupations.map { it.uppercase() }.contains(occupation.uppercase())
            }
        }

    override val discriminator: String
        get() = "occupations"

}