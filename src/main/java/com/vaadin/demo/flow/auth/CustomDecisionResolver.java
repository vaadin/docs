package com.vaadin.demo.flow.auth;

import java.util.List;

import com.vaadin.flow.server.auth.NavigationAccessChecker;

// tag::snippet[]
public class CustomDecisionResolver
        implements NavigationAccessChecker.DecisionResolver {
    @Override
    public NavigationAccessChecker.AccessCheckResult resolve(
            List<NavigationAccessChecker.AccessCheckResult> results,
            NavigationAccessChecker.NavigationContext context) {
        if (results.stream().anyMatch(
                r -> r.decision() == NavigationAccessChecker.Decision.ALLOW)) {
            return context.allow();
        }
        return context.deny("Access denied");
    }
}
// end::snippet[]
