package com.vaadin.flow.tutorial.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.KeyModifier;
import com.vaadin.flow.component.ShortcutEventListener;
import com.vaadin.flow.component.ShortcutRegistration;
import com.vaadin.flow.component.Shortcuts;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Input;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.server.Command;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("components/tutorial-flow-shortcut.asciidoc")
public class ShortcutBasic {

    public void clickShortcut() {
        TextField userName = new TextField("User name");
        PasswordField password = new PasswordField("Password");

        Button login = new Button("Login");
        login.addClickListener(event -> this.login());
        login.addClickShortcut(Key.ENTER);
    }

    public void focusShortcut() {
        TextField textField = new TextField("Label");
        textField.addFocusShortcut(Key.KEY_F, KeyModifier.ALT);
    }

    public void generalPurposeShortcut()  {
        // ex 1
        UI.getCurrent().addShortcutListener(
                this::openCustomerCreation, Key.KEY_N,
                KeyModifier.CONTROL, KeyModifier.ALT);

        // ex 2
        UI.getCurrent().addShortcutListener(
                () -> Notification.show("Shortcut triggered"),
                Key.SPACE);
    }

    public class Scope extends Div {
        public Scope() {
            TextField firstName = new TextField();
            TextField lastName = new TextField();

            add(firstName, lastName);

            Command command = () -> {
                firstName.setValue("");
                lastName.setValue("");
                firstName.focus();
            };
            // first parameter is the lifecycle owner
            // of the shortcut and will be discussed later.
            Shortcuts.addShortcutListener(this,
                    command, Key.ESCAPE)
                    // defines the component onto which
                    // the shortcuts listener is attached:
                    .listenOn(this);
        }
    }

    public void removingShortcut() {
        TextField textField = new TextField("Label");
        ShortcutRegistration registration =
                textField.addFocusShortcut(Key.KEY_F,
                KeyModifier.ALT);

        // something happens here

        registration.remove(); // shortcut removed!
    }

    public void shortcutLifecycle() {
        Paragraph paragraph =
                new Paragraph("When you see me, try ALT+G!");

        Shortcuts.addShortcutListener(paragraph,
                () -> Notification.show("Well done!"),
                Key.KEY_G, KeyModifier.ALT);

        add(paragraph);
    }

    public void listeningForShortcutEvent() {
        // handles multiple shortcuts
        ShortcutEventListener listener = event -> {
            if (event.matches(Key.KEY_G, KeyModifier.ALT)) {
                // do something G-related
            }
            else if (event.matches(Key.KEY_J, KeyModifier.ALT)) {
                // do something J-releated
            }
        };

        UI.getCurrent().addShortcutListener(listener,
                Key.KEY_G, KeyModifier.ALT);
        UI.getCurrent().addShortcutListener(listener,
                Key.KEY_J, KeyModifier.ALT);
    }

    public void configuringShortcuts_modifiers() {
        Input input = new Input();
        input.addFocusShortcut(Key.KEY_F).withAlt().withShift();
    }

    private Div anotherComponent = new Div();
    public void configuringShortcuts_lifecycleOwner() {
        UI.getCurrent().addShortcutListener(
                () -> {/* do a thing*/}, Key.KEY_F)
                .bindLifecycleTo(anotherComponent);
    }

    public void configuringShortcuts_clientsideEventBehavior() {
        Input input = new Input();
        input.addFocusShortcut(Key.KEY_F)
                // other handlers can now catch this event
                .allowEventPropagation()
                // the character 'f' will be written out,
                // if a text field is focused
                .allowBrowserDefault();
    }


    /**
     * Helpers
     */

    private void openCustomerCreation() {}

    private void add(Component... components) {}

    private void login() {}
}
