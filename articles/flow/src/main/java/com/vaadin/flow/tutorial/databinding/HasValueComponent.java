package com.vaadin.flow.tutorial.databinding;

import com.vaadin.flow.component.AbstractField;
import com.vaadin.flow.tutorial.annotations.CodeFor;


@CodeFor("binding-data/tutorial-flow-field.asciidoc")
public class HasValueComponent extends AbstractField<HasValueComponent, Integer> {
    public HasValueComponent(Integer defaultValue) {
        super(defaultValue);
    }


    @Override
    protected void setPresentationValue(Integer value) {
        if (value < 0) value = 0;
        if (value > 100) value = 100;

        getElement().setProperty("value", value);
        setModelValue(value, false);
    }


    public class AnotherHasValueComponent extends AbstractField<com.vaadin.flow.tutorial.databinding.HasValueComponent, Integer> {
        public AnotherHasValueComponent(Integer defaultValue) {
            super(defaultValue);
        }

        @Override
        protected void setPresentationValue(Integer value) {
            if (value < 0) value = 0;
            if (value > 100) value = 100;

            getElement().setProperty("value", false);
        }


    }

}
