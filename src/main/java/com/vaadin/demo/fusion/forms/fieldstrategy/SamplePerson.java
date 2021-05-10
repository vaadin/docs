package com.vaadin.demo.fusion.forms.fieldstrategy;

import javax.validation.constraints.NotBlank;

public class SamplePerson {

    @NotBlank
    private String firstName;
    
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
}
