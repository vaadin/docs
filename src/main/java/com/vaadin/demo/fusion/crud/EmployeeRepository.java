package com.vaadin.demo.fusion.crud;

import org.springframework.data.jpa.repository.JpaRepository;

//tag::snippet[]
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
//end::snippet[]
