package com.vaadin.demo.buildingapps.masterdetail;

// tag::full[]
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

// tag::scaffolding[]
@Route("building-apps/master-detail")
public class MasterDetailView extends SplitLayout
        implements HasUrlParameter<Long> {

    // tag::constructor[]
    MasterDetailView() {
        // end::scaffolding[]
        // In a real application, you'd store a reference to the master component
        // so that you can update its selection when navigating
        addToPrimary(createMaster());
        setSizeFull();
        // tag::scaffolding[]
    }
    // end::constructor[]

    // tag::setparameter[]
    @Override
    public void setParameter(BeforeEvent event, @OptionalParameter Long id) {
        // end::scaffolding[]
        // Remove the existing detail or placeholder component
        if (getSecondaryComponent() != null) {
            getSecondaryComponent().removeFromParent();
        }
        if (id == null) {
            addToSecondary(createNoDetailSelected());
            // In a real application, clear the selection in the master
            // Example: grid.deselectAll();
        } else {
            addToSecondary(createDetail(id));
            // In a real application, select the corresponding item in the master
            // Example: grid.select(itemWithThisId);
        }
        // tag::scaffolding[]
    }
    // end::setparameter[]

    // tag::master[]
    private Component createMaster() {
        // end::scaffolding[]
        // In a real application, this would be a Grid component.
        // - Selecting an item would result in a call to showDetail(id)
        // - Clearing the selection would call showMaster()
        return new VerticalLayout(
                new Button("Detail 1", e -> showDetail(1)),
                new Button("Detail 2", e -> showDetail(2)),
                new Button("Detail 3", e -> showDetail(3)),
                new Button("Master only", e -> showMaster()));
        // tag::scaffolding[]
    }
    // end::master[]

    // tag::detail[]
    private Component createDetail(long id) {
        // end::scaffolding[]
        // In a real application, this would be a form
        return new VerticalLayout(new Paragraph("Detail: " + id));
        // tag::scaffolding[]
    }
    // end::detail[]

    // tag::nodetail[]
    private Component createNoDetailSelected() {
        // end::scaffolding[]
        return new VerticalLayout(new Paragraph("No detail selected"));
        // tag::scaffolding[]
    }
    // end::nodetail[]

// tag::navigation[]
    public static void showMaster() {
        // end::scaffolding[]
        UI.getCurrent().navigate(MasterDetailView.class);
        // tag::scaffolding[]
    }

    public static void showDetail(long id) {
        // end::scaffolding[]
        UI.getCurrent().navigate(MasterDetailView.class, id);
        // tag::scaffolding[]
    }
// end::navigation[]
}
// end::scaffolding[]
// end::full[]