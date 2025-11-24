package com.vaadin.demo.component.icons;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.SvgIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.streams.DownloadHandler;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("svg-sprites")
public class SvgSprites extends Div {

    public SvgSprites() {
        HorizontalLayout layout = new HorizontalLayout();
        layout.setSpacing(true);
        layout.setAlignItems(FlexComponent.Alignment.CENTER);

        // tag::snippet[]
        SvgIcon codeBranchIcon = new SvgIcon("/icons/solid.svg", "code-branch");
        SvgIcon userIcon = new SvgIcon("/icons/solid.svg", "user");
        // end::snippet[]

        layout.add(codeBranchIcon, userIcon);
        add(layout);
    }

    public static class Exporter extends DemoExporter<SvgSprites> { // hidden-source-line
    } // hidden-source-line
}
