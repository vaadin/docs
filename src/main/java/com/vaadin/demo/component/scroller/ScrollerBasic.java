package com.vaadin.demo.component.scroller;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.Scroller;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;

@Route("scroller-basic")
public class ScrollerBasic extends Div {

  public ScrollerBasic() {
    setWidth("calc(var(--lumo-size-l) * 8)");
    getStyle().set("font-family", "var(--lumo-font-family)");
    getStyle().set("border", "1px solid var(--lumo-contrast-20pct)");

    // Header
    FlexLayout header = new FlexLayout();
    header.getStyle().set("border-bottom", "1px solid var(--lumo-contrast-20pct)");
    header.getStyle().set("padding", "var(--lumo-space-m)");
    header.setAlignItems(FlexComponent.Alignment.CENTER);

    Span headerText = new Span("Edit Employee");
    headerText.getStyle().set("font-size", "var(--lumo-font-size-l)");

    Icon arrowLeft = new Icon(VaadinIcon.ARROW_LEFT);
    arrowLeft.getStyle().set("height", "var(--lumo-font-size-m)");
    arrowLeft.getStyle().set("cursor", "pointer");
    arrowLeft.getStyle().set("margin-right", "var(--lumo-space-m)");
    arrowLeft.getStyle().set("color", "var(--lumo-tertiary-text-color)");

    header.add(arrowLeft, headerText);
    add(header);

    // tag::snippet[]
    // NOTE
    // We are using inline styles here to keep the example simple.
    // We recommend placing CSS in a separate style sheet and to
    // encapsulating the styling in a new component.
    Scroller scroller = new Scroller();
    scroller.setScrollDirection(Scroller.ScrollDirection.VERTICAL);

    scroller.setHeight("320px");
    scroller.getStyle().set("padding", "var(--lumo-space-m)");

    Paragraph personalInformation = new Paragraph("Personal information");
    personalInformation.getStyle().set("font-size", "var(--lumo-font-size-l)");
    personalInformation.getStyle().set("margin-top", "var(--lumo-space-s)");

    TextField firstName = new TextField("First name");
    firstName.setWidthFull();

    TextField lastName = new TextField("Last name");
    lastName.setWidthFull();

    DatePicker birthDate = new DatePicker("Birthdate");
    birthDate.setWidthFull();
    birthDate.setInitialPosition(LocalDate.of(1990, 1, 1));

    Paragraph employmentInformation = new Paragraph("Employment");
    employmentInformation.getStyle().set("font-size", "var(--lumo-font-size-l)");

    TextField position = new TextField("Position");
    position.setWidthFull();

    TextArea additionalInformation = new TextArea("Additional Information");
    additionalInformation.setWidthFull();

    Div container = new Div();
    container.add(personalInformation, firstName, lastName, birthDate,
            employmentInformation, position, additionalInformation);

    scroller.setContent(container);

    add(scroller);
    // end::snippet[]

    // Footer
    Div footer = new Div();
    footer.getStyle().set("border-top", "1px solid var(--lumo-contrast-20pct)");
    footer.getStyle().set("padding", "var(--lumo-space-wide-m)");

    Button saveBtn = new Button("Save");
    saveBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY, ButtonVariant.LUMO_ICON);
    saveBtn.getStyle().set("margin-right", "var(--lumo-space-s)");

    Button resetBtn = new Button("Reset");
    resetBtn.addThemeVariants(ButtonVariant.LUMO_TERTIARY);

    footer.add(saveBtn, resetBtn);
    add(footer);
  }

  public static class Exporter extends DemoExporter<ScrollerBasic> { // hidden-full-source-line
  } // hidden-full-source-line
}
