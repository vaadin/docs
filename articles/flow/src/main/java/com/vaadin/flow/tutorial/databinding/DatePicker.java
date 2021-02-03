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

import com.vaadin.flow.component.AbstractSinglePropertyField;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("binding-data/tutorial-flow-field.asciidoc")
@Tag("input")
public class DatePicker
        extends AbstractSinglePropertyField<DatePicker, LocalDate> {

    public DatePicker(String propertyName, LocalDate defaultValue,
            boolean acceptNullValues) {
        super("value", null, String.class, LocalDate::parse,
                LocalDate::toString);

        getElement().setAttribute("type", "date");

        setSynchronizedEvent("change");
    }

    @Override
    protected boolean hasValidValue() {
        return isValidDateString(getElement().getProperty("value"));
    }

    private boolean isValidDateString(String property) {
        // Left as an exercise to the reader
        return false;
    }
}
