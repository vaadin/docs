package com.vaadin.demo.hilla.testing; // hidden-source-line

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Disabled; // hidden-source-file
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@Disabled // hidden-source-file
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
        var config = Mockito.mock(Foo.Config.class);
        var foo = new Foo(config);
        Assertions.assertEquals(config, foo.getConfig());
    }
}
// end::snippet[]
