package pl.oczadly.ebs.demo.repository

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB
import com.amazonaws.services.dynamodbv2.model.AttributeValue
import org.springframework.stereotype.Repository
import pl.oczadly.ebs.demo.entity.TestDynamoDb

@Repository
class TestRepository(private val dynamoDb: AmazonDynamoDB) {

    fun save(test: TestDynamoDb) {
        val itemValues = mutableMapOf("email" to AttributeValue(test.email))

        dynamoDb.putItem("my_test_table", itemValues)
    }
}