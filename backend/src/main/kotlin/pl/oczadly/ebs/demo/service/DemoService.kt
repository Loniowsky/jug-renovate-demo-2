package pl.oczadly.ebs.demo.service

import org.springframework.stereotype.Service
import pl.oczadly.ebs.demo.entity.DemoEntity
import pl.oczadly.ebs.demo.entity.TestDynamoDb
import pl.oczadly.ebs.demo.repository.TestRepository

@Service
class DemoService(private val repository: TestRepository) {
    fun getDemoValue(): DemoEntity = DemoEntity("test")
    fun addEmail(email: String) = repository.save(TestDynamoDb(email))
}