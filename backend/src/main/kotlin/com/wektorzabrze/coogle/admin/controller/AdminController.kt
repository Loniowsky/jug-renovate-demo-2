package com.wektorzabrze.coogle.admin.controller

import com.wektorzabrze.coogle.university.services.UniversityService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/admin")
class AdminController(val universityService: UniversityService) {

    @GetMapping("/interests")
    fun getInterests(): List<String> =
        universityService.getUniversities().flatMap {
            it.courseDegrees
        }.flatMap {
            it.interests
        }.distinct()

    @GetMapping("/final-subjects")
    fun getFinalSubjects(): List<String> =
        universityService.getUniversities().flatMap {
            it.courseDegrees
        }.flatMap {
            it.finalsSubjects
        }.distinct()

    @GetMapping("/occupations")
    fun getOccupations(): List<String> =
        universityService.getUniversities().flatMap {
            it.courseDegrees
        }.flatMap {
            it.occupations
        }.distinct()

    @GetMapping("/categories")
    fun getCategories(): List<String> =
        universityService.getUniversities().flatMap {
            it.courseDegrees
        }.map {
            it.category.toString()
        }.distinct()

    @GetMapping("/cities")
    fun getCities(): List<String> =
        universityService.getUniversities().map {
            it.address.city
        }

}