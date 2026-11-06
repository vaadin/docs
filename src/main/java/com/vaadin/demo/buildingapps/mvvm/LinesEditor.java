package com.vaadin.demo.buildingapps.mvvm;

// tag::full[]
import static com.vaadin.demo.buildingapps.mvvm.SignalBindings.bindError;

import com.vaadin.demo.buildingapps.mvvm.LinesViewModel.Line;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.IntegerField;

class LinesEditor extends VerticalLayout {

    LinesEditor(LinesViewModel viewModel) {
        // tag::rows[]
        VerticalLayout rows = new VerticalLayout();
        rows.bindChildren(viewModel.lines(), line -> {
            Span product = new Span(line.map(Line::product));
            IntegerField quantity = new IntegerField();
            quantity.setAriaLabel("Quantity");
            quantity.bindValue(line.map(Line::quantity),
                    value -> viewModel.setQuantity(line, value));
            bindError(quantity, viewModel.quantityError(line));
            Button remove = new Button("Remove",
                    event -> viewModel.removeLine(line));
            return new HorizontalLayout(product, quantity, remove);
        });
        // end::rows[]

        Span total = new Span(viewModel.total().map(t -> "Total: " + t));
        add(rows, total);
    }
}
// end::full[]
