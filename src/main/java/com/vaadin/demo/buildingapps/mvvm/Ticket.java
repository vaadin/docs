package com.vaadin.demo.buildingapps.mvvm;

// tag::full[]
public record Ticket(long id, String title, Status status, String assignee) {

    public Ticket withTitle(String title) {
        return new Ticket(id, title, status, assignee);
    }

    public Ticket withStatus(Status status) {
        return new Ticket(id, title, status, assignee);
    }

    public Ticket withAssignee(String assignee) {
        return new Ticket(id, title, status, assignee);
    }
}
// end::full[]
