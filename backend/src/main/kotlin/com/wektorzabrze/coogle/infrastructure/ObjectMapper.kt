package com.wektorzabrze.coogle.infrastructure

import com.fasterxml.jackson.databind.ObjectMapper
import java.io.File

fun <T> ObjectMapper.asList(value: String, clazz: Class<T>): List<T> =
    this.readValue<T>(value, this.typeFactory.constructCollectionType(List::class.java, clazz)) as List<T>

fun <T> ObjectMapper.asList(value: File, clazz: Class<T>): List<T> =
    this.readValue<T>(value, this.typeFactory.constructCollectionType(List::class.java, clazz)) as List<T>
