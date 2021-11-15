package com.vaadin.demo.component.progressbar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.progressbar.ProgressBar;
import com.vaadin.flow.router.Route;

@Route("progress-bar-basic")
public class ProgressBarBasic extends Div {

    public ProgressBarBasic() {
        // tag::snippet[]
        ProgressBar progressBar = new ProgressBar();
        progressBar.setValue(0.5);
        add(progressBar);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<ProgressBarBasic> { // hidden-source-line
    } // hidden-source-line
}
