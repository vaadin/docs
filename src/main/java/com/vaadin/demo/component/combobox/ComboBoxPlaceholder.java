package com.vaadin.demo.component.combobox;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.State;

@Route("combo-box-placeholder")
public class ComboBoxPlaceholder extends Div {

  public ComboBoxPlaceholder() {
    // tag::snippet[]
    ComboBox<State> comboBox = new ComboBox<>("State");
    comboBox.setItems(DataService.getStates());
    comboBox.setItemLabelGenerator(State::getName);

    add(comboBox);
    // end::snippet[]
  }

  public static class GridEditorExporter extends DemoExporter<ComboBoxPlaceholder> { // hidden-full-source-line
  } // hidden-full-source-line
}
