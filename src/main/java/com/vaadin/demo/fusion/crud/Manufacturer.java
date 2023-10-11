package com.vaadin.demo.fusion.crud;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

//tag::snippet[]
@Entity
public class Manufacturer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String headquarterCity;

    // getters and setters omitted for brevity
    //end::snippet[]

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
