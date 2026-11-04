package com.vaadin.demo.buildingapps.mvvm;

// tag::full[]
import java.util.List;
import java.util.Objects;

import com.vaadin.flow.signals.Signal;
import com.vaadin.flow.signals.local.ValueSignal;

/**
 * The state and behavior of the ticket triage view: which tickets are listed,
 * which one is open in the editor, and whether its changes can be saved.
 */
// tag::class[]
class TicketsViewModel {

    private final TicketService ticketService; // The Model

    // end::class[]
    // tag::state[]
    private final ValueSignal<String> searchText = new ValueSignal<>("");
    private final ValueSignal<Status> statusFilter = new ValueSignal<>(null);
    private final ValueSignal<List<Ticket>> tickets = new ValueSignal<>(
            List.of());
    // The row the user selected in the list
    private final ValueSignal<Ticket> selected = new ValueSignal<>(null);
    // The ticket in the editor, as last saved
    private final ValueSignal<Ticket> opened = new ValueSignal<>(null);
    // The ticket in the editor, with the user's edits
    private final ValueSignal<Ticket> draft = new ValueSignal<>(null);
    // end::state[]

    // tag::derived[]
    private final Signal<Boolean> editing = draft.map(Objects::nonNull);
    private final Signal<Boolean> dirty = Signal
            .computed(() -> !Objects.equals(draft.get(), opened.get()));
    private final Signal<Boolean> confirmingDiscard = Signal
            .computed(() -> !Objects.equals(selected.get(), opened.get()));
    private final Signal<String> titleError = draft.map(
            d -> d != null && d.title().isBlank() ? "Title is required" : null);
    private final Signal<Boolean> canSave = Signal
            .computed(() -> dirty.get() && titleError.get() == null);
    // end::derived[]

    // tag::class[]
    TicketsViewModel(TicketService ticketService) {
        this.ticketService = ticketService;
    }
    // end::class[]

    // tag::out[]
    Signal<String> searchText() {
        return searchText.asReadonly();
    }

    Signal<List<Ticket>> tickets() {
        return tickets.asReadonly();
    }

    Signal<String> title() {
        return draft.map(d -> d == null ? "" : d.title());
    }

    Signal<Boolean> canSave() {
        return canSave;
    }
    // end::out[]

    Signal<Status> statusFilter() {
        return statusFilter.asReadonly();
    }

    Signal<Ticket> selected() {
        return selected.asReadonly();
    }

    Signal<Boolean> editing() {
        return editing;
    }

    Signal<Status> status() {
        return draft.map(d -> d == null ? null : d.status());
    }

    Signal<String> assignee() {
        return draft.map(
                d -> d == null || d.assignee() == null ? "" : d.assignee());
    }

    Signal<String> titleError() {
        return titleError;
    }

    Signal<Boolean> dirty() {
        return dirty;
    }

    // True while a new selection waits for the user to keep or discard the
    // changes to the opened ticket
    Signal<Boolean> confirmingDiscard() {
        return confirmingDiscard;
    }

    // tag::commands[]
    void refresh() {
        tickets.set(
                ticketService.search(searchText.peek(), statusFilter.peek()));
    }

    void search(String text) {
        searchText.set(text == null ? "" : text);
        refresh();
    }

    void filterByStatus(Status status) {
        statusFilter.set(status);
        refresh();
    }

    void setTitle(String title) {
        draft.update(d -> d.withTitle(title));
    }
    // end::commands[]

    void setStatus(Status status) {
        draft.update(d -> d.withStatus(status));
    }

    void setAssignee(String assignee) {
        draft.update(d -> d.withAssignee(
                assignee == null || assignee.isBlank() ? null : assignee));
    }

    // tag::save[]
    // Returns whether the ticket was saved
    boolean save() {
        if (!canSave.peek()) {
            return false;
        }
        Ticket saved = ticketService.save(draft.peek());
        open(saved);
        refresh();
        return true;
    }
    // end::save[]

    // tag::select[]
    void select(Ticket ticket) {
        selected.set(ticket);
        if (!dirty.peek()) {
            open(ticket);
        }
    }

    // Throws away the changes, and opens the selected ticket
    void discardChanges() {
        open(selected.peek());
    }

    // Goes back to the opened ticket, and keeps its changes
    void keepEditing() {
        selected.set(opened.peek());
    }

    private void open(Ticket ticket) {
        selected.set(ticket);
        opened.set(ticket);
        draft.set(ticket);
    }
    // end::select[]
    // tag::class[]
}
// end::class[]
// end::full[]
