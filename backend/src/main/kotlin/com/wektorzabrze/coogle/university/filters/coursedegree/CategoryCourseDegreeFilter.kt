package com.wektorzabrze.coogle.university.filters.coursedegree

import com.fasterxml.jackson.databind.ObjectMapper
import com.wektorzabrze.coogle.CourseDegreeCategory
import com.wektorzabrze.coogle.infrastructure.asList
import com.wektorzabrze.coogle.university.CourseDegree
import org.springframework.stereotype.Component

@Component
class CategoryCourseDegreeFilter(val objectMapper: ObjectMapper) : CourseDegreeSearchFilter {
    override fun filter(courseDegrees: Collection<CourseDegree>, filterValue: String): Collection<CourseDegree> {
        val categories = objectMapper.asList(filterValue, CourseDegreeCategory::class.java)
        return courseDegrees.filter { courseDegree -> if (categories.isEmpty()) true else categories.any { courseDegree.category == it } }
    }

    override val discriminator: String
        get() = "categories"
}