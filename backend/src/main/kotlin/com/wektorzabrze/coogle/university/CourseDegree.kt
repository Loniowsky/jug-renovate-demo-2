package com.wektorzabrze.coogle.university

import com.wektorzabrze.coogle.CourseDegreeCategory
import java.math.BigDecimal

data class CourseDegree(
    val name: String,
    val description: String = "",
    val level: String = "",
    val stationary: Boolean = true,
    val finalsSubjects: List<String> = emptyList(),
    val interests: Collection<String> = emptyList(),
    val occupations: Collection<String> = emptyList(),
    val language: String = "",
    val occupancy: Occupancy = Occupancy(1,0),
    val examThreshold: ExamThreshold = ExamThreshold(
        subjectToWeightMap = mapOf(
            "mat" to BigDecimal.valueOf(0.8),
            "ang" to BigDecimal.valueOf(0.2)
        ),
        minThreshold = BigDecimal.valueOf(90)
    ),
    val category: CourseDegreeCategory = CourseDegreeCategory.INFORMATION,
    val tuition: Long = 0,
    val earningsMedian: Long = 0,
    val syllabus: Syllabus = Syllabus(emptyList())
)
