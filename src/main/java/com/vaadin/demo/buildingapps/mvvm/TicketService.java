package com.vaadin.demo.buildingapps.mvvm;

// tag::full[]
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentSkipListMap;

import org.springframework.stereotype.Service;

/**
 * Keeps the tickets in memory. In a real application, the service would store
 * them in a database through a repository.
 */
@Service
public class TicketService {

    private final Map<Long, Ticket> store = new ConcurrentSkipListMap<>();

    public TicketService() {
        save(new Ticket(1, "Printer on fire", Status.OPEN, null));
        save(new Ticket(2, "Password reset", Status.IN_PROGRESS, "Ada"));
        save(new Ticket(3, "VPN drops hourly", Status.OPEN, null));
    }

    public List<Ticket> search(String text, Status status) {
        return store.values().stream().filter(
                t -> t.title().toLowerCase().contains(text.toLowerCase()))
                .filter(t -> status == null || t.status() == status).toList();
    }

    public List<Ticket> search(String text, int offset, int limit) {
        return search(text, null).stream().skip(offset).limit(limit).toList();
    }

    public int count(String text) {
        return search(text, null).size();
    }

    public Ticket save(Ticket ticket) {
        store.put(ticket.id(), ticket);
        return ticket;
    }
}
// end::full[]
