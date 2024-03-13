package pl.oczadly.ebs.demo.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*

@Entity
data class Product(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long?,
        val name: String,
        val price: Double,
        @ManyToMany(mappedBy = "products", fetch = FetchType.LAZY)
        @JsonIgnore
        val shops: MutableSet<Shop> = HashSet()


) {
    override fun hashCode(): Int {
        return id.hashCode() + name.hashCode() + price.hashCode()
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Product

        if (id != other.id) return false
        if (name != other.name) return false
        if (price != other.price) return false

        return true
    }
}
