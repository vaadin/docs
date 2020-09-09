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
package com.vaadin.flow.tutorial.lit;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.littemplate.LitTemplate;
import com.vaadin.flow.component.polymertemplate.Id;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("polymer-templates/tutorial-template-and-binder.asciidoc")
public class Binder {

    @Tag("user-form")
    @JsModule("./src/user-form.js")
    public class UserForm extends LitTemplate {

        @Id("email")
        private TextField email;

        @Id("first-name")
        private TextField firstName;

        @Id("last-name")
        private TextField lastName;

        @Id("comments")
        private TextArea comment;

        @Id("action-buttons")
        private FormButtonsBar actionButtons;
    }

    @Tag("main-view")
    @JsModule("./src/main-view.js")
    @Route("")
    public class MainView extends LitTemplate {

        @Id("user-form")
        private UserForm userForm;

        @Id("users-grid")
        private UsersGrid usersGrid;
    }

    private class FormButtonsBar {

    }

    private class UsersGrid {

    }
}
