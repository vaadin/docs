package com.vaadin.demo.buildingapps.masterdetail;

// tag::full[]
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.masterdetaillayout.MasterDetailLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.signals.Signal;
import com.vaadin.flow.signals.local.ValueSignal;

@Route("building-apps/master-detail")
public class MasterDetailView extends MasterDetailLayout {

    // tag::signal[]
    // The selected item's id; null means nothing is selected.
    private final ValueSignal<Integer> selectedId = new ValueSignal<>(null);
    // end::signal[]

    MasterDetailView() {
        setSizeFull();

        // tag::viewlogic[]
        setMaster(createMaster());

        // Shown in the detail area when nothing is selected.
        setDetailPlaceholder(new Paragraph("No detail selected"));

        // Derive the detail from the selection. This effect re-runs whenever
        // selectedId changes: it shows the detail for the selected item, or
        // clears it - revealing the placeholder - when there's no selection.
        Paragraph detail = new Paragraph();
        Signal.effect(this, () -> {
            Integer id = selectedId.get();
            if (id != null) {
                detail.setText("Detail: " + id);
                setDetail(detail);
            } else {
                setDetail(null);
            }
        });

        // In overlay mode, clear the selection when the user dismisses the
        // detail by clicking outside it or pressing Escape.
        addBackdropClickListener(event -> selectedId.set(null));
        addDetailEscapePressListener(event -> selectedId.set(null));
        // end::viewlogic[]
    }

    // tag::master[]
    private Component createMaster() {
        // In a real application, this would be a Grid. Selecting an item would
        // set selectedId; clearing the selection would set it to null.
        return new VerticalLayout(
                new Button("Detail 1", e -> selectedId.set(1)),
                new Button("Detail 2", e -> selectedId.set(2)),
                new Button("Detail 3", e -> selectedId.set(3)),
                new Button("Master only", e -> selectedId.set(null)));
    }
    // end::master[]
}
// end::full[]
