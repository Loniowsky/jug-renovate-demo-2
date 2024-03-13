package com.wektorzabrze.coogle.university.filters.university

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.wektorzabrze.coogle.university.University
import org.springframework.stereotype.Component

@Component
class UniversityFavouriteFilter(val mapper: ObjectMapper): UniversitySearchFilter {
    override fun filter(universities: Collection<University>, value: String): Collection<University> {
        val isFav = mapper.readValue(value, object : TypeReference<Boolean>() {})
        if (!isFav) {
            return universities
        }
        return universities.filter { uni -> uni.isFavourite ==  isFav}
    }

    override val discriminator: String
        get() = "favourite"

}