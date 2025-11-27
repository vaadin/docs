package com.vaadin.demo.component.scroller;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.Unit;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.*;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.Scroller;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;

@Route("scroller-basic")
public class ScrollerBasic extends VerticalLayout {

    public static final String PERSONAL_TITLE_ID = "personal-title";
    public static final String EMPLOYMENT_TITLE_ID = "employment-title";

    public ScrollerBasic() {
        getStyle().set("border", "solid 1px var(--vaadin-border-color)");
        setHeight(400, Unit.PIXELS);
        setMaxWidth(100, Unit.PERCENTAGE);
        setPadding(false);
        setSpacing(false);
        setWidth(360, Unit.PIXELS);
        setAlignItems(FlexComponent.Alignment.STRETCH);

        // Header
        Header header = new Header();
        header.getStyle().set("display", "flex").set("align-items", "center")
                .set("gap", "1rem").set("padding", "1rem")
                .set("border-bottom", "solid 1px #ccc");

        H2 editEmployee = new H2("Edit employee");
        editEmployee.getStyle().set("font-size", "1.375rem");

        Icon arrowLeft = VaadinIcon.ARROW_LEFT.create();
        arrowLeft.getStyle().set("padding", "0.25rem");
        arrowLeft.getElement().setAttribute("aria-hidden", "true");

        Anchor goBack = new Anchor("#", arrowLeft);
        goBack.setAriaLabel("Go back");

        header.add(goBack, editEmployee);
        add(header);

        // tag::snippet[]
        // Personal information
        H3 personalTitle = new H3("Personal information");
        personalTitle.getStyle().set("font-size", "1.125rem");
        personalTitle.setId(PERSONAL_TITLE_ID);

        TextField firstName = new TextField("First name");
        firstName.setWidthFull();

        TextField lastName = new TextField("Last name");
        lastName.setWidthFull();

        DatePicker birthDate = new DatePicker("Birthdate");
        birthDate.setInitialPosition(LocalDate.of(1990, 1, 1));
        birthDate.setWidthFull();

        Section personalInformation = new Section(personalTitle, firstName,
                lastName, birthDate);
        personalInformation.getElement().setAttribute("aria-labelledby",
                PERSONAL_TITLE_ID);

        // Employment information
        H3 employmentTitle = new H3("Employment information");
        employmentTitle.getStyle().set("font-size", "1.125rem")
                .set("margin-top", "1.5rem");
        employmentTitle.setId(EMPLOYMENT_TITLE_ID);

        TextField position = new TextField("Position");
        position.setWidthFull();

        TextArea additionalInformation = new TextArea("Additional Information");
        additionalInformation.setWidthFull();

        Section employmentInformation = new Section(employmentTitle, position,
                additionalInformation);
        employmentInformation.getElement().setAttribute("aria-labelledby",
                EMPLOYMENT_TITLE_ID);

        Scroller scroller = new Scroller(
                new Div(personalInformation, employmentInformation));
        scroller.getStyle().set("border-bottom", "solid 1px #ccc")
                .set("padding", "1rem");
        scroller.setScrollDirection(Scroller.ScrollDirection.VERTICAL);
        add(scroller);
        // end::snippet[]

        // Footer
        Button save = new Button("Save");
        save.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        Button reset = new Button("Reset");
        reset.addThemeVariants(ButtonVariant.LUMO_TERTIARY);

        Footer footer = new Footer(save, reset);
        footer.getStyle().set("display", "flex").set("gap", "0.5rem")
                .set("padding", "0.5rem 1rem");
        add(footer);
    }

    public static class Exporter extends DemoExporter<ScrollerBasic> { // hidden-source-line
    } // hidden-source-line
}
