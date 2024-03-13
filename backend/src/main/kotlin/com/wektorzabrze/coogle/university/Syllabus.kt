package com.wektorzabrze.coogle.university

data class Syllabus(
    val semesters: Collection<Semester>
)

data class Semester(
    val ordinal: Int = 0,
    val subjects: Collection<String> = emptyList()
)