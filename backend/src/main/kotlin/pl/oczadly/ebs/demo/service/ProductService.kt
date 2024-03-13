package pl.oczadly.ebs.demo.service

import org.springframework.stereotype.Service
import pl.oczadly.ebs.demo.entity.Product
import pl.oczadly.ebs.demo.repository.ProductRepository
import kotlin.jvm.optionals.getOrNull

@Service
class ProductService(private val repository: ProductRepository) {

    fun getProductById(productId: Long): Product? = repository.findById(productId).getOrNull()
    fun getProducts(): List<Product> = repository.findAll()

    fun createProduct(name: String, price: Double): Product {
        val product = Product(name = name, price = price, id = null)

        return repository.save(product)
    }

}
