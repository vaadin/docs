package com.vaadin.demo.component.formlayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;

@Route("form-layout-side")
public class FormLayoutSide extends Div {

  public FormLayoutSide() {
    TextField revenue = new TextField();
    revenue.setSuffixComponent(new Span("EUR"));

    TextField expenses = new TextField();
    expenses.setSuffixComponent(new Span("EUR"));

    TextField invoices = new TextField();
    invoices.setSuffixComponent(new Span("EUR"));

    FormLayout formLayout = new FormLayout();
    // tag::snippet[]
    // Use addFormItem instead of add, to wrap fields into form items,
    // which displays labels on the side by default
    formLayout.addFormItem(revenue, "Revenue");
    formLayout.addFormItem(expenses, "Expenses");
    formLayout.addFormItem(invoices, "Invoices");
    // end::snippet[]
    add(formLayout);
  }
  public static class Exporter extends DemoExporter<FormLayoutSide> { // hidden-source-line
  } // hidden-source-line
}
