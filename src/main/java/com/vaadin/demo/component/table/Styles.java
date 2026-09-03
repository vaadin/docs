package com.vaadin.demo.component.table;

import com.vaadin.flow.component.html.Table;

/**
 * Minimal borders and padding, so that the structure of the demo tables --
 * spans in particular -- is visible. Applied outside the documented snippets,
 * which are about the component API rather than about styling a table.
 */
final class Styles {

    private Styles() {
    }

    static void applyTo(Table table) {
        table.getStyle().set("border-collapse", "collapse");
        table.getAllRows()
                .forEach(row -> row.getCells().forEach(cell -> cell.getStyle()
                        .set("border",
                                "1px solid var(--lumo-contrast-20pct)")
                        .set("padding",
                                "var(--lumo-space-xs) var(--lumo-space-s)")
                        .set("text-align", "left")));
    }
}
