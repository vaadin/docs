package com.vaadin.demo.fusion.crud;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

//tag::snippet[]
@Entity
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String supplierName;
    private String headquarterCity;

    // getters and setters omitted for brevity
    //end::snippet[]

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String name) {
        this.supplierName = name;
    }

    public String getHeadquarterCity() {
        return headquarterCity;
    }

    public void setHeadquarterCity(String headquarterCity) {
        this.headquarterCity = headquarterCity;
    }

    //tag::snippet[]
}
//end::snippet[]
