/*
 * Copyright 2000-2018 Vaadin Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.vaadin.flow.tutorial.databinding;

import java.util.Collection;

import com.vaadin.flow.component.AbstractCompositeField;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.tutorial.annotations.CodeFor;
import com.vaadin.flow.tutorial.databinding.EmployeeField.Employee;

@CodeFor("binding-data/tutorial-flow-field.asciidoc")
public class EmployeeField extends
        AbstractCompositeField<HorizontalLayout,
                EmployeeField, Employee> {
    static class Employee {
        public Department getDepartment() {
            return null;
        }
    }

    static class Department {
    }

    static class EmployeeService {
        static Collection<Department> getDepartments() {
            return null;
        }

        public static Collection<Employee> getEmployees(Department department) {
            return null;
        }
    }

    //@formatter:off
    private ComboBox<Department> departmentSelect =
            new ComboBox<>("Department");
    private ComboBox<Employee> employeeSelect =
            new ComboBox<>("Employee");
    //@formatter:on

    public EmployeeField() {
        super(null);

        departmentSelect.setItems(
                EmployeeService.getDepartments());

        departmentSelect.addValueChangeListener(event -> {
            Department department = event.getValue();

            employeeSelect.setItems(EmployeeService
                    .getEmployees(department));
            employeeSelect.setEnabled(department != null);
        });

        employeeSelect.addValueChangeListener(event ->
                setModelValue(event.getValue(), true));

        getContent().add(departmentSelect, employeeSelect);
    }

    @Override
    protected void setPresentationValue(Employee employee) {
        if (employee == null) {
            departmentSelect.clear();
        } else {
            departmentSelect.setValue(
                    employee.getDepartment());
            employeeSelect.setValue(employee);
        }
    }

    @Override
    public void setRequiredIndicatorVisible(
            boolean required) {
        employeeSelect.setRequiredIndicatorVisible(required);
    }

    @Override
    public boolean isRequiredIndicatorVisible() {
        return employeeSelect.isRequiredIndicatorVisible();
    }

    @Override
    public void setReadOnly(boolean readOnly) {
        departmentSelect.setReadOnly(readOnly);
        employeeSelect.setReadOnly(readOnly);
    }

    @Override
    public boolean isReadOnly() {
        return employeeSelect.isReadOnly();
    }
}
