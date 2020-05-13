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
package com.vaadin.flow.tutorial.components;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.vaadin.flow.component.Html;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.Grid.Column;
import com.vaadin.flow.component.grid.Grid.SelectionMode;
import com.vaadin.flow.component.grid.GridMultiSelectionModel;
import com.vaadin.flow.component.grid.GridSingleSelectionModel;
import com.vaadin.flow.component.grid.GridVariant;
import com.vaadin.flow.component.grid.HeaderRow;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.provider.QuerySortOrder;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.data.renderer.TemplateRenderer;
import com.vaadin.flow.data.selection.MultiSelect;
import com.vaadin.flow.data.selection.SingleSelect;
import com.vaadin.flow.function.ValueProvider;
import com.vaadin.flow.tutorial.annotations.CodeFor;
import com.vaadin.flow.tutorial.databinding.Person;

@CodeFor("components/tutorial-flow-grid.asciidoc")
public class GridBasic {

    public void basics() {
        HorizontalLayout layout = new HorizontalLayout();

        // Have some data
        List<Person> people = Arrays.asList(
                new Person("Nicolaus Copernicus", 1543),
                new Person("Galileo Galilei", 1564),
                new Person("Johannes Kepler", 1571));

        // Create a grid bound to the list
        Grid<Person> grid = new Grid<>();
        grid.setItems(people);
        grid.addColumn(Person::getName).setHeader("Name");
        grid.addColumn(Person::getYearOfBirth)
                .setHeader("Year of birth");

        layout.add(grid);
    }

    public void gridWithHasValueInterface() {
        Grid<Person> grid = new Grid<>();

        grid.setSelectionMode(SelectionMode.SINGLE);
        SingleSelect<Grid<Person>, Person> personSelect =
                grid.asSingleSelect();
        // personSelect can now be used with Binder or
        // HasValue interface
        personSelect.addValueChangeListener(e -> {
            Person selectedPerson = e.getValue();
        });

        grid.setSelectionMode(SelectionMode.MULTI);
        MultiSelect<Grid<Person>, Person> multiSelect =
                grid.asMultiSelect();
        multiSelect.addValueChangeListener(e -> {
            Set<Person> selectedPersons = e.getValue();
        });

    }

    public void handlingSelection() {
        Label message = new Label();
        Grid<Person> grid = new Grid<>();

        // switch to multiselect mode
        grid.setSelectionMode(SelectionMode.MULTI);

        grid.addSelectionListener(event -> {
            Set<Person> selected = event.getAllSelectedItems();
            message.setText(selected.size() + " items selected");
        });

        Person defaultItem = null;
        List<Person> people = null;

        // in single-select, only one item is selected
        grid.select(defaultItem);

        // switch to multi select, clears selection
        grid.setSelectionMode(SelectionMode.MULTI);
        // Select items 2-4
        people.subList(2, 3).forEach(grid::select);

        // the default selection model
        GridSingleSelectionModel<Person> defaultModel =
                (GridSingleSelectionModel<Person>) grid
                .getSelectionModel();

        // Use multi-selection mode
        GridMultiSelectionModel<Person> selectionModel =
                (GridMultiSelectionModel<Person>) grid
                .setSelectionMode(SelectionMode.MULTI);

        // preselect value
        grid.select(defaultItem);

        GridSingleSelectionModel<Person> singleSelect =
                (GridSingleSelectionModel<Person>) grid
                .getSelectionModel();
        // disallow empty selection
        singleSelect.setDeselectAllowed(false);
    }

    public void gridMultiSelect() {
        List<Person> people = null;
        Label message = new Label();
        Button deleteSelected = null;

        // Grid in multi-selection mode
        Grid<Person> grid = new Grid<>();
        grid.setItems(people);
        GridMultiSelectionModel<Person> selectionModel =
                (GridMultiSelectionModel<Person>) grid
                .setSelectionMode(SelectionMode.MULTI);

        selectionModel.selectAll();

        selectionModel.addMultiSelectionListener(event -> {
            message.setText(String.format(
                    "%s items added, %s removed.",
                    event.getAddedSelection().size(),
                    event.getRemovedSelection().size()));

            // Allow deleting only if there's any selected
            deleteSelected.setEnabled(
                    event.getNewSelection().isEmpty());
        });
    }

