package com.vaadin.demo.fusion.crud;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.Nullable;
import com.vaadin.hilla.crud.JpaFilterConverter;
import com.vaadin.hilla.crud.ListService;
import com.vaadin.hilla.crud.filter.Filter;
import com.vaadin.hilla.crud.filter.FilterTransformer;
import org.springframework.data.domain.Pageable;

import java.util.List;

//tag::snippet[]
@BrowserCallable
@AnonymousAllowed
public class ProductAdvancedDtoListService
        implements ListService<ProductAdvancedDto> {
    private final ProductRepository productRepository;

    public ProductAdvancedDtoListService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<ProductAdvancedDto> list(Pageable pageable,
            @Nullable Filter filter) {
        // Create filter transformer to map DTO fields to JPA fields
        var transformer = new FilterTransformer().withMapping("productId", "id")
                .withMapping("productName", "name")
                .withMapping("productCategory", "category")
                .withMapping("productPrice", "price")
                .withMapping("supplierId", "supplier.id")
                .withMapping("supplierInfo", "supplier.supplierName");
        // Create JPA specification from Hilla filter
        var specification = JpaFilterConverter.toSpec(transformer.apply(filter),
                Product.class);
        // Fetch data from JPA repository
        return productRepository
                .findAll(specification, transformer.apply(pageable))
                .map(ProductAdvancedDto::fromEntity).toList();
    }
}
// end::snippet[]
