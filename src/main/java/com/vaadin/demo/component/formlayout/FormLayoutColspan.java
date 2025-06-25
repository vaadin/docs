package com.vaadin.demo.component.formlayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.formlayout.FormLayout.FormRow;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;

@Route("form-layout-colspan")
public class FormLayoutColspan extends Div {

    public FormLayoutColspan() {
        // tag::snippet[]
        TextField streetAddress = new TextField("Street address");
        TextField postalCode = new TextField("Postal code");
        TextField city = new TextField("City/Town");
        TextField country = new TextField("Country");

        FormLayout formLayout = new FormLayout();
        formLayout.setAutoResponsive(true);
        formLayout.setExpandFields(true);
        formLayout.setColumnWidth("8em");

        FormRow firstRow = new FormRow();
        firstRow.add(streetAddress, 3); // colspan 3

        FormRow secondRow = new FormRow();
        secondRow.add(postalCode);
        secondRow.add(city, 2); // colspan 2

        FormRow thirdRow = new FormRow();
        thirdRow.add(country, 2); // colspan 2

        formLayout.add(firstRow, secondRow, thirdRow);
        // end::snippet[]

        formLayout.setWidthFull();
        SplitLayout splitLayout = new SplitLayout(formLayout, new Div());
        add(splitLayout);
    }

    public static class Exporter extends DemoExporter<FormLayoutColspan> { // hidden-source-line
    } // hidden-source-line
}