    public void itemClickEvent() {
        Grid<Person> grid = new Grid<>();

        grid.setSelectionMode(SelectionMode.NONE);
        grid.addItemClickListener(event -> System.out
                .println(("Clicked Item: " + event.getItem())));
    }

    public void itemDoubleClickEvent() {
        Grid<Person> grid = new Grid<>();

        grid.setSelectionMode(SelectionMode.MULTI);
        grid.addItemDoubleClickListener(event ->
                copy(grid.getSelectedItems()));
    }

    public void gridConfiguringColumns() {
        Grid<Person> grid = new Grid<>();

        //@formatter:off
        Column<Person> nameColumn = grid
                .addColumn(Person::getName)
                .setHeader("Name")
                .setFlexGrow(0)
                .setWidth("100px")
                .setResizable(false);
        //@formatter:on

        grid.setColumnReorderingAllowed(true);

        nameColumn.setFrozen(true);

        nameColumn.setKey("name");
        grid.getColumnByKey("name").setWidth("100px");
    }

    public void beanGrid() {
        Grid<Person> grid = new Grid<>(Person.class);
        grid.getColumnByKey("yearOfBirth").setFrozen(true);

        grid.addColumn("address.postalCode");

        grid.getColumnByKey("address.postalCode")
                .setSortable(false);

        // All columns except "name" and "yearOfBirth"
        // will be not sortable
        grid.setSortableColumns("name", "yearOfBirth");
    }

    public void gridColumnMerging() {
        Grid<Person> grid = new Grid<>();
        Column<Person> nameColumn = grid.addColumn(ValueProvider.identity());
        Column<Person> ageColumn = grid.addColumn(ValueProvider.identity());
        Column<Person> streetColumn = grid.addColumn(ValueProvider.identity());
        Column<Person> postalCodeColumn = grid
                .addColumn(ValueProvider.identity());

        // Create a header row
        HeaderRow topRow = grid.prependHeaderRow();

        // group two columns under the same label
        topRow.join(nameColumn, ageColumn)
                .setComponent(new Label("Basic Information"));

        // group the other two columns in the same header row
        topRow.join(streetColumn, postalCodeColumn)
                .setComponent(new Label("Address Information"));
    }

    public void gridHeadersAndFooters() {
        Grid<Person> grid = new Grid<>();
        Column<Person> nameColumn = grid.addColumn(ValueProvider.identity());

        // Sets a simple text header
        nameColumn.setHeader("Name");
        // Sets a header using Html component,
        // in this case simply bolding the caption "Name"
        nameColumn.setHeader(new Html("<b>Name</b>"));

        // Similarly for the footer
        nameColumn.setFooter("Name");
        nameColumn.setFooter(new Html("<b>Name</b>"));
    }

    public void gridSorting() {
        Grid<Person> grid = new Grid<>();

        grid.setMultiSort(true);

        grid.addColumn(Person::getAge, "age").setHeader("Age");

        grid.addColumn(person -> person.getName() + " " +
                person.getLastName(), "name", "lastName"
        ).setHeader("Name");

        grid.addColumn(TemplateRenderer.<Person>of(
                "<div>[[item.name]]<br>" +
                        "<small>[[item.email]]</small></div>")
                        .withProperty("name", Person::getName)
                        .withProperty("email", Person::getEmail),
                "name", "email")
                .setHeader("Person");

        grid.addColumn(Person::getName)
                .setComparator((person1, person2) ->
                        person1.getName()
                                .compareToIgnoreCase(person2.getName()))
                .setHeader("Name");

        grid.addColumn(Person::getName)
                .setSortProperty("name", "email")
                .setHeader("Person");

        grid.addColumn(Person::getName)
                .setSortOrderProvider(direction -> Arrays
                        .asList(new QuerySortOrder("name", direction),
                                new QuerySortOrder("email", direction))
                        .stream())
                .setHeader("Person");

        grid.addSortListener(event -> {
            String currentSortOrder = grid.getDataCommunicator()
                    .getBackEndSorting().stream()
                    .map(querySortOrder -> String.format(
                            "{sort property: %s, direction: %s}",
                            querySortOrder.getSorted(),
                            querySortOrder.getDirection()))
                    .collect(Collectors.joining(", "));
            System.out.println(String.format(
                    "Current sort order: %s. User-clicked: %s.",
                    currentSortOrder, event.isFromClient()));
        });

        Column<Person> column = grid.addColumn(Person::getName);
        column.setSortable(false);
        column.isSortable();
    }

