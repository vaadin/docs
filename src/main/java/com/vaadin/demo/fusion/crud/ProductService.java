package com.vaadin.demo.fusion.crud;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.ListRepositoryService;
//tag::snippet[]
@BrowserCallable
@AnonymousAllowed
public class ProductService
        extends ListRepositoryService<Product, Long, ProductRepository> {
}
//end::snippet[]
