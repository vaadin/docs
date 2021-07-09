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
        dialogTitle.getStyle().set("font-size", "var(--lumo-font-size-xl)")
                .set("font-weight", "600")
                .set("line-height", "var(--lumo-line-height-xs)")
                .set("margin", "0");

        Header header = new Header(dialogTitle);
        header.getElement().getClassList().add("draggable");
        header.getStyle()
                .set("border-bottom", "1px solid var(--lumo-contrast-10pct)")
                .set("padding", "var(--lumo-space-m) var(--lumo-space-m)");

        H3 personalInformationTitle = new H3("Personal information");
        personalInformationTitle.setId("personal-title");
        personalInformationTitle.getStyle()
                .set("font-size", "var(--lumo-font-size-l)")
                .set("font-weight", "600")
                .set("line-height", "var(--lumo-line-height-xs)")
                .set("margin", "0 0 var(--lumo-space-s) 0");
        TextField firstNameField = new TextField("First name");
        TextField lastNameField = new TextField("Last name");
        DatePicker birthdatePicker = new DatePicker("Birthdate");
        birthdatePicker.setInitialPosition(LocalDate.of(1990, 1, 1));

        VerticalLayout personalInformationLayout = new VerticalLayout(
                personalInformationTitle, firstNameField, lastNameField,
                birthdatePicker);
        personalInformationLayout.setPadding(false);
        personalInformationLayout.setSpacing(false);
        personalInformationLayout
                .setAlignItems(FlexComponent.Alignment.STRETCH);
        personalInformationLayout.getElement().setAttribute("role", "region");
        personalInformationLayout.getElement().setAttribute("aria-labelledby",
                personalInformationTitle.getId().get());

        H3 employmentInformationTitle = new H3("Employment information");
        employmentInformationTitle.setId("employment-title");
        employmentInformationTitle.getStyle()
                .set("font-size", "var(--lumo-font-size-l)")
                .set("font-weight", "600")
                .set("line-height", "var(--lumo-line-height-xs)")
                .set("margin", "0 0 var(--lumo-space-s) 0");

        TextField positionField = new TextField("Position");
        TextArea informationArea = new TextArea("Additional information");

        VerticalLayout employmentInformationLayout = new VerticalLayout(
                employmentInformationTitle, positionField, informationArea);
        employmentInformationLayout.setPadding(false);
        employmentInformationLayout.setSpacing(false);
        employmentInformationLayout
                .setAlignItems(FlexComponent.Alignment.STRETCH);
        employmentInformationLayout.getElement().setAttribute("role", "region");
        employmentInformationLayout.getElement().setAttribute("aria-labelledby",
                employmentInformationTitle.getId().get());

        VerticalLayout scrollContent = new VerticalLayout(
                personalInformationLayout, employmentInformationLayout);
        Scroller scroller = new Scroller(scrollContent);

        Button cancelButton = new Button("Cancel", e -> dialog.close());
        cancelButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        Button saveButton = new Button("Save", e -> dialog.close());
        saveButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        HorizontalLayout buttonLayout = new HorizontalLayout(cancelButton,
                saveButton);
        buttonLayout
                .setJustifyContentMode(FlexComponent.JustifyContentMode.END);
        Footer footer = new Footer(buttonLayout);
        footer.getStyle().set("background-color", "var(--lumo-contrast-5pct)")
                .set("padding", "var(--lumo-space-s) var(--lumo-space-m)")
                .set("text-align", "right");

        VerticalLayout dialogContent = new VerticalLayout(header, scroller,
                footer);
        dialogContent.setPadding(false);
        dialogContent.setSpacing(false);
        dialogContent.setAlignItems(FlexComponent.Alignment.STRETCH);
        dialogContent.getStyle().set("height", "100%")
                .set("max-height", "420px").set("width", "320px");

        return dialogContent;
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<DialogNoPadding> { // hidden-source-line
    } // hidden-source-line
}
