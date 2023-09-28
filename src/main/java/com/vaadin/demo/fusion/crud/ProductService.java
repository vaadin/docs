package com.vaadin.demo.fusion.crud;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.crud.CrudRepositoryService;

//tag::snippet[]
@BrowserCallable
@AnonymousAllowed
public class ProductService extends CrudRepositoryService<Product, Long> {
    public ProductService(ProductRepository productRepository) {
        super(Product.class, productRepository);
    }
}
//end::snippet[]
