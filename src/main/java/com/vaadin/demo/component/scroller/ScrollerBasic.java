package com.vaadin.demo.component.scroller;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.*;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
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
    setAlignItems(Alignment.STRETCH);
    setHeight("400px");
    setMaxWidth("100%");
    setPadding(false);
    setSpacing(false);
    setWidth("360px");
    getStyle().set("border", "1px solid var(--lumo-contrast-20pct)");

    // Header
    Header header = new Header();
    header.getStyle()
            .set("align-items", "center")
            .set("border-bottom", "1px solid var(--lumo-contrast-20pct)")
            .set("display", "flex")
            .set("padding", "var(--lumo-space-m)");

    H2 editEmployee = new H2("Edit employee");
    editEmployee.getStyle().set("margin", "0");

    Icon arrowLeft = VaadinIcon.ARROW_LEFT.create();
    arrowLeft.setSize("var(--lumo-icon-size-m)");
    arrowLeft.getElement()
            .setAttribute("aria-hidden", "true");
    arrowLeft.getStyle()
            .set("box-sizing", "border-box")
            .set("margin-right", "var(--lumo-space-m)")
            .set("padding", "calc(var(--lumo-space-xs) / 2)");

    Anchor goBack = new Anchor("#", arrowLeft);

    header.add(goBack, editEmployee);
    add(header);

    // tag::snippet[]
    // Personal information
    H3 personalTitle = new H3("Personal information");
    personalTitle.setId(PERSONAL_TITLE_ID);

    TextField firstName = new TextField("First name");
    firstName.setWidthFull();

    TextField lastName = new TextField("Last name");
    lastName.setWidthFull();

    DatePicker birthDate = new DatePicker("Birthdate");
    birthDate.setInitialPosition(LocalDate.of(1990, 1, 1));
    birthDate.setWidthFull();

    Section personalInformation = new Section(personalTitle, firstName, lastName, birthDate);
    personalInformation.getElement().setAttribute("aria-labelledby", PERSONAL_TITLE_ID);

    // Employment information
    H3 employementTitle = new H3("Employment information");
    employementTitle.setId(EMPLOYMENT_TITLE_ID);

    TextField position = new TextField("Position");
    position.setWidthFull();

    TextArea additionalInformation = new TextArea("Additional Information");
    additionalInformation.setWidthFull();

    Section employmentInformation = new Section(employementTitle, position, additionalInformation);
    employmentInformation.getElement().setAttribute("aria-labelledby", EMPLOYMENT_TITLE_ID);

    // NOTE
    // We are using inline styles here to keep the example simple.
    // We recommend placing CSS in a separate style sheet and to
    // encapsulating the styling in a new component.
    Scroller scroller = new Scroller(new Div(personalInformation, employmentInformation));
    scroller.setScrollDirection(Scroller.ScrollDirection.VERTICAL);
    scroller.getStyle()
            .set("border-bottom", "1px solid var(--lumo-contrast-20pct)")
            .set("padding", "var(--lumo-space-m)");
    add(scroller);
    // end::snippet[]

    // Footer
    Button save = new Button("Save");
    save.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
    save.getStyle().set("margin-right", "var(--lumo-space-s)");

    Button reset = new Button("Reset");
    reset.addThemeVariants(ButtonVariant.LUMO_TERTIARY);

    Footer footer = new Footer(save, reset);
    footer.getStyle().set("padding", "var(--lumo-space-wide-m)");
    add(footer);
  }

  public static class Exporter extends DemoExporter<ScrollerBasic> { // hidden-source-line
  } // hidden-source-line
}
