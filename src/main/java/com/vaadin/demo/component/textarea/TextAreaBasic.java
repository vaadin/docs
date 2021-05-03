package com.vaadin.demo.component.textarea;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("text-area-basic")
public class TextAreaBasic extends Div {

  public TextAreaBasic() {
    int charLimit = 140;

    // tag::snippet[]
    TextArea textArea = new TextArea();
    textArea.setLabel("Comment");
    textArea.setMaxLength(charLimit);
    textArea.setValueChangeMode(ValueChangeMode.EAGER);
    textArea.addValueChangeListener(e -> {
      e.getSource().setHelperText(e.getValue().length() + "/" + charLimit);
    });
    textArea.setValue("Great job. This is excellent!");
    add(textArea);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TextAreaBasic> { // hidden-source-line
  } // hidden-source-line
}
