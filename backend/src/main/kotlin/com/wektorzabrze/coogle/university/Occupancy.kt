package com.wektorzabrze.coogle.university

data class Occupancy(
    val noPlaces: Int,
    val noCandidates: Int
) {
    init {
        assert(noPlaces > 0) { "Number of places cannot be zero!" }
    }

    val ratio: Double get() = noCandidates.toDouble()/noPlaces.toDouble()

}
