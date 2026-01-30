package com.vaadin.demo.buildingapps.uistatemanagement;

import com.vaadin.signals.WritableSignal;
import com.vaadin.signals.local.ValueSignal;
import com.vaadin.signals.shared.SharedListSignal;
import com.vaadin.signals.shared.SharedValueSignal;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class DashboardDataService {

    private final WritableSignal<Double> currentUsersSignal = new ValueSignal<>(745.0);
    private final WritableSignal<Double> viewEventsSignal = new ValueSignal<>(54600.0);
    private final WritableSignal<Double> conversionRateSignal = new ValueSignal<>(18.5);
    private final SharedListSignal<ServiceHealth> serviceHealthSignal = new SharedListSignal<>(ServiceHealth.class);

    private final Random random = new Random();

    public DashboardDataService() {
        mockServiceHealth().forEach(serviceHealthSignal::insertLast);
    }

    public WritableSignal<Double> getCurrentUsersSignal() {
        return currentUsersSignal;
    }

    public WritableSignal<Double> getViewEventsSignal() {
        return viewEventsSignal;
    }

    public WritableSignal<Double> getConversionRateSignal() {
        return conversionRateSignal;
    }

    public SharedListSignal<ServiceHealth> getServiceHealthSignal() {
        return serviceHealthSignal;
    }

    @Scheduled(fixedRate = 3000)
    public void updateMockData() {
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
}
