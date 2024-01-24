package com.vaadin.demo.fusion.crud;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.Nonnull;
import com.vaadin.hilla.Nullable;
import com.vaadin.hilla.crud.JpaFilterConverter;
import com.vaadin.hilla.crud.ListService;
import com.vaadin.hilla.crud.filter.Filter;
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
    @Nonnull
    public List<@Nonnull ProductDto> list(Pageable pageable, @Nullable Filter filter) {
        // Use the Hilla JpaFilterConverter to create a JPA specification from the filter
        Specification<Product> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, Product.class)
                : Specification.anyOf();
        // Query the JPA repository
        Page<Product> products = productRepository.findAll(spec, pageable);
        // Map entities to DTOs and return result
        return products.stream().map(ProductDto::fromEntity).toList();
    }
}
//end::snippet[]
