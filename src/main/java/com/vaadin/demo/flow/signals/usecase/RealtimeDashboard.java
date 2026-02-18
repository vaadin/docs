package com.vaadin.demo.flow.signals.usecase;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.ChartType;
import com.vaadin.flow.component.charts.model.Configuration;
import com.vaadin.flow.component.charts.model.ListSeries;
import com.vaadin.flow.component.charts.model.XAxis;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.signals.Signal;
import com.vaadin.flow.signals.local.ListSignal;
import com.vaadin.flow.signals.local.ValueSignal;
import com.vaadin.flow.theme.lumo.LumoUtility.FontSize;
import com.vaadin.flow.theme.lumo.LumoUtility.FontWeight;
import com.vaadin.flow.theme.lumo.LumoUtility.Margin;
import com.vaadin.flow.theme.lumo.LumoUtility.TextColor;

import java.util.function.Function;

/**
 * Real-time dashboard demonstrating signal-based architecture.
 *
 * Key design principles:
 * - Backend service doesn't work with signals directly
 * - Service calls a callback with plain data objects
 * - View provides callback that only updates signals
 * - No state stored in regular fields, only in signals
 * - No manual listeners or UI.access() calls needed
 * - Charts update via separate effects watching signals
 */

@Route("real-time-dashboard-with-signals")
public class RealtimeDashboard extends VerticalLayout {

    // tag::signals[]
    private static final int TIMELINE_POINTS = 12;

    // All state is stored in signals - no regular instance fields for state
    private final ValueSignal<Number> currentUsersSignal = new ValueSignal<>(0);
    private final ValueSignal<Number> viewEventsSignal = new ValueSignal<>(0);

    private final ListSignal<String> timelineCategoriesSignal = new ListSignal<>();
    private final ListSignal<Number> berlinTimelineSignal = new ListSignal<>();
    private final ListSignal<Number> londonTimelineSignal = new ListSignal<>();
    private final ListSignal<Number> newYorkTimelineSignal = new ListSignal<>();
    // end::signals[]

    // tag::constructor[]
    public RealtimeDashboard(SchedulerService schedulerService) {
        // Create UI components bound to signals
        add(
            createHighlightCard("Current users", currentUsersSignal, this::formatNumber),
            createHighlightCard("View events", viewEventsSignal, this::formatCompactNumber),
            createViewEventsChart()
        );

        // Register with scheduler - service will call our callback
        // No need for UI.access() - signals handle thread safety
        schedulerService.scheduleDashboardDataUpdate(this::onDataUpdate);
    }
    // end::constructor[]

    // tag::callback[]
    /**
     * Callback invoked by the scheduler service with new dashboard data.
     * This method ONLY updates signals - no UI manipulation, no listeners.
     * UI updates happen automatically via effects.
     */
    private void onDataUpdate(DashboardData data) {
        // Update simple value signals
        currentUsersSignal.set(data.currentUsers());
        viewEventsSignal.set(data.viewEvents());

        // Update timeline - maintain sliding window of last N points
        updateTimelineSignal(berlinTimelineSignal, data.berlinValue());
        updateTimelineSignal(londonTimelineSignal, data.londonValue());
        updateTimelineSignal(newYorkTimelineSignal, data.newYorkValue());

        // Update categories
        if (timelineCategoriesSignal.get().size() >= TIMELINE_POINTS) {
            timelineCategoriesSignal.remove(timelineCategoriesSignal.get().getFirst());
        }
        timelineCategoriesSignal.insertLast(data.timestamp());
    }
    // end::callback[]

    // tag::update-helper[]
    private void updateTimelineSignal(ListSignal<Number> signal, Number newValue) {
        if (signal.get().size() >= TIMELINE_POINTS) {
            signal.remove(signal.get().getFirst());
        }
        signal.insertLast(newValue);
    }
    // end::update-helper[]

    // tag::chart[]
    /**
     * Creates a chart that updates automatically when signals change.
     * No manual chart.drawChart() calls needed - effects handle it.
     */
    private Component createViewEventsChart() {
        Chart chart = new Chart(ChartType.AREASPLINE);
        Configuration conf = chart.getConfiguration();

        XAxis xAxis = new XAxis();
        conf.addxAxis(xAxis);

        // Create chart series
        ListSeries berlinSeries = new ListSeries("Berlin", new Number[0]);
        ListSeries londonSeries = new ListSeries("London", new Number[0]);
        ListSeries newYorkSeries = new ListSeries("New York", new Number[0]);

        // Each series gets its own effect to update data
        bindChartData(chart, berlinSeries, berlinTimelineSignal);
        bindChartData(chart, londonSeries, londonTimelineSignal);
        bindChartData(chart, newYorkSeries, newYorkTimelineSignal);

        // Effect to update x-axis categories
        Signal.effect(() ->
            xAxis.setCategories(timelineCategoriesSignal.get()
                .stream().map(Signal::get).toArray(String[]::new))
        );

        conf.addSeries(berlinSeries);
        conf.addSeries(londonSeries);
        conf.addSeries(newYorkSeries);

        // Separate effect to trigger chart redraw when any data changes
        Signal.effect(() -> {
            berlinTimelineSignal.get();
            londonTimelineSignal.get();
            newYorkTimelineSignal.get();
            chart.drawChart();
        });

        return chart;
    }
    // end::chart[]

