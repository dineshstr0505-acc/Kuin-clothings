package com.kuin.kuin_backend.Controller;

import com.kuin.kuin_backend.model.Product;
import com.kuin.kuin_backend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }


    // =========================
    // GET ALL PRODUCTS
    // =========================

    @GetMapping
    public List<Product> getAllProducts() {

        return productService.getAllProducts();
    }


    // =========================
    // GET PRODUCT BY ID
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(
            @PathVariable Long id) {

        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }


    // =========================
    // ADD PRODUCT - OLD JSON
    // =========================

    @PostMapping
    public Product addProduct(
            @RequestBody Product product) {

        return productService.addProduct(product);
    }


    // =========================
    // ADD PRODUCT + IMAGES
    // =========================

    @PostMapping(
            value = "/with-images",
            consumes = "multipart/form-data"
    )
    public Product addProductWithImages(

            @RequestPart("product")
            Product product,

            @RequestPart("images")
            MultipartFile[] images) {

        return productService.addProductWithImages(
                product,
                images
        );
    }


    // =========================
    // UPDATE PRODUCT
    // =========================

    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {

        return productService.updateProduct(
                id,
                product
        );
    }


    // =========================
    // DELETE PRODUCT
    // =========================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long id) {

        productService.deleteProduct(id);

        return ResponseEntity.noContent().build();
    }
}