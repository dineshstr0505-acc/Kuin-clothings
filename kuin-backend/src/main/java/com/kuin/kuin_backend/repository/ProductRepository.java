package com.kuin.kuin_backend.repository;

import com.kuin.kuin_backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

}