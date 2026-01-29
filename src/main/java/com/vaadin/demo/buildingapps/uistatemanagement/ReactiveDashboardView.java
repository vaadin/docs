package com.vaadin.demo.buildingapps.uistatemanagement;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.ComponentEffect;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.dashboard.Dashboard;
import com.vaadin.flow.component.dashboard.DashboardWidget;
import com.vaadin.flow.component.charts.model.style.FontWeight;
import com.vaadin.flow.component.grid.ColumnTextAlign;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.GridVariant;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Main;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.theme.lumo.LumoUtility;
import com.vaadin.signals.WritableSignal;
import com.vaadin.signals.local.ValueSignal;
import com.vaadin.signals.shared.SharedListSignal;
import com.vaadin.signals.shared.SharedValueSignal;
import java.util.List;
import java.util.Random;

@PageTitle("Reactive Dashboard")
@Route("building-apps/ui-state-management/reactive-dashboard")
public class ReactiveDashboardView extends Main {

    private final WritableSignal<Double> currentUsersSignal = new ValueSignal<>(745.0);
    private final WritableSignal<Double> viewEventsSignal = new ValueSignal<>(54600.0);
    private final WritableSignal<Double> conversionRateSignal = new ValueSignal<>(18.5);
    private final SharedListSignal<ServiceHealth> serviceHealthSignal = new SharedListSignal<>(ServiceHealth.class);
    private final Random random = new Random();

    public ReactiveDashboardView() {
        addClassName("reactive-dashboard-view");

        Dashboard dashboard = new Dashboard();

        dashboard.add(createWidget("Current Users", currentUsersSignal, n -> String.format("%.0f", n)));
        dashboard.add(createWidget("View Events", viewEventsSignal, n -> n >= 1000 ? String.format("%.1fk", n / 1000) : n.toString()));
        dashboard.add(createWidget("Conversion Rate", conversionRateSignal, n -> String.format("%.1f%%", n)));
        dashboard.add(createWidget("Uptime", new ValueSignal<>(99.9), n -> String.format("%.1f%%", n)));

        DashboardWidget gridWidget = new DashboardWidget("Service Health");
        gridWidget.setContent(createServiceHealthGrid());
        gridWidget.setColspan(3);
        dashboard.add(gridWidget);

        add(dashboard);

        // Simulate real-time updates
        addAttachListener(event -> {
            UI ui = event.getUI();
            ui.setPollInterval(3000);
            ui.addPollListener(pollEvent -> updateMockData());
        });

        // Initial mock data for grid
        mockServiceHealth().forEach(serviceHealthSignal::insertLast);
    }

    private DashboardWidget createWidget(String title, WritableSignal<Double> signal, java.util.function.Function<Double, String> format) {
        DashboardWidget widget = new DashboardWidget(title);
        HighlightCard card = new HighlightCard(title, signal, format);
        widget.setContent(card);
        return widget;
    }

    private Component createServiceHealthGrid() {
        VerticalLayout layout = new VerticalLayout();
        layout.setPadding(true);

        H2 header = new H2("Service Health");
        header.addClassNames(LumoUtility.FontSize.XLARGE, LumoUtility.Margin.NONE);
        layout.add(header);

        Grid<SharedValueSignal<ServiceHealth>> grid = new Grid<>();
        grid.addThemeVariants(GridVariant.LUMO_NO_BORDER);
        grid.setAllRowsVisible(true);

        grid.addColumn(new ComponentRenderer<>(signal -> {
            Span status = new Span();
            ComponentEffect.effect(status, () -> {
                ServiceHealth health = signal.value();
                status.setText(health.getStatus().name());
                status.getElement().getThemeList().clear();
                String theme = "badge small";
                if (health.getStatus() == ServiceHealth.Status.EXCELLENT) theme += " success";
                else if (health.getStatus() == ServiceHealth.Status.FAILING) theme += " error";
                status.getElement().getThemeList().add(theme);
            });
            return status;
        })).setHeader("Status").setAutoWidth(true);

        grid.addColumn(signal -> signal.value().getCity()).setHeader("City");

        grid.addColumn(new ComponentRenderer<>(signal -> {
            Span input = new Span();
            ComponentEffect.effect(input, () -> input.setText(String.valueOf(signal.value().getInput())));
            return input;
        })).setHeader("Input").setTextAlign(ColumnTextAlign.END);

        grid.addColumn(new ComponentRenderer<>(signal -> {
            Span output = new Span();
            ComponentEffect.effect(output, () -> output.setText(String.valueOf(signal.value().getOutput())));
            return output;
        })).setHeader("Output").setTextAlign(ColumnTextAlign.END);

        ComponentEffect.bind(grid, serviceHealthSignal, (g, items) -> g.setItems(items != null ? items : List.of()));

        layout.add(grid);
        return layout;
    }

    private void updateMockData() {
        currentUsersSignal.value(745.0 + random.nextInt(50) - 25);
        viewEventsSignal.value(54600.0 + random.nextInt(1000) - 500);
        conversionRateSignal.value(18.0 + random.nextDouble() * 2);

        List<ServiceHealth> newHealthData = mockServiceHealth();
        List<SharedValueSignal<ServiceHealth>> currentSignals = serviceHealthSignal.value();

        for (int i = 0; i < Math.min(newHealthData.size(), currentSignals.size()); i++) {
            currentSignals.get(i).value(newHealthData.get(i));
        }
    }

    private List<ServiceHealth> mockServiceHealth() {
        return List.of(
                new ServiceHealth(randomStatus(), "Münster", 280 + random.nextInt(100), 1200 + random.nextInt(500)),
                new ServiceHealth(randomStatus(), "Cluj-Napoca", 260 + random.nextInt(100), 1100 + random.nextInt(500)),
                new ServiceHealth(randomStatus(), "Ciudad Victoria", 240 + random.nextInt(100), 1000 + random.nextInt(500))
        );
    }

    private ServiceHealth.Status randomStatus() {
        int p = random.nextInt(10);
        if (p < 2) return ServiceHealth.Status.FAILING;
        if (p < 5) return ServiceHealth.Status.OK;
        return ServiceHealth.Status.EXCELLENT;
    }

    private static class HighlightCard extends VerticalLayout {
        private final Span valueSpan;
        private final Span badge;
        private final java.util.function.Function<Double, String> format;
        private Double lastValue;

        public HighlightCard(String title, WritableSignal<Double> signal, java.util.function.Function<Double, String> format) {
            this.format = format;
            setSpacing(false);
            setPadding(true);
            addClassName("highlight-card");

            H2 h2 = new H2(title);
            h2.addClassNames(String.valueOf(FontWeight.NORMAL), LumoUtility.Margin.NONE, LumoUtility.TextColor.SECONDARY, LumoUtility.FontSize.XSMALL);

            valueSpan = new Span(format.apply(signal.value()));

            badge = new Span();
            add(h2, valueSpan, badge);

            ComponentEffect.effect(this, () -> update(signal.value()));
        }

        private void update(Double newValue) {
            valueSpan.setText(format.apply(newValue));
            if (lastValue != null) {
                double diff = newValue - lastValue;
                badge.removeAll();
                Icon icon = diff >= 0 ? VaadinIcon.ARROW_UP.create() : VaadinIcon.ARROW_DOWN.create();
                icon.setSize("12px");
                badge.add(icon, new Span(String.format("%.1f", Math.abs(diff))));
                badge.getElement().getThemeList().clear();
                badge.getElement().getThemeList().add("badge " + (diff >= 0 ? "success" : "error"));
            }
            lastValue = newValue;
        }
    }
}
