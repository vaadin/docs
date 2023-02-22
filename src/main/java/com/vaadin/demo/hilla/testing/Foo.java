package com.vaadin.demo.hilla.testing;

// tag::snippet[]
public class Foo {
    private final Config config;

    public Foo(Config config) {
        this.config = config;
    }

    public Config getConfig() {
        return config;
    }

    public String findFooFile() {
        return config.getOutputDir() + "/foo.json";
    }

    public interface Config {
        String getOutputDir();
    }
}
// end::snippet[]
