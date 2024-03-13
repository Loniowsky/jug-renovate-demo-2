package pl.oczadly.ebs.demo.repository

import org.springframework.data.jpa.repository.JpaRepository
import pl.oczadly.ebs.demo.entity.Product

interface ProductRepository: JpaRepository<Product, Long> {
}