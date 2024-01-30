package com.vaadin.demo.fusion.crud;

//tag::snippet[]
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.CrudRepositoryService;

@BrowserCallable
@AnonymousAllowed
public class EmployeeService
       extends CrudRepositoryService<Employee, Long, EmployeeRepository> {
}
//end::snippet[]
