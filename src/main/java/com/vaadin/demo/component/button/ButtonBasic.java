package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-basic")
public class ButtonBasic extends Div {
    private int counter = 0;

    public ButtonBasic() {
        // tag::snippet[]
        Button button = new Button("Button");
        Paragraph info = new Paragraph(infoText());
        button.addClickListener(clickEvent -> {
            counter += 1;
            info.setText(infoText());
        });
        // end::snippet[]

        HorizontalLayout horizontalLayout = new HorizontalLayout(button, info);
        horizontalLayout.setAlignItems(FlexComponent.Alignment.BASELINE);
        add(horizontalLayout);
    }

    private String infoText() {
        return String.format("Clicked %d times", counter);
    }

    public static class Exporter extends DemoExporter<ButtonBasic> { // hidden-source-line
    } // hidden-source-line
}
