package com.vaadin.demo.component.radiobutton;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.component.radiobutton.RadioGroupVariant;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.router.Route;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.demo.domain.Card;
import com.vaadin.demo.domain.DataService;

@Route("radio-button-custom-option")
public class RadioButtonCustomOption extends Div {

  private final String IMAGES_PATH = "../../../vaadin/images/";

  public RadioButtonCustomOption() {
    // tag::snippet[]
    RadioButtonGroup<Card> radioGroup = new RadioButtonGroup<>();
    radioGroup.addThemeVariants(RadioGroupVariant.LUMO_VERTICAL);
    radioGroup.setLabel("Payment method");

    List<Card> items = new ArrayList<>(DataService.getCards());
    items.add(null);
    radioGroup.setItems(items);
    radioGroup.setRenderer(new ComponentRenderer<>(card -> {
      if (card != null) {

        Image logo = new Image(IMAGES_PATH + card.getImage(), card.getName());
        logo.setHeight("1em");
        Text number = new Text(card.getNumber());

        return new FlexLayout(logo, number);
      } else {
        return new Text("Other");
      }
    }));

    TextField textField = new TextField("Card number");
    textField.setVisible(false);
    radioGroup.addValueChangeListener(e -> textField.setVisible(e.getValue() == null));

    VerticalLayout layout = new VerticalLayout();
    layout.setPadding(false);
    layout.setSpacing(false);
    layout.add(radioGroup, textField);
    add(layout);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<RadioButtonCustomOption> { // hidden-full-source-line
  } // hidden-full-source-line
}
