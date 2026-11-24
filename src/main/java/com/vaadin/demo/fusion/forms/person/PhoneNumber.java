package com.vaadin.demo.fusion.forms.person;

import jakarta.validation.constraints.NotBlank;

// tag::snippet[]
public record PhoneNumber(@NotBlank String number, String label) {
}
// end::snippet[]
