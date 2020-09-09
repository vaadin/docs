/*
 * Copyright 2000-2020 Vaadin Ltd.
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

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.EnumSet;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.dataview.GridDataView;
import com.vaadin.flow.component.grid.dataview.GridLazyDataView;
import com.vaadin.flow.component.grid.dataview.GridListDataView;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.select.data.SelectListDataView;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.provider.CallbackDataProvider;
import com.vaadin.flow.data.provider.Query;
import com.vaadin.flow.data.provider.QuerySortOrder;
import com.vaadin.flow.data.provider.SortDirection;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.spring.annotation.SpringComponent;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("binding-data/tutorial-flow-data-provider.asciidoc")
public class DataProviders {

    public enum Status {
        OK, ERROR;

        public String getLabel() {
            return "";
        }
    }

    public interface PersonService {
        List<Person> fetchPersons(int offset, int limit);
        int getPersonCount();
        Person save(Person person);

        public List<Person> findAll();
    }

    public void combobox() {
        ComboBox<Status> comboBox = new ComboBox<>();
        comboBox.setItemLabelGenerator(Status::getLabel);

        // Sets items as a collection
        comboBox.setItems(EnumSet.allOf(Status.class));
    }

    public void comboboxWithPersons() {
        ComboBox<Person> comboBox = new ComboBox<>();
        comboBox.setItemLabelGenerator(Person::getFullName);

        // Sets items as a collection
        List<Person> persons = getPersonService().findAll();
        comboBox.setItems(persons);

    }

    public void gridWithConfiguredColumns() {
        // A bean with some fields
        final class Person implements Serializable {
            private String name;
            private String email;
            private String title;
            private int yearOfBirth;

            public Person(String name, int yearOfBirth) {
                this.name = name;
                this.yearOfBirth = yearOfBirth;
            }

            public String getName() {
                return name;
            }

            public int getYearOfBirth() {
                return yearOfBirth;
            }

            public String getTitle() {
                return title;
            }

            // other getters and setters
        }

        // Show such beans in a Grid
        Grid<Person> grid = new Grid<>();
        // @formatter:off
        grid.addColumn(Person::getName)
                .setHeader("Name");
        grid.addColumn(Person::getYearOfBirth)
                .setHeader("Year of birth");
        // @formatter:on
    }

    public void grid() {
        Grid<Person> grid = new Grid<>();

        // @formatter:off
        // Sets items using vararg beans
        grid.setItems(
                new Person("George Washington", 1732),
                new Person("John Adams", 1735),
                new Person("Thomas Jefferson", 1743),
                new Person("James Madison", 1751)
        );
        // @formatter:on

        PersonRepository personRepository = repo;

        // Pass all Person objects to a grid from a Spring Data repository object
        grid.setItems(personRepository.findAll());

        grid.addColumn(Person::getName)
                .setHeader("Name")
                // Override the default sorting
                .setComparator(Comparator.comparing(person ->
                        person.getName().toLowerCase()));

        // You get a DataView when setting the items
        GridListDataView<Person> dataView = grid
                .setItems(personRepository.findAll());

        // Change the sort order of items collection
        dataView.setSortOrder(Person::getName, SortDirection.ASCENDING);

        // Add a secondary sort order to the existing sort order
        dataView.addSortOrder(Person::getTitle, SortDirection.ASCENDING);

        // Remove sorting completely (undoes the settings done above)
        dataView.removeSorting();
    }

    public void beanGrid() {
        // Create a listing component for a bean type
        Grid<Person> grid = new Grid<>(Person.class);
        grid.setColumns("name", "email", "title");
        grid.getColumnByKey("name").setHeader("Name");
        grid.getColumnByKey("email").setHeader("Email");
        grid.getColumnByKey("title").setHeader("Title");
    }

    public void lazyDataBindingToGrid(PersonRepository repository) {

        Grid<Person> grid = new Grid<>();

        grid.setItems(query -> {
            return repository.findAll( // <1>
                    PageRequest.of(query.getPage(), // <2>
                            query.getPageSize()) // <3>
            ).stream(); // <4>
        });

        grid.setItems(query -> // <1>
            getPersonService() // <2>
                    .fetchPersons(query.getOffset(), query.getLimit()) // <3>
                    .stream() // <4>
        );

        grid.setSortableColumns("name", "email");
        grid.addColumn(person -> person.getTitle())
                .setHeader("title")
                .setSortable(true);

        GridLazyDataView<Person> dataView = grid.setItems(query -> { // <1>
            return getPersonService()
                    .fetchPersons(query.getOffset(), query.getLimit())
                    .stream();
        });

        dataView.setItemCountEstimate(1000); // <2>
        dataView.setItemCountEstimateIncrease(500); // <3>

        dataView.setItemCountCallback(q -> getPersonService().getPersonCount());

    }

    TextField filterTextField = new TextField("Filter by name");
    Grid<Person> grid;
    PersonRepository repo;

    public void bindWithSorting() {
        Grid<Person> grid = new Grid<>(Person.class);
        grid.setSortableColumns("name", "email"); // <1>
        grid.addColumn(person -> person.getTitle())
                .setHeader("Title")
                .setKey("title").setSortable(true); // <2>
        grid.setItems(
                query -> {
                    Sort springSort = toSpringDataSort(query.getSortOrders()); // <3>
                    return repo.findAll(
                            PageRequest.of(
                                    query.getPage(),
                                    query.getPageSize(),
                                    springSort // <4>
                            )).stream();
                });
    }

    /**
     * A method to convert given Vaadin sort hints to Spring Data specific sort
     * instructions.
     *
     * @param vaadinSortOrders a list of Vaadin QuerySortOrders to convert to
     * @return the Sort object for Spring Data repositories
     */
    public static Sort toSpringDataSort(List<QuerySortOrder> vaadinSortOrders) {
        return Sort.by(
                vaadinSortOrders.stream()
                        .map(sortOrder ->
                                sortOrder.getDirection() == SortDirection.ASCENDING ?
                                        Sort.Order.asc(sortOrder.getSorted()) : // <5>
                                        Sort.Order.desc(sortOrder.getSorted())
                        )
                        .collect(Collectors.toList())
        );
    }

    public void initFiltering() {
        filterTextField.setValueChangeMode(ValueChangeMode.LAZY); // <1>
        filterTextField.addValueChangeListener(e -> listPersonsFilteredByName(e.getValue())); // <2>

    }

    private void listPersonsFilteredByName(String filterString) {
        String likeFilter = "%" + filterString + "%";// <3>
        grid.setItems(q -> repo
                .findByNameLikeIgnoreCase(
                        likeFilter, // <4>
                        PageRequest.of(q.getPage(), q.getPageSize()))
                .stream());
    }

    private void refreshItem() {
        Person person = new Person();
        person.setName("Jorma");
        person.setEmail("old@gmail.com");

        GridListDataView<Person> gridDataView = grid.setItems(person);

        Button modify = new Button("Modify data", e -> {
            person.setEmail("new@gmail.com");

            // The component shows the old email until notified of changes
            gridDataView.refreshItem(person);
        });
    }

    private void selectingNextItem() {

        List<Person> allPersons = repo.findAll();
        GridListDataView<Person> gridDataView = grid.setItems(allPersons);

        Button selectNext = new Button("Next", e -> {
            grid.asSingleSelect().getOptionalValue().ifPresent(p -> {
                gridDataView.getNextItem(p).ifPresent(
                        next -> grid.select(next)
                );
            });
        });

        // Filter Persons younger 20 years
        gridDataView.setFilter(p -> p.getAge() < 20);

        // Remove filters completely (undoes the settings done above)
        gridDataView.removeFilters();

    }

    private void selectNext(Grid grid) {
        Object current = grid.asSingleSelect().getValue();
        grid.getListDataView().getNextItem(current).ifPresent(next -> {
            grid.asSingleSelect().setValue(next);
        });

    }

    private void lazyBindingToComboBox() {
        ComboBox<Person> cb = new ComboBox<>();
        cb.setDataProvider((String filter, int offset, int limit) -> {
            return repo.findByNameLikeIgnoreCase(
                    "%" + filter + "%", // <1>
                    PageRequest.of(offset / limit, limit)
            ).stream();
        }, filter -> {
            return (int) repo.countByNameLikeIgnoreCase("%" + filter + "%"); // <2>
        });
    }

    private void exportToCsvFile(Grid<Person> grid)
            throws FileNotFoundException, IOException {
        GridDataView<Person> dataView = grid.getGenericDataView();
        FileOutputStream fout = new FileOutputStream(new File("/tmp/export.csv"));

        dataView.getItems().forEach(person -> {
            try {
                fout.write((person.getFullName() + ", " + person.getEmail() + "\n").getBytes());
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        });
        fout.close();
    }

    private void mutationMethodsInListDataView() {
        // The initial data
        ArrayList<String> items = new ArrayList<>(Arrays.asList("foo", "bar"));

        // Get the data view when binding it to a component
        Select<String> select = new Select<>();
        SelectListDataView<String> dataView = select.setItems(items);

        TextField newItemField = new TextField("Add new item");
        Button addNewItem = new Button("Add", e -> {
            // Adding through the data view API mutates the data source
            dataView.addItem(newItemField.getValue());
        });
        Button remove = new Button("Remove selected", e-> {
            // Same for removal
            dataView.removeItem(select.getValue());
        });

        // Hook to item count change event
        dataView.addItemCountChangeListener(e ->
                Notification.show(" " + e.getItemCount() + " items available"));

        // Request the item count directly
        Span itemCountSpan = new Span("Total Item Count: " + dataView.getItemCount());
    }

    public static void listItems(Grid<Person> grid, PersonRepository repository) {
        grid.setItems(query -> repository.findAll(
                PageRequest.of(query.getPage(), query.getPageSize())).stream());
    }

    public void shareDataBindingCode() {
        PersonDataProvider dataProvider = new PersonDataProvider();
        Grid<Person> personGrid = new Grid<>();

        personGrid.setItems(dataProvider);
    }

    private PersonService getPersonService() {
        return null;
    }

    @SpringComponent()
    @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
    public class PersonGrid extends Grid<Person> {

        public PersonGrid(@Autowired PersonRepository repo) {
            super(Person.class);

            // Make the lazy binding
            setItems(q -> repo.findAll(
                    PageRequest.of(q.getPage(), q.getPageSize())).stream());

            // Make other common/default configuration
            setColumns("name", "email");
        }

    }

    @SpringComponent
    public class PersonDataProvider implements CallbackDataProvider.FetchCallback<Person, Void> {

        @Autowired
        PersonRepository repo;

        @Override
        public Stream<Person> fetch(Query<Person, Void> query) {
            return repo.findAll(PageRequest.of(query.getPage(),
                    query.getPageSize())).stream();
        }

    }
}
