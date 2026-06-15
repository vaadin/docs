package com.vaadin.demo.component;

import com.vaadin.flow.data.value.ValueChangeMode;

import java.util.List;

public class Constants {
    private Constants() {

    }

    public static final List<ValueChangeMode> valueChangeModes = List.of(
            ValueChangeMode.EAGER, ValueChangeMode.LAZY,
            ValueChangeMode.TIMEOUT, ValueChangeMode.ON_CHANGE);
}
