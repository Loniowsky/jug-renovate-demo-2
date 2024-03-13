package com.wektorzabrze.coogle.university.filters.coursedegree

import com.wektorzabrze.coogle.university.CourseDegree

interface CourseDegreeSearchFilter {
    fun filter(courseDegrees: Collection<CourseDegree>, filterValue: String): Collection<CourseDegree>
    val discriminator: String
}