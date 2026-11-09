package com.vaadin.demo.buildingapps.mvvm;

// tag::full[]
import static com.vaadin.demo.buildingapps.mvvm.SignalBindings.bindError;
import static com.vaadin.demo.buildingapps.mvvm.SignalBindings.bindItems;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.confirmdialog.ConfirmDialog;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.AfterNavigationEvent;
import com.vaadin.flow.router.AfterNavigationObserver;
import com.vaadin.flow.router.BeforeLeaveEvent;
import com.vaadin.flow.router.BeforeLeaveEvent.ContinueNavigationAction;
import com.vaadin.flow.router.BeforeLeaveObserver;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.signals.Signal;

// tag::create[]
@Route("building-apps/mvvm/tickets")
class TicketsView extends HorizontalLayout
        implements AfterNavigationObserver, BeforeLeaveObserver {

    private final TicketsViewModel viewModel;

    public TicketsView(TicketService ticketService) {
        viewModel = new TicketsViewModel(ticketService);
        setSizeFull();
        add(createList(), createEditor());
        createDiscardDialog();
    }

    @Override
    public void afterNavigation(AfterNavigationEvent event) {
        viewModel.refresh();
    }
    // end::create[]

    // tag::list[]
    private VerticalLayout createList() {
        TextField search = new TextField("Search");
        search.setValueChangeMode(ValueChangeMode.LAZY);
        search.bindValue(viewModel.searchText(), viewModel::search);

        ComboBox<Status> statusFilter = new ComboBox<>("Status",
                Status.values());
        statusFilter.setClearButtonVisible(true);
        statusFilter.bindValue(viewModel.statusFilter(),
                viewModel::filterByStatus);

        Grid<Ticket> grid = new Grid<>();
        grid.addColumn(Ticket::title).setHeader("Title");
        grid.addColumn(Ticket::status).setHeader("Status");
        grid.addColumn(Ticket::assignee).setHeader("Assignee");
        bindItems(grid, viewModel.tickets()).setIdentifierProvider(Ticket::id);
        grid.asSingleSelect().bindValue(viewModel.selected(),
                viewModel::select);

        return new VerticalLayout(new HorizontalLayout(search, statusFilter),
                grid);
    }
    // end::list[]

    // tag::editor[]
    private VerticalLayout createEditor() {
        TextField title = new TextField("Title");
        title.setValueChangeMode(ValueChangeMode.EAGER);
        title.bindValue(viewModel.title(), viewModel::setTitle);
        bindError(title, viewModel.titleError());

        ComboBox<Status> status = new ComboBox<>("Status", Status.values());
        status.bindValue(viewModel.status(), viewModel::setStatus);

        TextField assignee = new TextField("Assignee");
        assignee.setValueChangeMode(ValueChangeMode.EAGER);
        assignee.bindValue(viewModel.assignee(), viewModel::setAssignee);

        Button save = new Button("Save", event -> {
            if (viewModel.save()) {
                Notification.show("Ticket saved");
            }
        });
        save.addThemeVariants(ButtonVariant.PRIMARY);
        save.bindEnabled(viewModel.canSave());

        Button discard = new Button("Discard",
                event -> viewModel.discardChanges());
        discard.bindEnabled(viewModel.dirty());

        VerticalLayout editor = new VerticalLayout(
                new FormLayout(title, status, assignee),
                new HorizontalLayout(save, discard));
        editor.bindVisible(viewModel.editing());
        return editor;
    }
    // end::editor[]

    // tag::dialog[]
    private void createDiscardDialog() {
        ConfirmDialog dialog = new ConfirmDialog();
        dialog.setHeader("Unsaved changes");
        dialog.setText("Discard your changes to this ticket?");
        dialog.setConfirmButton("Discard", event -> viewModel.discardChanges());
        dialog.setCancelable(true);
        dialog.setCancelButton("Keep editing",
                event -> viewModel.keepEditing());
        Signal.effect(this,
                () -> dialog.setOpened(viewModel.confirmingDiscard().get()));
    }
    // end::dialog[]

    // tag::leave[]
    @Override
    public void beforeLeave(BeforeLeaveEvent event) {
        if (viewModel.dirty().peek()) {
            ContinueNavigationAction navigation = event.postpone();
            new ConfirmDialog("Unsaved changes",
                    "Leave and discard your changes?", "Leave",
                    confirm -> navigation.proceed(), "Stay",
                    cancel -> navigation.cancel()).open();
        }
    }
    // end::leave[]
}
// end::full[]
