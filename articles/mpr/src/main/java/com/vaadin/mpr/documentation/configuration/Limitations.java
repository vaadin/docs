/**
 * Copyright (C) 2020 Vaadin Ltd
 *
 * This program is available under Commercial Vaadin Developer License
 * 4.0 (CVDLv4).
 *
 *
 * For the full License, see <https://vaadin.com/license/cvdl-4.0>.
 */
package com.vaadin.mpr.documentation.configuration;

import com.vaadin.mpr.documentation.annotations.CodeFor;
import com.vaadin.ui.Button;
import com.vaadin.ui.Notification;
import com.vaadin.ui.UI;

@CodeFor("configuration/limitations.asciidoc")
public class Limitations {

    public void threadLocal() {
        Button button = new Button();

        button.addClickListener(event -> {
            new Thread(() -> {
                UI.getCurrent()
                        .access(() -> Notification.show("Hello from thread"));
            }).start();
        });

        button.addClickListener(event -> {
            UI ui = UI.getCurrent();
            new Thread(() -> {
                ui.access(() -> Notification.show("Hello from thread"));
            }).start();
        });
    }

}
