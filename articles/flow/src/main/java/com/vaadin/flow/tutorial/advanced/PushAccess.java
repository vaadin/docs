/*
 * Copyright 2000-2018 Vaadin Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.vaadin.flow.tutorial.advanced;

import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.DetachEvent;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.page.Push;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.Command;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("advanced/tutorial-push-access.asciidoc")
public class PushAccess {
    private void accessExamples() {
        UI ui = null;
        Span statusLabel = null;
        String statusText = null;

        ui.access(new Command() {
            @Override
            public void execute() {
                statusLabel.setText(statusText);
            }
        });

        ui.access(() -> statusLabel.setText(statusText));

        ui.access(() -> {
            statusLabel.setText(statusText);
            ui.push();
        });

    }

    @Push
    @Route("push")
    public class PushyView extends VerticalLayout {
        private FeederThread thread;

        @Override
        protected void onAttach(AttachEvent attachEvent) {
            add(new Span("Waiting for updates"));

            // Start the data feed thread
            thread = new FeederThread(attachEvent.getUI(), this);
            thread.start();
        }

        @Override
        protected void onDetach(DetachEvent detachEvent) {
            // Cleanup
            thread.interrupt();
            thread = null;
        }
    }

    private static class FeederThread extends Thread {
        private final UI ui;
        private final PushyView view;

        private int count = 0;

        public FeederThread(UI ui, PushyView view) {
            this.ui = ui;
            this.view = view;
        }

        @Override
        public void run() {
            try {
                // Update the data for a while
                while (count < 10) {
                    // Sleep to emulate background work
                    Thread.sleep(500);
                    String message = "This is update " + count++;

                    ui.access(() -> view.add(new Span(message)));
                }

                // Inform that we are done
                ui.access(() -> {
                    view.add(new Span("Done updating"));
                });
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
