package com.vaadin.demo.component.radiobutton;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.component.radiobutton.RadioGroupVariant;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.router.Route;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Base64;
import java.util.List;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.demo.domain.Card;
import com.vaadin.demo.domain.DataService;

@Route("radio-button-custom-item-presentation")
public class RadioButtonPresentation extends Div {

  private final String IMAGES_PATH = "frontend/images/";

  public RadioButtonPresentation() {
    // tag::snippet[]
    RadioButtonGroup<Card> radioGroup = new RadioButtonGroup<>();
    radioGroup.addThemeVariants(RadioGroupVariant.LUMO_VERTICAL);
    radioGroup.setLabel("Payment method");

    List<Card> cards = DataService.getCards();
    radioGroup.setItems(cards);
    radioGroup.setValue(cards.get(0));
    radioGroup.setRenderer(new ComponentRenderer<>(card -> {
      String url = "";
      try {
        File sourceimage = new File(IMAGES_PATH + card.getImage());
        byte[] fileContent = Files.readAllBytes(sourceimage.toPath());
        url = "data:image/png;base64," + Base64.getEncoder().encodeToString(fileContent);
      } catch (IOException e) {
        e.printStackTrace();
      }

      Image logo = new Image(url, card.getName());
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
