package com.vaadin.demo.component.notification;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.KeyModifier;
import com.vaadin.flow.component.ShortcutEventListener;
import com.vaadin.flow.component.Shortcuts;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.FlexComponent.Alignment;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("notification-keyboard-a11y")
public class NotificationKeyboardA11y extends Div {
  private Notification notification;

  public NotificationKeyboardA11y() {
    setupUndoShortcut();

    Button button = new Button("Try it");
    button.addClickListener(clickEvent -> {
      button.setEnabled(false);

      notification = show();
      notification.addDetachListener(detachEvent -> button.setEnabled(true));
    });

    add(button);
  }

  // tag::snippet[]
  public Notification show() {
    Notification notification = new Notification();
    notification.setDuration(10000);
    notification.addThemeVariants(NotificationVariant.LUMO_CONTRAST);

    Div statusText = new Div(new Text("5 tasks deleted"));

    Button undoButton = new Button();
    undoButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
    undoButton.getElement().getStyle().set("margin-left", "var(--lumo-space-xl)");
    undoButton.getElement().executeJs(
      "const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/.test(window.navigator.platform);" +
      "this.textContent = `Undo ${isMac ? '⌘' : 'Ctrl-'}Z`;"
    );
    undoButton.addClickListener(event -> {
      notification.close();
    });

    HorizontalLayout layout = new HorizontalLayout(statusText, undoButton);
    layout.setAlignItems(Alignment.CENTER);

    notification.add(layout);
    notification.open();
    // end::snippet[]

    notification.setPosition(Notification.Position.MIDDLE);
    // tag::snippet[]

    return notification;
  }
  // end::snippet[]

  // tag::setupUndoShortcut[]
  public void setupUndoShortcut() {
    ShortcutEventListener undoListener = event -> {
      if (notification != null && notification.isOpened()) {
        notification.close();
      }
    };

    Shortcuts.addShortcutListener(this, undoListener, Key.KEY_Z, KeyModifier.META);
    Shortcuts.addShortcutListener(this, undoListener, Key.KEY_Z, KeyModifier.CONTROL);
  }
  // end::setupUndoShortcut[]

  public static class Exporter extends DemoExporter<NotificationKeyboardA11y> { // hidden-source-line
  } // hidden-source-line
}
