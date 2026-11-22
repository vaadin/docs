package com.vaadin.demo.fusion.signals;

import java.util.EnumMap;
import java.util.Map;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.flow.signals.shared.SharedListSignal;
import com.vaadin.flow.signals.shared.SharedNumberSignal;
import com.vaadin.flow.signals.shared.SharedValueSignal;
import com.vaadin.hilla.BrowserCallable;

// tag::snippet[]
@BrowserCallable
@AnonymousAllowed
public class MeetingService {

    public enum Vote {
        YES, NO
    }

    public record AgendaItem(String title, boolean done) {
    }

    // One instance for all browsers
    private final SharedValueSignal<String> topic = new SharedValueSignal<>(
            "Team meeting");

    private final SharedListSignal<AgendaItem> agenda = new SharedListSignal<>(
            AgendaItem.class);

    private final Map<Vote, SharedNumberSignal> votes = new EnumMap<>(
            Vote.class);

    public MeetingService() {
        for (Vote vote : Vote.values()) {
            votes.put(vote, new SharedNumberSignal());
        }
    }

    public SharedValueSignal<String> topic() {
        return topic;
    }

    public SharedListSignal<AgendaItem> agenda() {
        return agenda;
    }

    public SharedNumberSignal votes(Vote vote) {
        return votes.get(vote); // The same instance for the same argument
    }
}
// end::snippet[]
