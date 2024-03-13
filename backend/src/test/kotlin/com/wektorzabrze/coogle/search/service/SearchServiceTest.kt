package com.wektorzabrze.coogle.search.service

import com.wektorzabrze.coogle.university.CourseDegree
import com.wektorzabrze.coogle.university.University
import com.wektorzabrze.coogle.university.filters.coursedegree.CourseDegreeSearchFilter
import com.wektorzabrze.coogle.university.filters.university.UniversitySearchFilter
import com.wektorzabrze.coogle.university.services.UniversityService
import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.impl.annotations.RelaxedMockK
import io.mockk.junit5.MockKExtension
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith

private const val universitySearchDiscriminator = "universityName"
private const val universitySearchValue = "AGH"

private const val courseDegreeSearchDiscriminator = "courseName"
private const val courseDegreeSearchValue = "podstawy inżynierii sterowania"

@ExtendWith(MockKExtension::class)
class SearchServiceTest {

    @Test
    fun searchShouldUseUniversityAndCourseDegreeSearchFilters(
        @RelaxedMockK universityFilter: UniversitySearchFilter,
        @RelaxedMockK courseDegreeFilter: CourseDegreeSearchFilter,
        @MockK universityService: UniversityService
    ) {
        val courseDegrees = listOf(CourseDegree(name = courseDegreeSearchValue))
        val universities = listOf(University(courseDegrees = courseDegrees))
        every { universityFilter.discriminator } returns universitySearchDiscriminator
        every { universityFilter.filter(universities, any()) } returns universities
        every { courseDegreeFilter.discriminator } returns courseDegreeSearchDiscriminator
        every { universityService.getUniversities() } returns universities

        SearchService(listOf(universityFilter), listOf(courseDegreeFilter), universityService).search(
            mapOf(
                universitySearchDiscriminator to universitySearchValue,
                courseDegreeSearchDiscriminator to courseDegreeSearchValue,
                "not_existing_discriminator" to "1234"
            )
        )

        verify(exactly = 1) { universityService.getUniversities() }
        verify(exactly = 1) { universityFilter.filter(universities, universitySearchValue) }
        verify(exactly = 1) { courseDegreeFilter.filter(courseDegrees, courseDegreeSearchValue) }
    }
}