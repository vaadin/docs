package com.vaadin.demo.component.grid;

import com.vaadin.demo.domain.Person;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// tag::snippet[]
public interface GridPersonRepository extends JpaRepository<Person, Long> {
    List<Person> findByFullNameContainingIgnoreCaseOrProfessionContainingIgnoreCase(
            String fullName, String profession, Pageable pageable);
}
// end::snippet[]
