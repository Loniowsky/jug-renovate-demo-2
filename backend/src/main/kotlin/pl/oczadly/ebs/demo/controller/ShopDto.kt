package pl.oczadly.ebs.demo.controller

data class ShopDto(val id: Long? = null,
                   val name: String,
                   val productNames: List<String>)
