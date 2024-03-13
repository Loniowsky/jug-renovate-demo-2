package com.wektorzabrze.coogle.university.filters.coursedegree

import com.fasterxml.jackson.databind.ObjectMapper
import com.wektorzabrze.coogle.infrastructure.asList
import com.wektorzabrze.coogle.university.CourseDegree
import org.springframework.stereotype.Component

@Component
class InterestCourseDegreeFilter(private val objectMapper: ObjectMapper) : CourseDegreeSearchFilter {
    override fun filter(courseDegrees: Collection<CourseDegree>, filterValue: String): Collection<CourseDegree> =
        courseDegrees.filter { courseDegree ->
            val interests = objectMapper.asList(filterValue, String::class.java)
            if (interests.isEmpty()) true else interests.any { interest ->
                courseDegree.interests.map { it.uppercase() }.contains(interest.uppercase())
            }
        }

    override val discriminator: String
        get() = "interests"
}