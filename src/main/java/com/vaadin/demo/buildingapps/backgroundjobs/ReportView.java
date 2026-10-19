package com.vaadin.demo.buildingapps.backgroundjobs;

// tag::full[]
import jakarta.annotation.security.PermitAll;

import org.jspecify.annotations.Nullable;

import com.vaadin.demo.buildingapps.backgroundjobs.ReportService.CancellableJob;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.progressbar.ProgressBar;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.signals.local.ValueSignal;

@Route("building-apps/background-jobs/report")
@PermitAll // <1>
public class ReportView extends VerticalLayout {

    private final ReportService reportService;
    private final ValueSignal<Boolean> running = new ValueSignal<>(false); // <2>
    private final ValueSignal<Double> progress = new ValueSignal<>(0.0);
    private final ValueSignal<String> status = new ValueSignal<>("");
    private @Nullable CancellableJob job;

    public ReportView(ReportService reportService) {
        this.reportService = reportService;

        var startButton = new Button("Generate Report", event -> startJob());
        startButton.bindEnabled(running.map(isRunning -> !isRunning)); // <3>

        var progressBar = new ProgressBar();
        progressBar.bindValue(progress);
        progressBar.bindVisible(running);

        var cancelButton = new Button("Cancel", event -> {
            cancelJob();
            status.set("The report was cancelled.");
        });
        cancelButton.bindVisible(running);

        var statusText = new Span();
        statusText.bindText(status);

        add(startButton, progressBar, cancelButton, statusText);
        addDetachListener(event -> cancelJob()); // <4>
    }

    private void startJob() {
        running.set(true);
        progress.set(0.0);
        status.set("Generating the report...");
        job = reportService.generateReport(progress::set, this::onCompleted,
                this::onFailed); // <5>
    }

    private void onCompleted(String result) { // <6>
        running.set(false);
        status.set(result);
    }

    private void onFailed(Exception error) {
        running.set(false);
        status.set("Generating the report failed.");
    }

    private void cancelJob() {
        if (job != null) {
            job.cancel();
        }
        running.set(false);
    }
}
// end::full[]