    public void gridTheming() {
        Grid<Celebrity> grid = new Grid<>();
        grid.setItems(Celebrity.getPeople());
        grid.addClassName("styled");
        grid.addColumn(new ComponentRenderer<>(person -> {
            TextField textField = new TextField();
            textField.setValue(person.getName());
            textField.addClassName("style-" +
                    person.getGender());
            textField.addValueChangeListener(
                    event -> person.setName(event.getValue()));
            return textField;
        })).setHeader("Name");

        grid.addColumn(new ComponentRenderer<>(person -> {
            DatePicker datePicker = new DatePicker();
            datePicker.setValue(person.getDob());
            datePicker.addValueChangeListener(event -> {
                person.setDob(event.getValue());
            });
            datePicker.addClassName("style-" +
                    person.getGender());
            return datePicker;
        })).setHeader("DOB");

        grid.addColumn(new ComponentRenderer<>(person -> {
            Image image = new Image(person.getImgUrl(),
                    person.getName());
            return image;
        })).setHeader("Image");

        grid.addThemeVariants(GridVariant.LUMO_NO_ROW_BORDERS,
                GridVariant.LUMO_NO_BORDER, GridVariant.LUMO_ROW_STRIPES);
    }

    public void beanGridColumnOrder() {
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(person -> person.getName().split(" ")[0])
                .setHeader("First name");
        grid.addColumns("age", "address.postalCode");

        grid.setColumns("name", "age", "address.postalCode");
    }

    // Bean class for gridTheming
    public static class Celebrity {
        enum Gender {
            MALE("male"), FEMALE("female");

            private String value;

            Gender(String value) {
                this.value = value;
            }

            public String getValue() {
                return value;
            }

            @Override
            public String toString() {
                return value;
            }
        }

        private Gender gender;
        private String name;
        private LocalDate dob;

        public Celebrity(Gender gender, String firstName, String lastName,
                LocalDate dob) {
            this.gender = gender;
            this.name = firstName + " " + lastName;
            this.dob = dob;
        }

        public static List<Celebrity> getPeople() {
            ArrayList<Celebrity> list = new ArrayList<>();
            list.add(new Celebrity(Gender.FEMALE, "Aretha", "Franklin",
                    LocalDate.of(1942, 3, 25)));
            list.add(new Celebrity(Gender.MALE, "Alan", "Moore",
                    LocalDate.of(1953, 11, 18)));
            list.add(new Celebrity(Gender.MALE, "Freddie", "Mercury",
                    LocalDate.of(1946, 9, 5)));

            return list;
        }

        public Gender getGender() {
            return gender;
        }

        public void setGender(Gender gender) {
            this.gender = gender;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public LocalDate getDob() {
            return dob;
        }

        public void setDob(LocalDate dob) {
            this.dob = dob;
        }

        public String getImgUrl() {
            return "/img/" + name.toLowerCase().replaceAll(" ", "") + ".jpg";
        }

    }

    private void copy(Set<Person> persons) {
    }

    //@formatter:off
    /*
     * code of commented lines
     *
     grid.setColumnOrder(firstnameColumn, lastnameColumn,
                    bornColumn, birthplaceColumn,
                    diedColumn);
     */
    //@formatter:on
}
