/*
 * Copyright 2000-2020 Vaadin Ltd.
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
package com.vaadin.flow.tutorial.routing;

import java.util.List;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;
import com.vaadin.flow.router.RoutePrefix;
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.flow.router.RouteParameters;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("routing/tutorial-router-templates.asciidoc")
public class RouteTemplatesBasics {

    /* User profile example */

    @Route("user/:userID/edit")
    public class UserProfileEdit extends Div implements BeforeEnterObserver {

        private String userID;

        @Override
        public void beforeEnter(BeforeEnterEvent event) {
            userID = event.getRouteParameters().get("userID").get();
        }
    }

    /* Forum thread example */

    @Route(value = "")
    @RoutePrefix("forum/category/:categoryID")
    public class ForumView extends Div implements RouterLayout,
            BeforeEnterObserver {

        private String categoryID;

        private String threadID;

        @Override
        public void beforeEnter(BeforeEnterEvent beforeEnterEvent) {
            final RouteParameters urlParameters = beforeEnterEvent.getRouteParameters();

            threadID = null;

            categoryID = urlParameters.get("categoryID").get();
            urlParameters.get("threadID").ifPresent(value -> threadID = value);
        }
    }

    @Route(value = "threadID/:threadID", layout = ForumView.class)
    @RouteAlias(value = "threadID/:threadID/comment", layout = ForumView.class)
    public class ForumThreadView extends Div implements BeforeEnterObserver {

        private String threadID;

        @Override
        public void beforeEnter(BeforeEnterEvent beforeEnterEvent) {
            threadID = beforeEnterEvent.getRouteParameters().get("threadID").get();

            if ("comment".equals(getLastSegment(beforeEnterEvent))) {
                new CommentDialog().open();
            }
        }
    }

    public class CommentDialog extends Dialog {

        private TextArea commentTextArea = new TextArea();

        public CommentDialog() {
            add(commentTextArea);
            Button sendButton = new Button("Send");
            sendButton.addClickListener(event -> submit());
        }

        private void submit() {
        }
    }

    private String getLastSegment(BeforeEnterEvent beforeEnterEvent) {
        final List<String> segments = beforeEnterEvent.getLocation().getSegments();
        return segments.get(segments.size() - 1);
    }

}
