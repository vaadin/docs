package com.vaadin.demo.component.formlayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
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
        formLayout.addFormRow(streetAddress);
        formLayout.add(streetAddress, 3);
        formLayout.add(postalCode);
        formLayout.add(city, 2);
        formLayout.add(country, 2);
        // end::snippet[]
        add(formLayout);
    }

    public static class Exporter extends DemoExporter<FormLayoutColspan> { // hidden-source-line
    } // hidden-source-line
}
