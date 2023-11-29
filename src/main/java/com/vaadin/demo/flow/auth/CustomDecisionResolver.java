package com.vaadin.demo.flow.auth;

import java.util.List;

import com.vaadin.flow.server.auth.AccessCheckDecision;
import com.vaadin.flow.server.auth.AccessCheckDecisionResolver;
import com.vaadin.flow.server.auth.AccessCheckResult;
import com.vaadin.flow.server.auth.NavigationContext;

// tag::snippet[]
public class CustomDecisionResolver
        implements AccessCheckDecisionResolver {
    @Override
    public AccessCheckResult resolve(List<AccessCheckResult> results, NavigationContext context) {
        if (results.stream().anyMatch(
                r -> r.decision() == AccessCheckDecision.ALLOW)) {
            return AccessCheckResult.allow();
        }
        return AccessCheckResult.deny("Access denied");
    }
}
// end::snippet[]
