package com.vaadin.demo.component.combobox;

import com.vaadin.demo.domain.Country;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;

// hidden-source-line - We don't want to register an actual JPA repository here
// hidden-source-line - So we put the source code to show in a comment and declare a dummy interface that is hidden in the docs
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
        return List.of(); // hidden-source-line
    } // hidden-source-line
}// hidden-source-line
