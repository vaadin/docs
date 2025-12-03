package com.vaadin.demo.buildingapps.masterdetail;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.router.HasUrlParameter;
import com.vaadin.flow.router.OptionalParameter;
import com.vaadin.flow.router.Route;

// tag::snippet[]
@Route("building-apps/master-detail")
public class MasterDetailView extends SplitLayout
        implements HasUrlParameter<Long> {

    MasterDetailView() {
        addToPrimary(createMaster());
        setSizeFull();
    }

    @Override
    public void setParameter(BeforeEvent event, @OptionalParameter Long id) {
        if (getSecondaryComponent() != null) {
            getSecondaryComponent().removeFromParent();
        }
        if (id == null) {
            addToSecondary(createNoDetailSelected());
        } else {
            addToSecondary(createDetail(id));
        }
    }

    private Component createMaster() {
        return new VerticalLayout(
                new Button("Detail 1", e -> showDetail(1)),
                new Button("Detail 2", e -> showDetail(2)),
                new Button("Detail 3", e -> showDetail(3)),
                new Button("Master only", e -> showMaster()));
    }

    private Component createDetail(long id) {
        return new VerticalLayout(new Paragraph("Detail: " + id));
    }

    private Component createNoDetailSelected() {
        return new VerticalLayout(new Paragraph("No detail selected"));
    }

    public static void showMaster() {
        UI.getCurrent().navigate(MasterDetailView.class);
    }

    public static void showDetail(long id) {
        UI.getCurrent().navigate(MasterDetailView.class, id);
    }
}
// end::snippet[]