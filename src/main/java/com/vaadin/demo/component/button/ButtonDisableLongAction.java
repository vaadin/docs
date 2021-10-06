package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-disable-long-action")
public class ButtonDisableLongAction extends Div {
    public ButtonDisableLongAction() {
        // tag::snippet[]
        Button button = new Button("Perform Action");
        FakeProgressBar progressBar = new FakeProgressBar();
        button.setDisableOnClick(true);
        button.addClickListener(event -> progressBar.simulateProgress());

        progressBar.addProgressEndListener(event -> {
            button.setEnabled(true);
        });
        // end::snippet[]

        button.getStyle().set("flex", "none");
        HorizontalLayout horizontalLayout = new HorizontalLayout(button, progressBar);
        horizontalLayout.setAlignItems(FlexComponent.Alignment.CENTER);
        add(horizontalLayout);
    }

    public static class Exporter extends DemoExporter<ButtonDisableLongAction> { // hidden-source-line
    } // hidden-source-line
}
