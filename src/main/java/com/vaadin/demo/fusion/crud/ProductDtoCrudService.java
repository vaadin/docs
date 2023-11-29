package com.vaadin.demo.fusion.crud;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudService;
import dev.hilla.crud.JpaFilterConverter;
import dev.hilla.crud.filter.Filter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

//tag::snippet[]
@BrowserCallable
@AnonymousAllowed
public class ProductDtoCrudService implements CrudService<ProductDto, Long> {
    private final ProductRepository productRepository;
    private final JpaFilterConverter jpaFilterConverter;

    public ProductDtoCrudService(ProductRepository productRepository, JpaFilterConverter jpaFilterConverter) {
        this.productRepository = productRepository;
        this.jpaFilterConverter = jpaFilterConverter;
    }

    @Override
    public List<ProductDto> list(Pageable pageable, Filter filter) {
        Specification<Product> spec = jpaFilterConverter.toSpec(filter, Product.class);
        Page<Product> products = productRepository.findAll(spec, pageable);
        return products.stream().map(ProductDto::fromEntity).toList();
    }

    @Override
    public ProductDto get(Long id) {
        return productRepository.findById(id).map(ProductDto::fromEntity).orElse(null);
    }

    @Override
    public @Nullable ProductDto save(ProductDto value) {
        Product product = value.id() != null && value.id() > 0
                ? productRepository.getReferenceById(value.id())
                : new Product();
        product.setName(value.name());
        product.setCategory(value.category());
        product.setPrice(value.price());
        productRepository.save(product);

        return ProductDto.fromEntity(product);
    }

    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }
}
//end::snippet[]
