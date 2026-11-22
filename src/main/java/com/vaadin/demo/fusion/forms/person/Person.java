package com.vaadin.demo.fusion.forms.person;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import org.jspecify.annotations.Nullable;

// tag::snippet[]
public record Person(@NotBlank String firstName, @NotBlank String lastName,
        @NotBlank @Email String email, @Past @Nullable LocalDate birthDate,
        @Valid Address address, @Valid List<PhoneNumber> phoneNumbers) {
}
// end::snippet[]
