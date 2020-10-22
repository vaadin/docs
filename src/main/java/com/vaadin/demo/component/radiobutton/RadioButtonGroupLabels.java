package com.vaadin.demo.component.radiobutton;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.component.radiobutton.RadioGroupVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("radio-button-group-labels")
public class RadioButtonGroupLabels extends Div {

  public RadioButtonGroupLabels() {
    VerticalLayout layout = new VerticalLayout();
    layout.setPadding(false);
    layout.setSpacing(false);
    // tag::snippet[]
    RadioButtonGroup<String> jobTitleGroup = new RadioButtonGroup<>();
    jobTitleGroup.addThemeVariants(RadioGroupVariant.LUMO_VERTICAL);
    jobTitleGroup.setLabel("Job title");
    jobTitleGroup.setItems("Analyst", "Administrator", "Engineer");
    jobTitleGroup.setValue("Analyst");
    layout.add(jobTitleGroup);

    RadioButtonGroup<String> deparmentGroup = new RadioButtonGroup<>();
    deparmentGroup.addThemeVariants(RadioGroupVariant.LUMO_VERTICAL);
    deparmentGroup.setLabel("Department");
    deparmentGroup.setItems("Engineering", "Human Resources", "Marketing");
    deparmentGroup.setValue("Engineering");
    layout.add(deparmentGroup);

    add(layout);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<RadioButtonGroupLabels> { // hidden-full-source-line
  } // hidden-full-source-line
}
