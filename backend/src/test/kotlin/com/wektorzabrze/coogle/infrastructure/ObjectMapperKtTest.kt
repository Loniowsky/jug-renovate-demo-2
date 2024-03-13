package com.wektorzabrze.coogle.infrastructure

import com.fasterxml.jackson.databind.ObjectMapper
import com.wektorzabrze.coogle.university.UniversityType
import org.junit.jupiter.api.Test

class ObjectMapperKtTest {

    @Test
    fun `should properly map empty list`() {
        ObjectMapper().asList("[]", UniversityType::class.java)
    }
}