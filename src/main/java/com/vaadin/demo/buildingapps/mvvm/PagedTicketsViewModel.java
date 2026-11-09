package com.vaadin.demo.buildingapps.mvvm;

// tag::full[]
import java.util.stream.Stream;

import com.vaadin.flow.signals.Signal;
import com.vaadin.flow.signals.local.ValueSignal;

class PagedTicketsViewModel {

    private final TicketService ticketService;

    private final ValueSignal<TicketQuery> query = new ValueSignal<>(
            new TicketQuery("", 0));
    private final ValueSignal<Ticket> selected = new ValueSignal<>(null);
    private final Signal<Boolean> canResolve = selected
            .map(t -> t != null && t.status() != Status.RESOLVED);

    PagedTicketsViewModel(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    // Changes whenever the list's contents would: a new filter or a saved
    // ticket
    Signal<TicketQuery> query() {
        return query.asReadonly();
    }

    Signal<String> searchText() {
        return query.map(TicketQuery::text);
    }

    Signal<Ticket> selected() {
        return selected.asReadonly();
    }

    Signal<Boolean> canResolve() {
        return canResolve;
    }

    Stream<Ticket> fetch(int offset, int limit) {
        return ticketService.search(query.peek().text(), offset, limit)
                .stream();
    }

    int count() {
        return ticketService.count(query.peek().text());
    }

    void search(String text) {
        query.update(q -> q.withText(text == null ? "" : text));
    }

    void select(Ticket ticket) {
        selected.set(ticket);
    }

    void resolveSelected() {
        if (!canResolve.peek()) {
            return;
        }
        Ticket saved = ticketService
                .save(selected.peek().withStatus(Status.RESOLVED));
        selected.set(saved);
        query.update(TicketQuery::nextRevision);
    }
}
// end::full[]
