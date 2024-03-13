package com.wektorzabrze.coogle.university.filters.university

import com.wektorzabrze.coogle.university.University

interface UniversitySearchFilter {
    fun filter(universities: Collection<University>, value: String): Collection<University>
    val discriminator: String
}