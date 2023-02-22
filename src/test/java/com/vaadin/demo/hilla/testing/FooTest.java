package com.vaadin.demo.hilla.testing;

import org.junit.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

// tag::snippet[]
public class FooTest {
    @Test
    public void should_FindFooFile() {
        var config = mock(Foo.Config.class);
        when(config.getOutputDir()).thenReturn("/home/user/bar");
        var foo = new Foo(config);
        assertEquals("/home/user/bar/foo.json", foo.findFooFile());
    }

    @Test
    public void should_GetConfigObject() {
        var config = mock(Foo.Config.class);
        var foo = new Foo(config);
        assertEquals(config, foo.getConfig());
    }
}
// end::snippet[]
