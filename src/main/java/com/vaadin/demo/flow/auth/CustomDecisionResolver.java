package com.vaadin.demo.flow.auth;

import java.util.List;

import com.vaadin.flow.server.auth.AccessCheckResult;
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
            return AccessCheckResult.allow();
        }
        return AccessCheckResult.deny("Access denied");
    }
}
// end::snippet[]
