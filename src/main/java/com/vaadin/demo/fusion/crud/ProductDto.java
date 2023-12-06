package com.vaadin.demo.fusion.crud;

//tag::snippet[]
public record ProductDto(Long id, String name, String category, double price) {
    public static ProductDto fromEntity(Product product) {
        return new ProductDto(product.getId(), product.getName(), product.getCategory(), product.getPrice());
    }
}
//end::snippet[]
