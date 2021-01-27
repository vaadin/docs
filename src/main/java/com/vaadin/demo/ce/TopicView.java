package com.vaadin.demo.ce;

import com.vaadin.collaborationengine.CollaborationEngine;
import com.vaadin.collaborationengine.CollaborationMap;
import com.vaadin.collaborationengine.UserInfo;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.shared.Registration;

// tag::topic-view[]
@Route(value = "ce/topic", layout = MainView.class)
public class TopicView extends VerticalLayout {

    private final Checkbox checkbox;

    public TopicView() {
        // tag::add-components[]
        checkbox = new Checkbox("Is it Friday?");
        add(checkbox);
        // end::add-components[]
        // tag::user-info[]
        // NOTE: In a real application, use the user id of the logged in user
        // instead
        String userId = System.identityHashCode(UI.getCurrent()) + "";
        UserInfo localUser = new UserInfo(userId, "User " + userId);
        // end::user-info[]
        // tag::open-topic[]
        CollaborationEngine.getInstance().openTopicConnection(this, "tutorial",
                localUser, topic -> {
                    // tag::get-map[]
                    CollaborationMap fieldValues = topic
                            .getNamedMap("fieldValues");
                    // end::get-map[]
                    // tag::registration[]
                    Registration registration = checkbox
                            .addValueChangeListener(valueChangeEvent -> {
                                fieldValues.put("isFriday",
                                        valueChangeEvent.getValue());
                            });
                    // tag::subscribe[]
                    fieldValues.subscribe(event -> {
                        if ("isFriday".equals(event.getKey())) {
                            checkbox.setValue(Boolean.TRUE
                                    .equals(event.getValue(Boolean.class)));
                        }
                    });
                    // end::subscribe[]
                    return registration;
                    // end::registration[]
                });
        // end::open-topic[]
    }
}
// end::topic-view[]