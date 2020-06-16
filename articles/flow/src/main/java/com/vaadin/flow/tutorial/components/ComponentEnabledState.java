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
package com.vaadin.flow.tutorial.components;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("components/tutorial-enabled-state.asciidoc")
public class ComponentEnabledState {

    public void enabledState_component() {
        TextField name = new TextField("Name");
        name.setEnabled(false);
    }

    public void enabledState_container() {
        FormLayout form = new FormLayout();

        TextField name = new TextField("Name");
        TextField email = new TextField("E-mail");
        Button submit = new Button("Submit");

        form.add(name, email, submit);
        // all children are implicitly disabled
        form.setEnabled(false);
        System.out.println(name.isEnabled()); // prints false
    }

    public void enabledState_attachAndDetach() {
        //@formatter:off
        FormLayout form = new FormLayout();
        form.setEnabled(false); // the entire form is disabled

        TextField name = new TextField("Name");
        // prints true, since it is not attached yet
        System.out.println(name.isEnabled());

        Button submit = new Button("Submit");
        // the submit button is explicitly disabled
        submit.setEnabled(false);
        System.out.println(submit.isEnabled()); // prints false

        form.add(name, submit); // attaches children

        System.out.println(name.isEnabled()); // prints false
        System.out.println(submit.isEnabled()); // prints false

        form.remove(name); // the name field gets detached
        System.out.println(name.isEnabled()); // prints true

        form.remove(submit); // the submit button gets detached

        // prints false, since it was explicitly disabled
        System.out.println(submit.isEnabled());
        //@formatter:on
    }
}
