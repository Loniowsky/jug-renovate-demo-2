package pl.oczadly.ebs.demo.entity

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable

@DynamoDBTable(tableName = "my_test_table")
data class TestDynamoDb(
        @DynamoDBHashKey
        val email: String
)
