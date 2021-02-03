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
package com.vaadin.flow.tutorial.databinding;

import java.time.LocalDate;

import com.vaadin.flow.component.AbstractField;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.dom.Element;
import com.vaadin.flow.dom.PropertyChangeEvent;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("binding-data/tutorial-flow-field.asciidoc")
@Tag("simple-date-picker")
public class SimpleDatePicker
        extends AbstractField<SimpleDatePicker, LocalDate> {
    public SimpleDatePicker() {
        super(null);

        setupProperty("year", "year-changed");
        setupProperty("month", "month-changed");
        setupProperty("dayOfMonth", "dayOfMonth-changed");
    }

    private void setupProperty(String name, String event) {
        Element element = getElement();

        element.synchronizeProperty(name, event);
        element.addPropertyChangeListener(name, this::propertyUpdated);
    }

    private void propertyUpdated(PropertyChangeEvent event) {
        Element element = getElement();

        int year = element.getProperty("year", -1);
        int month = element.getProperty("month", -1);
        int dayOfMonth = element.getProperty("dayOfMonth", -1);

        if (year != -1 && month != -1 && dayOfMonth != -1) {
            LocalDate value = LocalDate.of(year, month, dayOfMonth);
            setModelValue(value, event.isUserOriginated());
        }
    }

    @Override
    protected void setPresentationValue(LocalDate value) {
        Element element = getElement();

        if (value == null) {
            element.removeProperty("year");
            element.removeProperty("month");
            element.removeProperty("dayOfMonth");
        } else {
            element.setProperty("year", value.getYear());
            element.setProperty("month", value.getMonthValue());
            element.setProperty("dayOfMonth", value.getDayOfMonth());
        }
    }
}
