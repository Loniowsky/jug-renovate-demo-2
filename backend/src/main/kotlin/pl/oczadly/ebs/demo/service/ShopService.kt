package pl.oczadly.ebs.demo.service

import org.springframework.stereotype.Service
import pl.oczadly.ebs.demo.entity.Shop
import pl.oczadly.ebs.demo.entity.addProduct
import pl.oczadly.ebs.demo.repository.ShopRepository
import kotlin.jvm.optionals.getOrNull

@Service
class ShopService(private val productService: ProductService, private val repository: ShopRepository) {

    fun getShops(): List<Shop> = repository.findAll()

    fun createShop(name: String): Shop {
        val shop = Shop(name = name)

        return repository.save(shop)
    }

    fun addProductToShop(shopId: Long, productId: Long): Shop? {
        return productService.getProductById(productId)?.let { product ->
            repository.findById(shopId).getOrNull()?.let { shop ->
                shop.addProduct(product)
                repository.save(shop)
            }
        }
    }
}
