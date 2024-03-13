package com.wektorzabrze.coogle.university.filters.coursedegree

import com.fasterxml.jackson.databind.ObjectMapper
import com.wektorzabrze.coogle.infrastructure.asList
import com.wektorzabrze.coogle.university.CourseDegree

class KeywordCourseDegreeFilter(val objectMapper: ObjectMapper) : CourseDegreeSearchFilter {

    override fun filter(courseDegrees: Collection<CourseDegree>, filterValue: String): Collection<CourseDegree> =
        courseDegrees
            .filter { courseDegree ->
                val keywords = mapFilterValue(filterValue)
                if(keywords.isEmpty()) true else keywords.any {
                    courseDegree.name.uppercase().contains(it.uppercase()) || courseDegree.description.uppercase().contains(it.uppercase())
                }
            }

    override val discriminator: String
        get() = "keywords"

    private fun mapFilterValue(filterValue: String): List<String> =
        objectMapper.asList(filterValue, String::class.java)
}