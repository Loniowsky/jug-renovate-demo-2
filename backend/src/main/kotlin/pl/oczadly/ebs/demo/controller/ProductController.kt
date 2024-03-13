package pl.oczadly.ebs.demo.controller

import org.springframework.web.bind.annotation.*
import pl.oczadly.ebs.demo.entity.Product
import pl.oczadly.ebs.demo.service.ProductService

@RestController
@RequestMapping("/products")
class ProductController(private val service: ProductService) {

    @GetMapping
    fun getProducts(): List<Product> = service.getProducts()

    @PostMapping
    fun createProduct(@RequestParam name: String, @RequestParam price: Double): Product = service.createProduct(name, price)
}