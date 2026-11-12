package com.vaadin.demo.buildingapps.mvvm;

// tag::full[]
// What the ticket list shows: the filter, and how often the data has changed
record TicketQuery(String text, long revision) {

    TicketQuery withText(String text) {
        return new TicketQuery(text, revision);
    }

    TicketQuery nextRevision() {
        return new TicketQuery(text, revision + 1);
    }
}
// end::full[]
