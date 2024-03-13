package pl.oczadly.ebs.demo.controller

import org.springframework.web.bind.annotation.*
import pl.oczadly.ebs.demo.entity.Shop
import pl.oczadly.ebs.demo.service.ShopService

@RestController
@RequestMapping("/shops")
class ShopController(private val service: ShopService) {

    @GetMapping
    fun getShops(): List<Shop> = service.getShops()

    @PostMapping
    fun createShop(@RequestParam name: String): Shop = service.createShop(name)

    @PutMapping("/{shopId}/products/{productId}")
    fun addProductToShop(@PathVariable(name = "shopId") shopId: Long, @PathVariable(name = "productId") productId: Long): Shop? = service.addProductToShop(shopId, productId)

//    val shop = service.addProductToShop(shopId, productId)
//
//    return shop?.let { ShopDto(it.id, it.name, it.products.map { product -> product.name }) }
}