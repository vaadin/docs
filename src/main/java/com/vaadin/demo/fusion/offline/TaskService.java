package com.vaadin.demo.fusion.offline;

import java.util.List;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

@BrowserCallable
@AnonymousAllowed
public class TaskService {

    public record Task(String title, boolean done) {
    }

    public List<Task> findTasks() {
        return List.of(new Task("Write the report", false),
                new Task("Book a meeting room", true));
    }
}
