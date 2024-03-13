package com.wektorzabrze.coogle.user.controller

import com.wektorzabrze.coogle.user.entity.FinalsScore
import com.wektorzabrze.coogle.user.service.UserService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/users")
class UserController(private val service: UserService) {

    @PutMapping("/finals")
    fun updateFinals(@RequestBody finalsScores: List<FinalsScore>): List<FinalsScore> {
        return service.updateFinals(finalsScores)
    }

    @GetMapping("/finals")
    fun getFinals(): Collection<FinalsScore> = service.getUserFinals()
}