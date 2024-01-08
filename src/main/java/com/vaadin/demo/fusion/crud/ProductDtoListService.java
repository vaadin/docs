package com.vaadin.demo.fusion.crud;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
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
