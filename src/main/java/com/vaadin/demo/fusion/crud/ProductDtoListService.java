package com.vaadin.demo.fusion.crud;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.crud.JpaFilterConverter;
import dev.hilla.crud.ListService;
import dev.hilla.crud.filter.Filter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

//tag::snippet[]
@BrowserCallable
@AnonymousAllowed
public class ProductDtoListService implements ListService<ProductDto> {
    private final ProductRepository productRepository;
    private final JpaFilterConverter jpaFilterConverter;

    public ProductDtoListService(ProductRepository productRepository, JpaFilterConverter jpaFilterConverter) {
        this.productRepository = productRepository;
        this.jpaFilterConverter = jpaFilterConverter;
    }

    @Override
    public List<ProductDto> list(Pageable pageable, Filter filter) {
        // Use the Hilla JpaFilterConverter to create a JPA specification from the filter
        Specification<Product> spec = jpaFilterConverter.toSpec(filter, Product.class);
        // Query the JPA repository
        Page<Product> products = productRepository.findAll(spec, pageable);
        // Map entities to DTOs and return result
        return products.stream().map(ProductDto::fromEntity).toList();
    }
}
//end::snippet[]
