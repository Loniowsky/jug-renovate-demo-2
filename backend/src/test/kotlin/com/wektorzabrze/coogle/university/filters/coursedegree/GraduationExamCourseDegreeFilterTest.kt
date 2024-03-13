package com.wektorzabrze.coogle.university.filters.coursedegree

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.wektorzabrze.coogle.university.CourseDegree
import com.wektorzabrze.coogle.university.ExamThreshold
import com.wektorzabrze.coogle.user.entity.FinalsScore
import com.wektorzabrze.coogle.user.service.UserService
import io.kotest.matchers.collections.shouldContainAll
import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.junit5.MockKExtension
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import java.math.BigDecimal

@ExtendWith(MockKExtension::class)
class GraduationExamCourseDegreeFilterTest {
    @Test
    fun `should filter in based on exam results`(@MockK userService: UserService) {
        every { userService.getUserFinalsBySubject() } returns mapOf(
            "mat" to FinalsScore(1L, "mat", 100),
            "ang" to FinalsScore(2L, "ang", 90),
        )

        val courseDegrees = listOf(
            CourseDegree(
                name = "aaa", examThreshold = ExamThreshold(
                    subjectToWeightMap = mapOf(
                        "mat" to BigDecimal.valueOf(0.8),
                        "ang" to BigDecimal.valueOf(0.2)
                    ),
                    minThreshold = BigDecimal.valueOf(90)
                )
            )
        )
        val result = GraduationExamCourseDegreeFilter(jacksonObjectMapper(), userService).filter(
            courseDegrees, "true"
        )

        result shouldContainAll courseDegrees
    }
    @Test
    fun `should filter out based on exam results`(@MockK userService: UserService) {
        every { userService.getUserFinalsBySubject() } returns mapOf(
            "mat" to FinalsScore(1L, "mat", 100),
            "ang" to FinalsScore(2L, "ang", 40),
        )

        val courseDegrees = listOf(
            CourseDegree(
                name = "aaa", examThreshold = ExamThreshold(
                    subjectToWeightMap = mapOf(
                        "mat" to BigDecimal.valueOf(0.8),
                        "ang" to BigDecimal.valueOf(0.2)
                    ),
                    minThreshold = BigDecimal.valueOf(90)
                )
            )
        )
        val result = GraduationExamCourseDegreeFilter(jacksonObjectMapper(), userService).filter(
            courseDegrees, "true"
        )

        assertTrue(result.isEmpty())
    }
}


