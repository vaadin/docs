package com.vaadin.demo.component.splitlayout;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("split-layout-toggle")
public class SplitLayoutToggle extends Div {
    private boolean sidebarCollapsed;
    private final Button button;
    private final Icon leftArrowIcon;
    private final Icon rightArrowIcon;
    private final SplitLayout splitLayout;

    public SplitLayoutToggle() {
        // tag::snippet[]
        button = new Button();
        leftArrowIcon = VaadinIcon.ARROW_LEFT.create();
        rightArrowIcon = VaadinIcon.ARROW_RIGHT.create();
        Div masterContainer = new Div();
        DetailContent detailContent = new DetailContent();
        MasterContent masterContent = new MasterContent();

        sidebarCollapsed = false;

        button.addClickListener(event -> {
            sidebarCollapsed = !sidebarCollapsed;
            updateSidebar();
        });
        button.getElement().setAttribute("aria-label", "Expand/collapse sidebar");
        button.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        button.getStyle().set("float", "right");

        masterContainer.add(button, masterContent);
        masterContainer.getStyle().set("overflow", "hidden");

        splitLayout = new SplitLayout(masterContainer, detailContent);

        updateSidebar();
        // end::snippet[]

        splitLayout.setMaxHeight("280px");
        add(splitLayout);
    }

    // tag::setstyles[]
    private void updateSidebar() {
        button.setIcon(sidebarCollapsed ? rightArrowIcon : leftArrowIcon);
        splitLayout.setSplitterPosition(sidebarCollapsed ? 13 : 40);
    }
    // end::setstyles[]

    public static class Exporter extends DemoExporter<SplitLayoutToggle> { // hidden-source-line
    } // hidden-source-line
}
