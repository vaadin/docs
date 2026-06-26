package com.vaadin.demo.reference.componentinternals.basics;

import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;

@Tag("div")
public class UserNameLabel extends Component {

    @Override
    protected void onAttach(AttachEvent attachEvent) {
        // This assumes the username has been stored in the session after login
        String userName = (String) attachEvent.getSession()
                .getAttribute("username");
        getElement().setText("Hello %s, weclome back!".formatted(userName));
    }
}
