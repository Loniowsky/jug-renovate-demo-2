package com.wektorzabrze.coogle.university.filters.coursedegree

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.wektorzabrze.coogle.university.CourseDegree
import com.wektorzabrze.coogle.user.service.UserService
import org.springframework.stereotype.Component
import java.math.BigDecimal

@Component
class GraduationExamCourseDegreeFilter(val objectMapper: ObjectMapper, private val userService: UserService) :
    CourseDegreeSearchFilter {

    override fun filter(courseDegrees: Collection<CourseDegree>, filterValue: String): Collection<CourseDegree> {
        val isSearchingByExamScores = objectMapper.readValue(filterValue, object : TypeReference<Boolean>() {})
        if (!isSearchingByExamScores) {
            return courseDegrees
        }

        val userScoreBySubject = userService.getUserFinalsBySubject()
        if (userScoreBySubject.isEmpty()) {
            return courseDegrees
        }
        return courseDegrees
            .filter { courseDegree ->

                val intResult = userScoreBySubject
                    .map { graduateExam ->
                        (courseDegree.examThreshold.subjectToWeightMap.getOrDefault(
                            graduateExam.key,
                            BigDecimal.ZERO
                        ).times(graduateExam.value.percentage.toBigDecimal()))
                    }
                    .reduce { acc, next -> acc + next }.toInt()
                intResult >= courseDegree.examThreshold.minThreshold.toInt()
            }
    }

    override val discriminator: String
        get() = "graduationExamResults"
}


