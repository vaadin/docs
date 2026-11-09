package com.vaadin.demo.buildingapps.mvp;

import java.util.List;

import com.vaadin.demo.buildingapps.mvvm.Ticket;

// tag::full[]
// What the presenter can do to the view. Knows nothing about Vaadin.
interface TicketsView {

    void showTickets(List<Ticket> tickets);

    void selectTicket(Ticket ticket);

    // Shows the ticket in the editor, or hides the editor when null
    void showTicket(Ticket ticket);

    void showTitleError(String error);

    void setSaveEnabled(boolean enabled);

    // Asks the user whether to discard the changes. The view passes the
    // answer to discardChanges() or keepEditing() of the presenter.
    void confirmDiscard();

    void showSaved();
}
// end::full[]
