package com.wektorzabrze.coogle.university.filters.coursedegree

import com.fasterxml.jackson.databind.ObjectMapper
import com.wektorzabrze.coogle.university.CourseDegree
import org.springframework.stereotype.Component

@Component
class StationaryCourseDegreeFilter(val objectMapper: ObjectMapper) : CourseDegreeSearchFilter {

    override fun filter(courseDegrees: Collection<CourseDegree>, filterValue: String): Collection<CourseDegree> {
        val stationary = mapFilterValue(filterValue)
        return courseDegrees.filter { courseDegree -> courseDegree.stationary == stationary}
    }

    override val discriminator: String
        get() = "stationary"

    private fun mapFilterValue(filterValue: String): Boolean =
        objectMapper.readValue(filterValue, Boolean::class.java)
}