package com.vaadin.demo.fusion.crud;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.CountService;
import com.vaadin.hilla.crud.JpaFilterConverter;
import com.vaadin.hilla.crud.ListService;
import com.vaadin.hilla.crud.filter.Filter;
import org.jspecify.annotations.NonNull;
import org.jspecify.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

// tag::snippet[]
@BrowserCallable
@AnonymousAllowed
public class ProductDtoListService
        implements ListService<ProductDto>, CountService {
    private final ProductRepository productRepository;

    public ProductDtoListService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    @NonNull
    public List<@NonNull ProductDto> list(Pageable pageable,
            @Nullable Filter filter) {
        Specification<Product> spec = toSpec(filter);
        // Query the JPA repository
        Page<Product> products = productRepository.findAll(spec, pageable);
        // Map entities to DTOs and return result
        return products.stream().map(ProductDto::fromEntity).toList();
    }

    @Override
    public long count(@Nullable Filter filter) {
        // Count with the same specification that the list method uses
        return productRepository.count(toSpec(filter));
    }

    private Specification<Product> toSpec(@Nullable Filter filter) {
        // Use the Hilla JpaFilterConverter to create a JPA specification from
        // the filter
        return filter != null ? JpaFilterConverter.toSpec(filter, Product.class)
                : Specification.anyOf();
    }
}
// end::snippet[]
