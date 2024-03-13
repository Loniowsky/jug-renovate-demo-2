package com.wektorzabrze.coogle.university.filters.university

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.wektorzabrze.coogle.university.Coordinates
import com.wektorzabrze.coogle.university.University
import com.wektorzabrze.coogle.university.UniversityType
import org.springframework.stereotype.Component
import kotlin.math.*

@Component
class UniversityDistanceFilter(val mapper: ObjectMapper): UniversitySearchFilter {
    override fun filter(universities: Collection<University>, value: String): Collection<University> {
        val universityDistance = mapper.readValue(value, object : TypeReference<UniversityDistance>() {})
        return universities.filter { uni -> universityDistance.distance >= distanceBetweenLocations(universityDistance.userCoordinates, uni.coordinates) }
    }

    override val discriminator: String
        get() = "distance"


    fun distanceBetweenLocations(location1: Coordinates, location2: Coordinates): Double {
        val R = 6371 // Earth's radius in kilometers
        val lat1 = location1.latitude.toRadians()
        val lat2 = location2.latitude.toRadians()
        val deltaLat = (location2.latitude - location1.latitude).toRadians()
        val deltaLon = (location2.longitude - location1.longitude).toRadians()

        val a = sin(deltaLat / 2) * sin(deltaLat / 2) +
                cos(lat1) * cos(lat2) *
                sin(deltaLon / 2) * sin(deltaLon / 2)
        val c = 2 * atan2(sqrt(a), sqrt(1 - a))

        return R * c
    }

    fun Double.toRadians(): Double {
        return this * PI / 180
    }
}

