package com.wektorzabrze.coogle.search.controller

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import com.wektorzabrze.coogle.search.service.SearchService
import com.wektorzabrze.coogle.university.University
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/search")
class SearchController(private val service: SearchService, private val objectMapper: ObjectMapper) {

    @PostMapping("/universities")
    fun searchUniversities(@RequestBody searchParameters: JsonNode): Collection<University> {
        val processedSearchParameters =
            searchParameters.fields().asSequence().map { it.key to objectMapper.writeValueAsString(it.value) }.toMap()
        return service.search(processedSearchParameters).sortedByDescending { it.rating }
    }
}