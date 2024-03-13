package pl.oczadly.ebs.demo.entity

import jakarta.persistence.*

@Entity
data class Shop(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long? = null,
        val name: String,
        @ManyToMany(
                cascade = [CascadeType.MERGE, CascadeType.PERSIST],
                fetch = FetchType.LAZY)
        @JoinTable(
                name = "product_shop",
                joinColumns = [JoinColumn(name = "student_id")],
                inverseJoinColumns = [JoinColumn(name = "course_id")]
        )
        val products: MutableSet<Product> = HashSet()

)

fun Shop.addProduct(product: Product) {
        this.products.add(product)
        product.shops.add(this)
}
