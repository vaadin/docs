package com.vaadin.demo.fusion.crud;

import org.springframework.data.jpa.repository.JpaRepository;

//tag::snippet[]
public interface ProductRepository extends JpaRepository<Product, Long>{
}
//end::snippet[]
