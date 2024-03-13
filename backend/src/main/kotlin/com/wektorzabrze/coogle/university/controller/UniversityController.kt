package com.wektorzabrze.coogle.university.controller

import com.wektorzabrze.coogle.university.services.UniversityService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/university")
class UniversityController(private val service: UniversityService) {

    @PostMapping("/{id}/favourite")
    fun addFavUniversity(@PathVariable id: String){
        service.addFavouriteUniversity(id)
    }
    @DeleteMapping("/{id}/favourite")
    fun removeFavUniversity(@PathVariable id: String){
        service.removeFavouriteUniversity(id)
    }
}