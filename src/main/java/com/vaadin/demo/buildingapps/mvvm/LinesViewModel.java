package com.vaadin.demo.buildingapps.mvvm;

// tag::full[]
import java.math.BigDecimal;
import java.util.List;

import com.vaadin.flow.signals.Signal;
import com.vaadin.flow.signals.local.ListSignal;
import com.vaadin.flow.signals.local.ValueSignal;

class LinesViewModel {

    record Line(String product, BigDecimal price, int quantity) {

        Line withQuantity(int quantity) {
            return new Line(product, price, quantity);
        }

        BigDecimal total() {
            return price.multiply(BigDecimal.valueOf(quantity));
        }
    }

    private final ListSignal<Line> lines = new ListSignal<>();
    private final ValueSignal<List<Line>> opened = new ValueSignal<>(List.of());

    // The same entry signals, typed so that the view can't set them
    private final Signal<List<Signal<Line>>> readOnlyLines = lines
            .map(entries -> List.<Signal<Line>> copyOf(entries));
    private final Signal<BigDecimal> total = Signal
            .computed(() -> lines.getValues().map(Line::total)
                    .reduce(BigDecimal.ZERO, BigDecimal::add));
    private final Signal<Boolean> dirty = Signal
            .computed(() -> !lines.getValues().toList().equals(opened.get()));
    private final Signal<Boolean> valid = Signal
            .computed(() -> lines.getValues().allMatch(l -> l.quantity() >= 1));

    LinesViewModel(List<Line> initial) {
        lines.insertAllLast(initial);
        opened.set(List.copyOf(initial));
    }

    Signal<List<Signal<Line>>> lines() {
        return readOnlyLines;
    }

    Signal<String> quantityError(Signal<Line> line) {
        return line.map(l -> l.quantity() < 1 ? "At least 1" : null);
    }

    Signal<BigDecimal> total() {
        return total;
    }

    Signal<Boolean> dirty() {
        return dirty;
    }

    Signal<Boolean> valid() {
        return valid;
    }

    void addLine(String product, BigDecimal price) {
        lines.insertLast(new Line(product, price, 1));
    }

    void setQuantity(Signal<Line> line, Integer quantity) {
        entry(line)
                .update(l -> l.withQuantity(quantity == null ? 0 : quantity));
    }

    void removeLine(Signal<Line> line) {
        lines.remove(entry(line));
    }

    private ValueSignal<Line> entry(Signal<Line> line) {
        return lines.peek().stream().filter(e -> e == line).findFirst()
                .orElseThrow();
    }
}
// end::full[]
