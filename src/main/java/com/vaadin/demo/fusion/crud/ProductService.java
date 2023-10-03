package com.vaadin.demo.fusion.crud;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.crud.ListRepositoryService;
//tag::snippet[]
@BrowserCallable
@AnonymousAllowed
public class ProductService extends ListRepositoryService<Product, Long, ProductRepository> {
}
//end::snippet[]
