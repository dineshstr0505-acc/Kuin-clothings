package com.kuin.kuin_backend.service;

import com.kuin.kuin_backend.model.Product;
import com.kuin.kuin_backend.model.ProductImage;
import com.kuin.kuin_backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    private final Path uploadDirectory =
            Paths.get("uploads/products");

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;

        try {
            Files.createDirectories(uploadDirectory);
        } catch (IOException e) {
            throw new RuntimeException(
                    "Could not create upload directory",
                    e
            );
        }
    }

    // =========================
    // GET ALL PRODUCTS
    // =========================

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }


    // =========================
    // GET PRODUCT BY ID
    // =========================

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }


    // =========================
    // ADD PRODUCT
    // =========================

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }


    // =========================
    // ADD PRODUCT WITH IMAGES
    // =========================

    public Product addProductWithImages(
            Product product,
            MultipartFile[] files) {

        Product savedProduct =
                productRepository.save(product);

        if (files != null) {

            for (MultipartFile file : files) {

                if (file == null || file.isEmpty()) {
                    continue;
                }

                String imagePath = saveImage(file);

                ProductImage productImage =
                        new ProductImage(
                                imagePath,
                                savedProduct
                        );

                savedProduct.getImages().add(productImage);
            }
        }

        return productRepository.save(savedProduct);
    }


    // =========================
    // UPDATE PRODUCT
    // =========================

    public Product updateProduct(
            Long id,
            Product productDetails) {

        Product product =
                productRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Product not found"
                                )
                        );

        product.setProductName(
                productDetails.getProductName()
        );

        product.setCategory(
                productDetails.getCategory()
        );

        product.setSubcategory(
                productDetails.getSubcategory()
        );

        product.setPrice(
                productDetails.getPrice()
        );

        product.setDescription(
                productDetails.getDescription()
        );

        product.setStockQuantity(
                productDetails.getStockQuantity()
        );

        return productRepository.save(product);
    }


    // =========================
    // DELETE PRODUCT
    // =========================

    public void deleteProduct(Long id) {

        productRepository.deleteById(id);
    }


    // =========================
    // SAVE IMAGE
    // =========================

    private String saveImage(MultipartFile file) {

        try {

            String originalName =
                    file.getOriginalFilename();

            String extension = "";

            if (originalName != null &&
                    originalName.contains(".")) {

                extension =
                        originalName.substring(
                                originalName.lastIndexOf(".")
                        );
            }

            String fileName =
                    UUID.randomUUID()
                            .toString()
                            + extension;

            Path filePath =
                    uploadDirectory.resolve(fileName);

            Files.copy(
                    file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            return "/uploads/products/" + fileName;

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to save image",
                    e
            );
        }
    }
}