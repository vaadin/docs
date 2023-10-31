package com.vaadin.demo.fusion.crud.form;

//tag::snippet[]
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.crud.CrudRepositoryService;

@BrowserCallable
@AnonymousAllowed
public class EmployeeService
        extends CrudRepositoryService<Employee, Long, EmployeeRepository> {
}
//end::snippet[]
