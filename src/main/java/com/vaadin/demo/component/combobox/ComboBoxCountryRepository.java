package com.vaadin.demo.component.combobox;

import com.vaadin.demo.domain.Country;
import com.vaadin.demo.domain.DataService;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;

// hidden-source-line - We don't want to register an actual JPA repository here
// hidden-source-line - So we put the source code to show in a comment and provide
// hidden-source-line - a mock implementation that is hidden in the docs
// tag::snippet[]
/* // hidden-source-line
public interface ComboBoxCountryRepository extends JpaRepository<Country, Long> {
    List<Country> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
*/ // hidden-source-line
// end::snippet[]

@Component // hidden-source-line
public class ComboBoxCountryRepository { // hidden-source-line
    List<Country> findByNameContainingIgnoreCase(String name, Pageable pageable) { // hidden-source-line
        return DataService.getCountries().stream() // hidden-source-line
                .filter(country -> country.getName().toLowerCase().contains(name.toLowerCase())) // hidden-source-line
                .skip((long) pageable.getPageNumber() * pageable.getPageSize()) // hidden-source-line
                .limit(pageable.getPageSize()) // hidden-source-line
                .toList(); // hidden-source-line
    } // hidden-source-line
}// hidden-source-line
