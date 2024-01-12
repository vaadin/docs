package com.vaadin.demo.fusion.crud;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudService;
import dev.hilla.crud.filter.Filter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

//tag::snippet[]
@BrowserCallable
@AnonymousAllowed
public class ProductDtoCrudService implements CrudService<ProductDto, Long> {
    private final ProductRepository productRepository;

    public ProductDtoCrudService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    @Nonnull
    public List<@Nonnull ProductDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Page<Product> products = productRepository.findAll(pageable);
        return products.stream().map(ProductDto::fromEntity).toList();
    }

    @Override
    public @Nullable ProductDto save(ProductDto value) {
        Product product = value.id() != null && value.id() > 0
                ? productRepository.getReferenceById(value.id())
                : new Product();
        product.setName(value.name());
        product.setCategory(value.category());
        product.setPrice(value.price());

        return ProductDto.fromEntity(productRepository.save(product));
    }

    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }
}
//end::snippet[]
