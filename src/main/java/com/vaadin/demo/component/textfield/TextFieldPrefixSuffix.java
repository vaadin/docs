package com.vaadin.demo.component.textfield;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("text-field-prefix-suffix")
public class TextFieldPrefixSuffix extends HorizontalLayout {

  public TextFieldPrefixSuffix() {
    setPadding(false);

    // tag::snippet[]
    TextField username = new TextField();
    username.setPrefixComponent(VaadinIcon.USER.create());
    username.setLabel("Username");
    username.setValue("maverick");
    add(username);

    TextField email = new TextField();
    email.setSuffixComponent(new Div(new Text("@example.com")));
    email.setLabel("Email Address");
    email.setValue("michael");
    email.addThemeVariants(TextFieldVariant.LUMO_ALIGN_RIGHT);
    email.setMaxLength(7);
    add(email);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TextFieldPrefixSuffix> { // hidden-source-line
  } // hidden-source-line
}
