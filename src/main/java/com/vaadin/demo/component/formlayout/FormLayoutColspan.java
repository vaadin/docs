package com.vaadin.demo.component.formlayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.formlayout.FormLayout;
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

        formLayout.addFormRow(streetAddress);
        formLayout.addFormRow(postalCode, city);
        formLayout.addFormRow(country);

        formLayout.setColspan(streetAddress, 3);
        formLayout.setColspan(city, 2);
        formLayout.setColspan(country, 2);
        // end::snippet[]

        formLayout.setWidthFull();
        SplitLayout splitLayout = new SplitLayout(formLayout, new Div());
        add(splitLayout);
    }

    public static class Exporter extends DemoExporter<FormLayoutColspan> { // hidden-source-line
    } // hidden-source-line
}
