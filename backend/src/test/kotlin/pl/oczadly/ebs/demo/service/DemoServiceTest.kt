package pl.oczadly.ebs.demo.service

import io.mockk.impl.annotations.MockK
import io.mockk.impl.annotations.RelaxedMockK
import io.mockk.junit5.MockKExtension
import io.mockk.verify
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import pl.oczadly.ebs.demo.entity.DemoEntity
import pl.oczadly.ebs.demo.repository.TestRepository

@ExtendWith(MockKExtension::class)
class DemoServiceTest {

    @Test
    fun getDemoValueShouldReturnExpectedValue(@MockK testRepository: TestRepository) {
        assertEquals(DemoEntity("test"), DemoService(testRepository).getDemoValue())
    }

    @Test
    fun addEmailCallsRepostiory(@RelaxedMockK testRepository: TestRepository) {
        DemoService(testRepository).addEmail("test value")

        verify(exactly = 1) { testRepository.save(any()) }
    }
}