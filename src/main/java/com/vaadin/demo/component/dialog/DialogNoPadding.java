package com.vaadin.demo.component.dialog;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.dialog.DialogVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Footer;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Header;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.Scroller;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;

@Route("dialog-no-padding")
public class DialogNoPadding extends Div {

    public DialogNoPadding() {
        Dialog dialog = new Dialog();
        dialog.getElement().setAttribute("aria-label", "Create new employee");

        VerticalLayout dialogLayout = createDialogLayout(dialog);
        dialog.add(dialogLayout);
        // tag::snippet[]
        dialog.addThemeVariants(DialogVariant.LUMO_NO_PADDING);
        // end::snippet[]

        Button button = new Button("Show dialog", e -> dialog.open());

        add(dialog, button);
    }

    private static VerticalLayout createDialogLayout(Dialog dialog) {
        H2 dialogTitle = new H2("Create new employee");
        Header header = new Header(dialogTitle);

        VerticalLayout personalInformationSection = createPersonalInformationSection();
        VerticalLayout employeeInformationSection = createEmployeeInformationSection();
        VerticalLayout scrollContent = new VerticalLayout(
                personalInformationSection, employeeInformationSection);
        Scroller scroller = new Scroller(scrollContent);

        Footer footer = createFooter(dialog);

        VerticalLayout dialogContent = new VerticalLayout(header, scroller,
                footer);
        dialogContent.setPadding(false);
        dialogContent.setSpacing(false);
        dialogContent.getStyle().remove("width");
        dialogContent.setAlignItems(FlexComponent.Alignment.STRETCH);
        dialogContent.setClassName("dialog-no-padding-example-overlay");

        return dialogContent;
    }

    private static VerticalLayout createPersonalInformationSection() {
        H3 personalInformationTitle = new H3("Personal information");
        personalInformationTitle.setId("personal-title");
        TextField firstNameField = new TextField("First name");
        TextField lastNameField = new TextField("Last name");
        DatePicker birthdatePicker = new DatePicker("Birthdate");
        birthdatePicker.setInitialPosition(LocalDate.of(1990, 1, 1));

        VerticalLayout section = new VerticalLayout(personalInformationTitle,
                firstNameField, lastNameField, birthdatePicker);
        section.setPadding(false);
        section.setSpacing(false);
        section.setAlignItems(FlexComponent.Alignment.STRETCH);
        section.getElement().setAttribute("role", "region");
        section.getElement().setAttribute("aria-labelledby",
                personalInformationTitle.getId().get());

        return section;
    }

    private static VerticalLayout createEmployeeInformationSection() {
        H3 employmentInformationTitle = new H3("Employment information");
        employmentInformationTitle.setId("employment-title");

        TextField positionField = new TextField("Position");
        TextArea informationArea = new TextArea("Additional information");

        VerticalLayout section = new VerticalLayout(employmentInformationTitle,
                positionField, informationArea);
        section.setPadding(false);
        section.setSpacing(false);
        section.setAlignItems(FlexComponent.Alignment.STRETCH);
        section.getElement().setAttribute("role", "region");
        section.getElement().setAttribute("aria-labelledby",
                employmentInformationTitle.getId().get());

        return section;
    }

    private static Footer createFooter(Dialog dialog) {
        Button cancelButton = new Button("Cancel", e -> dialog.close());
        cancelButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        Button saveButton = new Button("Save", e -> dialog.close());
        saveButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        HorizontalLayout buttonLayout = new HorizontalLayout(cancelButton,
                saveButton);
        buttonLayout
                .setJustifyContentMode(FlexComponent.JustifyContentMode.END);

        return new Footer(buttonLayout);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<DialogNoPadding> { // hidden-source-line
    } // hidden-source-line
}
