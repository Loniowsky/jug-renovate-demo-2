package com.wektorzabrze.coogle.search.service

import com.wektorzabrze.coogle.university.University
import com.wektorzabrze.coogle.university.filters.coursedegree.CourseDegreeSearchFilter
import com.wektorzabrze.coogle.university.filters.university.UniversitySearchFilter
import com.wektorzabrze.coogle.university.services.UniversityService
import org.springframework.stereotype.Service

@Service
class SearchService(
    universitySearchFilters: List<UniversitySearchFilter>,
    courseDegreeSearchFilters: List<CourseDegreeSearchFilter>,
    private val universityService: UniversityService
) {
    private val universitySearchFilterByDiscriminator: Map<String, UniversitySearchFilter> =
        universitySearchFilters.associateBy { it.discriminator }
    private val courseDegreeSearchFilterByDiscriminator = courseDegreeSearchFilters.associateBy { it.discriminator }

    fun search(searchParameters: Map<String, String>): Collection<University> {
        val universityFilterByFilterValue = getUniversityFiltersToApply(searchParameters)
        val courseDegreeFilterByFilterValue = getCourseDegreesFiltersToApply(searchParameters)

        val universities = universityService.getUniversities()

        val filteredUniversities =
            universityFilterByFilterValue.entries.fold(universities) { filteredUniversities, searchFilterByValue ->
                searchFilterByValue.key.filter(filteredUniversities, searchFilterByValue.value)
            }

        return filteredUniversities.map {
            val filteredCourseDegrees =
                courseDegreeFilterByFilterValue.entries.fold(it.courseDegrees) { filteredCourseDegrees, searchFilterByValue ->
                    searchFilterByValue.key.filter(filteredCourseDegrees, searchFilterByValue.value)
                }
            it.copy(courseDegrees = filteredCourseDegrees)
        }. filter { it.courseDegrees.isNotEmpty() }
    }

    private fun getUniversityFiltersToApply(searchParameters: Map<String, String>): Map<UniversitySearchFilter, String> =
        searchParameters
            .filter { universitySearchFilterByDiscriminator.containsKey(it.key) }
            .map { universitySearchFilterByDiscriminator[it.key]!! to it.value }
            .toMap()

    private fun getCourseDegreesFiltersToApply(searchParameters: Map<String, String>): Map<CourseDegreeSearchFilter, String> =
        searchParameters
            .filter { courseDegreeSearchFilterByDiscriminator.containsKey(it.key) }
            .map { courseDegreeSearchFilterByDiscriminator[it.key]!! to it.value }
            .toMap()
}