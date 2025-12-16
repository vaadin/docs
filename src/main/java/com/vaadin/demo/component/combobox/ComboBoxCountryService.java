package com.vaadin.demo.component.combobox;

import com.vaadin.demo.domain.Country;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import org.jspecify.annotations.NonNull;
import org.springframework.data.domain.Pageable;

import java.util.List;

// tag::snippet[]
// @BrowserCallable and @AnonymousAllowed are only required if you want
// to use the service from a Hilla view
@BrowserCallable
@AnonymousAllowed
public class ComboBoxCountryService {
    private final ComboBoxCountryRepository repository;

    public ComboBoxCountryService(ComboBoxCountryRepository repository) {
        this.repository = repository;
    }

    public @NonNull List<@NonNull Country> list(Pageable pageable,
            String filter) {
        // Implement your data fetching and filtering logic here
        // For this example, we're using a Spring Data repository
        return repository.findByNameContainingIgnoreCase(filter, pageable);
    }
}
// end::snippet[]
