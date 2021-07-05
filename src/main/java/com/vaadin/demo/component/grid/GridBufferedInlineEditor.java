package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.HasText;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.editor.Editor;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.data.validator.EmailValidator;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("grid-buffered-inline-editor")
public class GridBufferedInlineEditor extends VerticalLayout {

    public GridBufferedInlineEditor() {
        ValidationMessage firstNameValidationMessage = new ValidationMessage();
        ValidationMessage lastNameValidationMessage = new ValidationMessage();
        ValidationMessage emailValidationMessage = new ValidationMessage();

        // tag::snippet[]
        Grid<Person> grid = new Grid<>(Person.class, false);
        Editor<Person> editor = grid.getEditor();

        Grid.Column<Person> firstNameColumn = grid
                .addColumn(Person::getFirstName).setHeader("First name").setWidth("120px").setFlexGrow(0);
        Grid.Column<Person> lastNameColumn = grid.addColumn(Person::getLastName)
                .setHeader("Last name").setWidth("120px").setFlexGrow(0);
        Grid.Column<Person> emailColumn = grid.addColumn(Person::getEmail)
                .setHeader("Email");
        Grid.Column<Person> editColumn = grid.addComponentColumn(person -> {
            Button editButton = new Button("Edit");
            editButton.addClickListener(e -> {
                if (editor.isOpen())
                    editor.cancel();
                grid.getEditor().editItem(person);
            });
            return editButton;
        }).setWidth("150px").setFlexGrow(0);

        Binder<Person> binder = new Binder<>(Person.class);
        editor.setBinder(binder);
        editor.setBuffered(true);

        TextField firstNameField = new TextField();
        firstNameField.setWidthFull();
        binder.forField(firstNameField)
                .asRequired("First name must not be empty")
                .withStatusLabel(firstNameValidationMessage)
                .bind(Person::getFirstName, Person::setFirstName);
        firstNameColumn.setEditorComponent(firstNameField);

        TextField lastNameField = new TextField();
        lastNameField.setWidthFull();
        binder.forField(lastNameField).asRequired("Last name must not be empty")
                .withStatusLabel(lastNameValidationMessage)
                .bind(Person::getLastName, Person::setLastName);
        lastNameColumn.setEditorComponent(lastNameField);

        EmailField emailField = new EmailField();
        emailField.setWidthFull();
        binder.forField(emailField).asRequired("Email must not be empty")
                .withValidator(new EmailValidator(
                        "Please enter a valid email address"))
                .withStatusLabel(emailValidationMessage)
                .bind(Person::getEmail, Person::setEmail);
        emailColumn.setEditorComponent(emailField);

        Button saveButton = new Button("Save", e -> editor.save());
        Button cancelButton = new Button(VaadinIcon.CLOSE.create(),
                e -> editor.cancel());
        cancelButton.addThemeNames("icon", "error");
        HorizontalLayout actions = new HorizontalLayout(saveButton,
                cancelButton);
        actions.setPadding(false);
        editColumn.setEditorComponent(actions);
        // end::snippet[]

        editor.addCancelListener(e -> {
            firstNameValidationMessage.setText("");
            lastNameValidationMessage.setText("");
            emailValidationMessage.setText("");
        });

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        getThemeList().clear();
        getThemeList().add("spacing-s");
        add(grid, firstNameValidationMessage, lastNameValidationMessage,
                emailValidationMessage);
    }

    private static class ValidationMessage extends HorizontalLayout
            implements HasText {

        private final Span span = new Span();

        public ValidationMessage() {
            setVisible(false);
            setAlignItems(Alignment.CENTER);
            getStyle().set("color", "var(--lumo-error-text-color)");
            getThemeList().clear();
            getThemeList().add("spacing-s");

            Icon icon = VaadinIcon.EXCLAMATION_CIRCLE_O.create();
            icon.setSize("16px");
            add(icon, span);
        }

        @Override
        public String getText() {
            return span.getText();
        }

        @Override
        public void setText(String text) {
            span.setText(text);
            this.setVisible(text != null && !text.isEmpty());
        }
    }

    public static class Exporter // hidden-source-line
            extends // hidden-source-line
            DemoExporter<GridBufferedInlineEditor> { // hidden-source-line
    } // hidden-source-line
}
