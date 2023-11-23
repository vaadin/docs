package com.vaadin.demo.flow.auth;

import com.vaadin.flow.server.auth.NavigationAccessChecker;

// tag::snippet[]
public class VotingNavigationAccessChecker implements NavigationAccessChecker {

    @Override
    public AccessCheckResult check(NavigationContext context) {
        AccessCheckResult result;
        if (VotingView.class.equals(context.getNavigationTarget())) {
            if (context.getParameters().getParameterNames()
                    .contains("eventId")) {
                // Allow access only if the event the user is going to express
                // its vote is actually open for voting, otherwise deny it.
                result = context.getParameters().getInteger("eventId")
                        .filter(this::isVotingOpen)
                        .map(unused -> AccessCheckResult.allow())
                        .orElseGet(() -> AccessCheckResult.deny("Voting closed"));
            } else {
                // Critical error, the navigation does not carry a required
                // information. Probably a misconfigured route annotation or
                // a broken link in another view
                result = AccessCheckResult.reject("Event identifier not provided");
            }
        } else {
            // Not a navigation to voting view, let other checkers take the
            // decision
            result = AccessCheckResult.neutral();
        }
        return result;
    }

    private boolean isVotingOpen(int eventId) {
        // Fetch the event from data storage and check if voting is currently
        // opened (implementation omitted in this example)
        return false;
    }
}
// end::snippet[]
