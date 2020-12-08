/*
 * Copyright 2000-2017 Vaadin Ltd.
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

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.provider.*;
import com.vaadin.flow.data.provider.CallbackDataProvider.CountCallback;
import com.vaadin.flow.data.provider.CallbackDataProvider.FetchCallback;
import com.vaadin.flow.tutorial.annotations.CodeFor;
import com.vaadin.flow.tutorial.databinding.Person.Department;

import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Stream;

@CodeFor("binding-data/tutorial-flow-data-provider.asciidoc")
public class DataProviders {

    public static class PersonSort {

    }

    public enum Status {
        OK, ERROR;

        public String getLabel() {
            return "";
        }
    }

    public interface PersonService {
        List<Person> fetch(int offset, int limit,
                           Optional<Predicate<Person>> predicate);

        int getCount(Optional<Predicate<Person>> predicate);

        List<Person> fetchPersons(int offset, int limit);

        List<Person> fetchPersons(int offset, int limit,
                                  List<PersonSort> sortOrders);

        int getPersonCount();

        // @formatter:off
        PersonSort createSort(
                String propertyName,
                boolean descending);

        List<Person> fetchPersons(
                int offset,
                int limit,
                String namePrefix);
        // @formatter:on

        List<Person> fetchPersons(int offset, int limit, String namePrefix,
                                  Department department);

        // @formatter:off
        int getPersonCount(
                String namePrefix,
                Department department);
        // @formatter:on

        Person save(Person person);

        Person fetchById(int i);
    }

    public interface DepartmentService {
        List<Department> fetch(int offset, int limit,
                               String filterText);

        int getCount(String filterText);
    }

    public void combobox() {
        ComboBox<Status> comboBox = new ComboBox<>();
        comboBox.setItemLabelGenerator(Status::getLabel);

        // Sets items as a collection
        comboBox.setItems(EnumSet.allOf(Status.class));

        List<Status> itemsToShow = null;

        // @formatter:off
        /*
        comboBox.setItems(
                (itemCaption, filterText) -> itemCaption.startsWith(filterText),
                itemsToShow);
        */
        // @formatter:on
    }

    public void grid() {
        Grid<Person> grid = new Grid<>();
        grid.addColumn(Person::getName).setHeader("Name");
        grid.addColumn(Person::getYearOfBirth)
                .setHeader("Year of birth");

        // Sets items using varargs
        // @formatter:off
        grid.setItems(
                new Person("George Washington", 1732),
                new Person("John Adams", 1735),
                new Person("Thomas Jefferson", 1743),
                new Person("James Madison", 1751)
        );
        // @formatter:on

        grid.addColumn(Person::getName)
                .setHeader("Name")
                // Override default natural sorting
                .setComparator(Comparator.comparing(person ->
                        person.getName().toLowerCase()));
    }

    public void listDataProvider() {
        List<Person> persons = Collections.emptyList();
        Button button = new Button();

        // @formatter:off
        ListDataProvider<Person> dataProvider =
                DataProvider.ofCollection(persons);

        dataProvider.setSortOrder(Person::getName,
                SortDirection.ASCENDING);

        Grid<Person> grid = new Grid<>();
        // The grid shows the persons sorted by name
        grid.setDataProvider(dataProvider);

        // Makes the combo box show persons in descending order
        button.addClickListener(event -> {
            dataProvider.setSortOrder(Person::getName,
                    SortDirection.DESCENDING);
        });
        // @formatter:on
    }

    public void captionFilter() {
        List<Person> persons = Collections.emptyList();
        ComboBox<Department> departmentSelect = new ComboBox<>();

        // @formatter:off
        ListDataProvider<Person> dataProvider = DataProvider
                .ofCollection(persons);

        ComboBox<Person> comboBox = new ComboBox<>();
        comboBox.setDataProvider(dataProvider);

        departmentSelect.addValueChangeListener(event -> {
            Department selectedDepartment = event.getValue();
            if (selectedDepartment != null) {
                dataProvider.setFilterByValue(
                        Person::getDepartment,
                        selectedDepartment);
            } else {
                dataProvider.clearFilters();
            }
        });
        //@formatter:on
    }

    public void providerForFilteringDepartment() {
        DepartmentServiceImpl service = new DepartmentServiceImpl();

        DataProvider<Department, String> dataProvider =
                createDepartmentDataProvider(service);
        ComboBox<Department> departmentComboBox =
                new ComboBox<>();
        departmentComboBox.setDataProvider(dataProvider);

    }

    public void providerForFilteringEmployee() {
        ComboBox<Department> departmentComboBox = new ComboBox<>();

        EmployeeServiceImpl service = new EmployeeServiceImpl();
        ConfigurableFilterDataProvider<Employee, String,
                Department> employeeDataProvider =
                getDataProvider(service);
        ComboBox<Employee> employeeComboBox = new ComboBox<>();
        employeeComboBox.setDataProvider(employeeDataProvider);
        departmentComboBox.addValueChangeListener(event -> {
            employeeDataProvider.setFilter(event.getValue());
            employeeDataProvider.refreshAll();
        });
    }

    public DataProvider<Employee, String> getEmployeeProvider() {
        return null;
    }

    public void filterPart() {
        DataProvider<Employee, String> employeeProvider =
                getEmployeeProvider();

        TextField searchField = new TextField();

        ConfigurableFilterDataProvider<Employee, Void, String>
                wrapper = employeeProvider.withConfigurableFilter();

        Grid<Employee> grid = new Grid<>();
        grid.setDataProvider(wrapper);
        grid.addColumn(Employee::getName).setHeader("Name");

        searchField.addValueChangeListener(event -> {
            String filter = event.getValue();
            if (filter.trim().isEmpty()) {
                // null disables filtering
                filter = null;
            }

            wrapper.setFilter(filter);
        });
    }


    ConfigurableFilterDataProvider<Employee, String,
            Department> getDataProvider(EmployeeService service) {
        DataProvider<Employee, EmployeeFilter> dataProvider =
                DataProvider.fromFilteringCallbacks(query -> {
                    // getFilter returns Optional<String>
                    EmployeeFilter filter = query.getFilter()
                            .orElse(null);
                    return service.fetch(query.getOffset(),
                            query.getLimit(), filter).stream();
                }, query -> {
                    EmployeeFilter filter = query.getFilter()
                            .orElse(null);
                    return service.getCount(filter);
                });

        ConfigurableFilterDataProvider<Employee, String,
                Department> configurableFilterDataProvider =
                dataProvider.withConfigurableFilter(
                        (String filterText, Department department) ->
                                new EmployeeFilter(filterText, department));

        return configurableFilterDataProvider;

    }


    DataProvider<Department, String>
    createDepartmentDataProvider(DepartmentService service)
    {
        return DataProvider.fromFilteringCallbacks(query -> {
            // getFilter returns Optional<String>
            String filter = query.getFilter().orElse(null);
            return service.fetch(query.getOffset(),
                    query.getLimit(), filter).stream();
        }, query -> {
            String filter = query.getFilter().orElse(null);
            return service.getCount(filter);
        });
    }

    public void refresh() {
        List<Person> persons = Collections.emptyList();

        // @formatter:off
        ListDataProvider<Person> dataProvider =
                new ListDataProvider<>(persons);

        Button addPersonButton = new Button("Add person",
                clickEvent -> {
                    persons.add(new Person("James Monroe",
                            1758));

                    dataProvider.refreshAll();
                });

        Button modifyPersonButton = new Button("Modify person",
                clickEvent -> {
                    Person personToChange = persons.get(0);

                    personToChange.setName("Changed person");

                    dataProvider.refreshItem(personToChange);
                });
        //@formatter:on
    }

    public void serviceDataProvider() {
        DataProvider<Person, Void> dataProvider =
                DataProvider.fromCallbacks(
                // First callback fetches items based on a query
                query -> {
                    // The index of the first item to load
                    int offset = query.getOffset();

                    // The number of items to load
                    int limit = query.getLimit();

                    List<Person> persons = getPersonService()
                            .fetchPersons(offset, limit);

                    return persons.stream();
                },
                // Second callback fetches the total number of items currently in the Grid.
                // The grid can then use it to properly adjust the scrollbars.
                query -> getPersonService().getPersonCount());

        Grid<Person> grid = new Grid<>();
        grid.setDataProvider(dataProvider);

        // Columns are configured in the same way as before
    }

    public void sorting() {
        //@formatter:off
        DataProvider<Person, Void> dataProvider =
                DataProvider.fromCallbacks(query -> {
                            List<PersonSort> sortOrders = new ArrayList<>();
                            for(SortOrder<String> queryOrder :
                                    query.getSortOrders()) {
                                PersonSort sort = getPersonService()
                                        .createSort(
                                                // The name of the sorted property
                                                queryOrder.getSorted(),
                                                // The sort direction for this property
                                                queryOrder.getDirection() ==
                                                        SortDirection.DESCENDING);
                                sortOrders.add(sort);
                            }

                            return getPersonService().fetchPersons(
                                    query.getOffset(),
                                    query.getLimit(),
                                    sortOrders
                            ).stream();
                        },

                        // The number of persons is the same
                        // regardless of ordering
                        query -> getPersonService().getPersonCount()
                );

        //@formatter:on
    }

    DataProvider<Person, String> getDataProvider(
            PersonService service) {
        DataProvider<Person, Predicate<Person>>
                predicateDataProvider =
        DataProvider.fromFilteringCallbacks(
                query -> service.fetch(query.getOffset(),
                        query.getLimit(),
                        query.getFilter()).stream(),
                query -> service.getCount(query.getFilter()));

        DataProvider<Person, String> dataProvider =
                predicateDataProvider.withConvertedFilter(
                        text -> (person -> person.getName()
                                .startsWith(text)));

        return dataProvider;
    }

    public void gpersonService(PersonService service) {
        DataProvider<Person, String> dataProvider =
                getDataProvider(service);
        ComboBox<Person> comboBox = new ComboBox<>();
        comboBox.setDataProvider(dataProvider);
    }


    public void refreshItem() {
        FetchCallback<Person, String> fetchCallback = null;
        CountCallback<Person, String> sizeCallback = null;
        PersonService service = null;

        DataProvider<Person, String> allPersonsWithId =
                new CallbackDataProvider<>(
                fetchCallback, sizeCallback, Person::getId);

        Grid<Person> persons = new Grid<>();
        persons.setDataProvider(allPersonsWithId);
        persons.addColumn(Person::getName).setHeader("Name");

        Button modifyPersonButton = new Button("", event -> {
            Person personToChange = service.fetchById(128);
            personToChange.setName("Changed person");
            Person newInstance = service.save(personToChange);
            allPersonsWithId.refreshItem(newInstance);
        });

    }

    public void sortOrderProvider() {
        Grid<Person> grid = new Grid<>(Person.class);


        grid.addColumn(person ->
                person.getName() + " " + person.getLastName())
                .setHeader("Name")
                .setSortOrderProvider(
                // Sort according to last name, then first name
                direction -> Stream.of(
                        new QuerySortOrder("lastName", direction),
                        new QuerySortOrder("firstName", direction)));

        // Will be sortable by the user
        // When sorting by this column, the query
        // will have a SortOrder
        // where getSorted() returns "name"
        grid.addColumn(Person::getName)
                .setHeader("Name")
                .setSortProperty("name");

        // Will not be sortable since no sorting info is given
        grid.addColumn(Person::getYearOfBirth)
                .setHeader("Year of birth");
    }

    private DataProvider<Person, Set<String>> getPersonsProvider() {
        return null;
    }

    private DataProvider<Person, String> getPersonProvider() {
        return null;
    }

    private PersonService getPersonService() {
        return null;
    }

    private DataProvider<Person, Set<String>> getProvider() {
        return null;
    }


    public class DepartmentServiceImpl implements DepartmentService {
        List<Department> departments = new ArrayList<>();

        public DepartmentServiceImpl() {
        }

        @Override
        public List<Department> fetch(int offset, int limit, String filterText) {
            List<Department> result = new ArrayList<>();
            return result;
        }

        @Override
        public int getCount(String filterText) {
            int counter = 0;
            return counter;
        }
    }

    public class EmployeeFilter {

        private String filterText;
        private Department department;

        public String getFilterText() {
            return filterText;
        }

        public void setFilterText(String filterText) {
            this.filterText = filterText;
        }

        public Department getDepartment() {
            return department;
        }

        public void setDepartment(Department department) {
            this.department = department;
        }

        public EmployeeFilter(String filterText,
                              Department department) {

            this.filterText = filterText;
            this.department = department;
        }

    }

    public interface EmployeeService {
        List<Employee> fetch(int offset, int limit,
                             EmployeeFilter filter);

        int getCount(EmployeeFilter filter);
    }


    public class Employee {
        String name;
        int yearOfBirth;
        Department department;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getYearOfBirth() {
            return yearOfBirth;
        }

        public void setYearOfBirth(int yearOfBirth) {
            this.yearOfBirth = yearOfBirth;
        }


        public Department getDepartment() {
            return department;
        }

        public void setDepartment(Department department) {
            this.department = department;
        }

        @Override
        public String toString() {
            return name;
        }

        public Employee(String name, int yearOfBirth, Department department) {

            this.name = name;
            this.yearOfBirth = yearOfBirth;
            this.department = department;
        }


    }

    public class EmployeeServiceImpl implements EmployeeService {

        List<Employee> employees = new ArrayList<>();

        public EmployeeServiceImpl() {
        }

        @Override
        public List<Employee> fetch(int offset, int limit, EmployeeFilter filter) {
            List<Employee> searchList = new ArrayList<>();

            if (filter != null && (filter.getDepartment() != null || filter.getFilterText() != null)) {
                for (Employee employee : employees) {
                    if ((filter.getFilterText() == null || employee.getName().contains(filter.getFilterText()))
                            && Objects.equals(employee.getDepartment(), filter.getDepartment())) {
                        searchList.add(employee);
                    }
                }
            } else {
                searchList = employees;
            }

            List<Employee> result = new ArrayList<>();
            int count = 0;
            for (int i = offset; i < offset + limit && i < searchList.size(); i++) {
                result.add(searchList.get(i));
            }

            return result;
        }

        @Override
        public int getCount(EmployeeFilter filter) {
            int counter = 0;

            if (filter == null && (filter.getFilterText() == null || filter.getDepartment() == null)) {
                return employees.size();
            }

            for (Employee employee : employees) {
                if (employee.getName().contains(filter.getFilterText())
                        && Objects.equals(employee.getDepartment(), filter.getDepartment())) {
                    counter++;
                }
            }
            return counter;
        }

    }
}
