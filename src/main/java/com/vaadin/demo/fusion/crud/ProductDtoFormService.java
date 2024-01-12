package com.vaadin.demo.fusion.crud;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Nullable;
import dev.hilla.crud.FormService;

//tag::snippet[]
@BrowserCallable
@AnonymousAllowed
public class ProductDtoFormService implements FormService<ProductDto, Long> {
    private final ProductRepository productRepository;

    public ProductDtoFormService(ProductRepository productRepository) {
        this.productRepository = productRepository;
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
