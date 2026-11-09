package com.vaadin.demo.buildingapps.mvp;

import java.util.Objects;

import com.vaadin.demo.buildingapps.mvvm.Ticket;
import com.vaadin.demo.buildingapps.mvvm.TicketService;

// tag::full[]
class TicketsPresenter {

    private final TicketService ticketService;
    private final TicketsView view;

    private String searchText = "";
    // The ticket in the editor, as last saved
    private Ticket opened;
    // The ticket in the editor, with the user's changes
    private Ticket draft;
    // The ticket that the user selected while there were unsaved changes
    private Ticket pending;

    TicketsPresenter(TicketService ticketService, TicketsView view) {
        this.ticketService = ticketService;
        this.view = view;
    }

    void refresh() {
        view.showTickets(ticketService.search(searchText, null));
    }

    void search(String text) {
        searchText = text;
        refresh();
    }

    // tag::select[]
    void select(Ticket ticket) {
        if (hasUnsavedChanges()) {
            pending = ticket;
            view.confirmDiscard();
        } else {
            open(ticket);
        }
    }

    void discardChanges() {
        open(pending);
    }

    void keepEditing() {
        pending = null;
        view.selectTicket(opened);
    }
    // end::select[]

    // tag::update[]
    void titleChanged(String title) {
        draft = draft.withTitle(title);
        updateEditor();
    }

    void save() {
        if (!canSave()) {
            return;
        }
        open(ticketService.save(draft));
        refresh();
        view.showSaved();
    }

    boolean hasUnsavedChanges() {
        return !Objects.equals(draft, opened);
    }

    private void open(Ticket ticket) {
        pending = null;
        opened = ticket;
        draft = ticket;
        view.selectTicket(ticket);
        view.showTicket(ticket);
        updateEditor();
    }

    // Every change to the draft has to end here, or the editor goes stale
    private void updateEditor() {
        view.showTitleError(titleError());
        view.setSaveEnabled(canSave());
    }

    private String titleError() {
        return draft != null && draft.title().isBlank() ? "Title is required"
                : null;
    }

    private boolean canSave() {
        return hasUnsavedChanges() && titleError() == null;
    }
    // end::update[]
}
// end::full[]
