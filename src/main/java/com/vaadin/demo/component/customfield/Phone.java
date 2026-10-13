package com.vaadin.demo.component.customfield;

// tag::snippet[]
public class Phone {
    private final String code;
    private final String number;

    public Phone(String code, String number) {
        this.code = code;
        this.number = number;
    }

    public String getCode() {
        return code;
    }

    public String getNumber() {
        return number;
    }
}
// end::snippet[]
