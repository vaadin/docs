package com.vaadin.demo.component;

import com.vaadin.flow.data.value.ValueChangeMode;

import java.util.List;

public class Constants {
    private Constants() {

    }

    public final static List<ValueChangeMode> valueChangeModes = List.of(ValueChangeMode.EAGER, ValueChangeMode.LAZY, ValueChangeMode.ON_CHANGE, ValueChangeMode.TIMEOUT);
}
