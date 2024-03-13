package pl.oczadly.ebs.demo.repository

import org.springframework.data.jpa.repository.JpaRepository
import pl.oczadly.ebs.demo.entity.Shop

interface ShopRepository : JpaRepository<Shop, Long> {
}