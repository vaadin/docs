package com.vaadin.demo.component.icons;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.SvgIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.streams.DownloadHandler;

@Route("svg-sprites")
public class SvgSprites extends Div {

    public SvgSprites() {
        HorizontalLayout layout = new HorizontalLayout();
        layout.setSpacing(true);
        layout.addClassName("items-center");

        // tag::snippet[]
        DownloadHandler iconHandler = DownloadHandler.forClassResource(
                getClass(), "/icons/solid.svg", "solid.svg");

        SvgIcon codeBranchIcon = new SvgIcon(iconHandler, "code-branch");
        SvgIcon userIcon = new SvgIcon(iconHandler, "user");
        // end::snippet[]

        layout.add(codeBranchIcon, userIcon);
        add(layout);
    }

    public static class Exporter extends DemoExporter<SvgSprites> { // hidden-source-line
    } // hidden-source-line
}