    // tag::bind-data[]
    /**
     * Creates an effect that updates chart series data when signal changes.
     * Each series has its own independent effect.
     */
    private static void bindChartData(Chart chart, ListSeries series,
            ListSignal<Number> signal) {
        Signal.effect(() -> {
            series.setData(signal.get().stream()
                .map(Signal::get)
                .toArray(Number[]::new));
        });
    }
    // end::bind-data[]

    // tag::highlight-card[]
    /**
     * A highlight card showing a metric value with percentage change indicator.
     * Demonstrates: computed signals, signal mapping, and derived state.
     */
    private static final class HighlightCard extends VerticalLayout {
        // Internal record tracking previous and current values
        record Change(double previous, double current) {}

        private HighlightCard(String title, ValueSignal<Number> signal,
                Function<Number, String> format) {

            // Create a signal to track previous-current value pairs
            ValueSignal<Change> changeSignal = new ValueSignal<>(
                new Change(signal.peek().doubleValue(), signal.peek().doubleValue())
            );

            // Effect: Update changeSignal when the main signal changes
            // This tracks the previous value to calculate percentage change
            Signal.effect(() -> {
                double current = signal.get().doubleValue();
                double previous = changeSignal.peek().current();
                changeSignal.set(new Change(previous, current));
            });

            // Computed signal: Calculate percentage change from Change record
            Signal<Double> percentageSignal = changeSignal.map(change ->
                calculatePercentageChange(change.current(), change.previous())
            );

            // Derived signals: Map percentage to display properties
            Signal<String> prefixSignal = percentageSignal.map(this::getPrefix);
            Signal<VaadinIcon> iconSignal = percentageSignal.map(this::getIcon);
            Signal<Boolean> successSignal = percentageSignal.map(percentage -> percentage > 0);

            // Build UI components
            H2 h2 = new H2(title);
            h2.addClassNames(FontWeight.NORMAL, Margin.NONE,
                    TextColor.SECONDARY, FontSize.XSMALL);

            // Bind value display to formatted signal
            Span valueSpan = new Span();
            valueSpan.addClassNames(FontWeight.SEMIBOLD, FontSize.XXXLARGE);
            valueSpan.bindText(signal.map(format::apply));

            // Bind percentage text with prefix
            Span percentageSpan = new Span();
            percentageSpan.bindText(prefixSignal.map(prefix ->
                prefix + percentageSignal.get()
            ));

            // Bind icon to computed signal
            Icon icon = new Icon(iconSignal);
            icon.setSize("10px");
            icon.getStyle().setMarginRight("4px").setMarginLeft("0");

            // Create badge with conditional theme binding
            Span badge = new Span();
            badge.add(icon, percentageSpan);
            badge.getElement().getThemeList().add("badge");
            badge.getElement().getThemeList().bind("success", successSignal);
            badge.getElement().getThemeList().bind("error", Signal.not(successSignal));

            add(h2, valueSpan, badge);
            getStyle().setGap("5px");
        }

        private String getPrefix(double percentage) {
            if (percentage == 0) {
                return "±";
            } else if (percentage > 0) {
                return "+";
            } else {
                return "";
            }
        }

        private VaadinIcon getIcon(double percentage) {
            return percentage < 0 ? VaadinIcon.ARROW_DOWN : VaadinIcon.ARROW_UP;
        }

        private double calculatePercentageChange(double current, double previous) {
            if (previous == 0.0) {
                return 0.0;
            }
            double percent = ((current - previous) / Math.abs(previous)) * 100.0;
            return Math.round(percent * 10.0) / 10.0;
        }
    }
    // end::highlight-card[]

    private Component createHighlightCard(String title,
            ValueSignal<Number> signal, Function<Number, String> format) {
        return new HighlightCard(title, signal, format);
    }

    private String formatNumber(Number value) {
        return String.valueOf(value);
    }

    private String formatCompactNumber(Number value) {
        if (value.doubleValue() >= 1000) {
            double rounded = Math.round(value.doubleValue() / 100.0) / 10.0;
            return rounded + "k";
        }
        return String.valueOf(value);
    }

    // Supporting classes (simplified for documentation)

    static class SchedulerService {
        private final java.util.concurrent.ScheduledExecutorService scheduler =
            java.util.concurrent.Executors.newScheduledThreadPool(1);
        private final java.util.Random random = new java.util.Random();
        private final java.time.format.DateTimeFormatter timeFormatter =
            java.time.format.DateTimeFormatter.ofPattern("HH:mm:ss");

        void scheduleDashboardDataUpdate(java.util.function.Consumer<DashboardData> callback) {
            // Schedule periodic updates every 2 seconds
            scheduler.scheduleAtFixedRate(() -> {
                DashboardData data = generateData();
                callback.accept(data);
            }, 0, 2, java.util.concurrent.TimeUnit.SECONDS);
        }

        private DashboardData generateData() {
            return new DashboardData(
                randomBetween(650, 820),           // currentUsers
                randomBetween(42000, 62000),       // viewEvents
                java.time.LocalTime.now().format(timeFormatter), // timestamp
                randomBetween(480, 920),           // berlinValue
                randomBetween(420, 820),           // londonValue
                randomBetween(220, 520)            // newYorkValue
            );
        }

        private int randomBetween(int min, int max) {
            return min + random.nextInt(max - min + 1);
        }
    }

    record DashboardData(
        int currentUsers,
        int viewEvents,
        String timestamp,
        int berlinValue,
        int londonValue,
        int newYorkValue
    ) {}
}
