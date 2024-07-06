package com.vaadin.demo.flow.integration.react;

// tag::class[]
public record RgbaColor(int r, int g, int b, double a) {

    @Override
    public String toString() {
        return "{ r: %s, g: %s, b: %s, a: %s }".formatted(r, g, b, a);
    }

}
// end::class[]
