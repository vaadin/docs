package com.vaadin.demo.component.radiobutton;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.component.radiobutton.RadioGroupVariant;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.router.Route;
import java.util.List;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.demo.domain.Card;
import com.vaadin.demo.domain.DataService;

@Route("radio-button-custom-item-presentation")
public class RadioButtonPresentation extends Div {

  public RadioButtonPresentation() {
    // tag::snippet[]
    RadioButtonGroup<Card> radioGroup = new RadioButtonGroup<>();
    radioGroup.addThemeVariants(RadioGroupVariant.LUMO_VERTICAL);
    radioGroup.setLabel("Payment method");

    List<Card> cards = DataService.getCards();
    radioGroup.setItems(cards);
    radioGroup.setValue(cards.get(0));
    radioGroup.setRenderer(new ComponentRenderer<>(card -> {
      Image logo = new Image(card.getPictureUrl(), card.getName());
      logo.setHeight("1em");
      Text number = new Text(card.getNumber());
      Text expiryDate = new Text("Expiry date:" + card.getExpiryDate());

      return new Div(new FlexLayout(logo, number), new Div(expiryDate));
    }));

    add(radioGroup);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<RadioButtonPresentation> { // hidden-full-source-line
  } // hidden-full-source-line
}
