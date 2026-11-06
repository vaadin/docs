package com.vaadin.demo.buildingapps.mvvm;

// tag::full[]
// Loading, loaded, or failed: the three states of a value that arrives later
sealed interface AsyncState<T> {

    record Loading<T>() implements AsyncState<T> {
    }

    record Loaded<T>(T value) implements AsyncState<T> {
    }

    record Failed<T>(Throwable error) implements AsyncState<T> {
    }
}
// end::full[]
