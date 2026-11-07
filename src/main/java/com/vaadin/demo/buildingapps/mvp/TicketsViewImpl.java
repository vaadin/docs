package com.vaadin.demo.buildingapps.mvp;

import java.util.List;

import com.vaadin.demo.buildingapps.mvvm.Ticket;
import com.vaadin.demo.buildingapps.mvvm.TicketService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.confirmdialog.ConfirmDialog;
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

// tag::full[]
// tag::create[]
@Route("building-apps/mvp/tickets")
class TicketsViewImpl extends HorizontalLayout
        implements TicketsView, AfterNavigationObserver, BeforeLeaveObserver {

    private final TicketsPresenter presenter;

    private final Grid<Ticket> grid = new Grid<>();
    private final TextField title = new TextField("Title");
    private final Button save = new Button("Save");
    private final VerticalLayout editor = new VerticalLayout(title, save);

    public TicketsViewImpl(TicketService ticketService) {
        presenter = new TicketsPresenter(ticketService, this);

        TextField search = new TextField("Search");
        search.setValueChangeMode(ValueChangeMode.LAZY);
        search.addValueChangeListener(
                event -> presenter.search(event.getValue()));

        grid.addColumn(Ticket::title).setHeader("Title");
        grid.addColumn(Ticket::status).setHeader("Status");
        grid.asSingleSelect().addValueChangeListener(event -> {
            if (event.isFromClient()) { // Not when the presenter selects
                presenter.select(event.getValue());
            }
        });

        title.setValueChangeMode(ValueChangeMode.EAGER);
        title.setManualValidation(true);
        title.addValueChangeListener(event -> {
            if (event.isFromClient()) { // Not when the presenter sets it
                presenter.titleChanged(event.getValue());
            }
        });

        save.addThemeVariants(ButtonVariant.PRIMARY);
        save.addClickListener(event -> presenter.save());
        editor.setVisible(false);

        setSizeFull();
        add(new VerticalLayout(search, grid), editor);
    }
    // end::create[]

    @Override
    public void afterNavigation(AfterNavigationEvent event) {
        presenter.refresh();
    }

    // tag::implement[]
    @Override
    public void showTickets(List<Ticket> tickets) {
        Ticket selected = grid.asSingleSelect().getValue();
        grid.setItems(tickets).setIdentifierProvider(Ticket::id);
        // Setting the items clears the selection
        grid.asSingleSelect().setValue(selected);
    }

    @Override
    public void selectTicket(Ticket ticket) {
        grid.asSingleSelect().setValue(ticket);
    }

    @Override
    public void showTicket(Ticket ticket) {
        editor.setVisible(ticket != null);
        title.setValue(ticket == null ? "" : ticket.title());
    }

    @Override
    public void showTitleError(String error) {
        title.setInvalid(error != null);
        title.setErrorMessage(error);
    }

    @Override
    public void setSaveEnabled(boolean enabled) {
        save.setEnabled(enabled);
    }

    @Override
    public void confirmDiscard() {
        new ConfirmDialog("Unsaved changes",
                "Discard your changes to this ticket?", "Discard",
                confirm -> presenter.discardChanges(), "Keep editing",
                cancel -> presenter.keepEditing()).open();
    }

    @Override
    public void showSaved() {
        Notification.show("Ticket saved");
    }
    // end::implement[]

    @Override
    public void beforeLeave(BeforeLeaveEvent event) {
        if (presenter.hasUnsavedChanges()) {
            ContinueNavigationAction navigation = event.postpone();
            new ConfirmDialog("Unsaved changes",
                    "Leave and discard your changes?", "Leave",
                    confirm -> navigation.proceed(), "Stay",
                    cancel -> navigation.cancel()).open();
        }
    }
}
// end::full[]
