package com.vaadin.demo.buildingapps.mvvm;

// tag::full[]
import static com.vaadin.demo.buildingapps.mvvm.SignalBindings.bindItems;

import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

// One of the components that show the tickets. Each builds its own data
// provider.
class TicketList extends VerticalLayout {

    TicketList(PagedTicketsViewModel viewModel) {
        Grid<Ticket> grid = new Grid<>();
        grid.addColumn(Ticket::title).setHeader("Title");
        grid.addColumn(Ticket::status).setHeader("Status");
        bindItems(grid, viewModel.query(), viewModel::fetch, viewModel::count)
                .setIdentifierProvider(Ticket::id);
        grid.asSingleSelect().bindValue(viewModel.selected(),
                viewModel::select);
        add(grid);
    }
}
// end::full[]
