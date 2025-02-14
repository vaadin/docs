package com.vaadin.demo.component.grid;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import jakarta.annotation.Nonnull;
import org.springframework.data.domain.Pageable;

import java.util.List;

// tag::snippet[]
@BrowserCallable
@AnonymousAllowed
public class GridPersonService {
    private final GridPersonRepository personRepository;

    public GridPersonService(GridPersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public @Nonnull List<Person> list(Pageable pageable, String filter) {
        // Implement your data fetching logic here
        // For this example, we're using a Spring Data repository
        return personRepository.findByFullNameContainingIgnoreCaseOrProfessionContainingIgnoreCase(filter, filter, pageable);
    }
}
// end::snippet[]
