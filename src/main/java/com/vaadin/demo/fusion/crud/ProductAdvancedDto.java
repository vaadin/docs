package com.vaadin.demo.fusion.crud;

// @formatter:off hidden-source-line
// tag::snippet[]
public record ProductAdvancedDto(Long productId,
                                 String productName,
                                 String productCategory,
                                 double productPrice,
                                 Long supplierId,
                                 String supplierInfo) {
    public static ProductAdvancedDto fromEntity(Product product) {
        // Compute a custom property that includes the supplier name and city
        String supplierInfo = product.getSupplier() != null
                ? String.format("%s (%s)",
                        product.getSupplier().getSupplierName(),
                        product.getSupplier().getHeadquarterCity())
                : "";

        return new ProductAdvancedDto(
                product.getId(),
                product.getName(),
                product.getCategory(),
                product.getPrice(),
                product.getSupplier().getId(),
                supplierInfo
        );
    }
}
// end::snippet[]
// @formatter:on hidden-source-line
