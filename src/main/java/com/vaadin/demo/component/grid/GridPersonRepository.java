package com.vaadin.demo.component.grid;

import com.vaadin.demo.domain.Person;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;

// hidden-source-line - We don't want to register an actual JPA repository here
// hidden-source-line - So we put the source code to show in a comment and declare a dummy interface that is hidden in the docs
// tag::snippet[]
/* // hidden-source-line
public interface GridPersonRepository extends JpaRepository<Person, Long> {
    List<Person> findByFullNameContainingIgnoreCaseOrProfessionContainingIgnoreCase(
            String fullName, String profession, Pageable pageable);
}
*/ // hidden-source-line
    // end::snippet[]

@Component // hidden-source-line
public class GridPersonRepository { // hidden-source-line
    List<Person> findByFullNameContainingIgnoreCaseOrProfessionContainingIgnoreCase( // hidden-source-line
            String fullName, String profession, Pageable pageable) { // hidden-source-line
        return List.of(); // hidden-source-line
    } // hidden-source-line
}// hidden-source-line
