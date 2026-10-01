package com.vaadin.demo.buildingapps.backgroundjobs;

// tag::full[]
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.function.Consumer;

import org.springframework.core.task.TaskExecutor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
@PreAuthorize("isAuthenticated()") // <1>
public class ReportService {

    private static final int PARTS = 10;

    private final TaskExecutor taskExecutor;

    ReportService(TaskExecutor taskExecutor) {
        this.taskExecutor = taskExecutor;
    }

    public CancellableJob generateReport(Consumer<Double> onProgress,
            Consumer<String> onComplete, Consumer<Exception> onError) {
        var cancelled = new AtomicBoolean(false);
        taskExecutor.execute(() -> { // <2>
            try {
                for (int part = 1; part <= PARTS; part++) {
                    generatePart(part);
                    if (cancelled.get()) { // <3>
                        return;
                    }
                    onProgress.accept((double) part / PARTS);
                }
                onComplete.accept("The report is ready.");
            } catch (Exception ex) {
                onError.accept(ex);
            }
        });
        return () -> cancelled.set(true); // <4>
    }

    private void generatePart(int part) throws InterruptedException {
        Thread.sleep(500); // Simulates slow work
    }

    @FunctionalInterface
    public interface CancellableJob {
        void cancel();
    }
}
// end::full[]
