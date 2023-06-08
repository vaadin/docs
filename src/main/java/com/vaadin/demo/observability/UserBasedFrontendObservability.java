package com.vaadin.demo.observability;

import java.security.Principal;

import com.vaadin.flow.server.VaadinRequest;
import com.vaadin.observability.ObservabilityClientConfiguration;
import com.vaadin.observability.ObservabilityClientConfigurer;

// tag::full-class[]
public class UserBasedFrontendObservability implements ObservabilityClientConfigurer {
    @Override
    public void configure(ObservabilityClientConfiguration config) {
        var request = VaadinRequest.getCurrent();
        var userSettings = fetchConfiguration(request.getUserPrincipal());

        config.setEnabled(userSettings.isEnabled());
        config.setDocumentLoadEnabled(userSettings.isDocumentLoad());
        config.setUserInteractionEnabled(userSettings.isUserInteraction());
        config.setLongTaskEnabled(userSettings.isLongTask());
        config.setXMLHttpRequestEnabled(userSettings.isXmlHttpRequest());
        config.setFrontendErrorEnabled(userSettings.isFrontendError());
    }

    private UserObservabilityConfig fetchConfiguration(Principal user) {
        if (user != null) {
            // fetch the configuration for the given user from some storage
            // e.g. in-memory data structure, database table, properties file, ...
            UserObservabilityConfig config = new UserObservabilityConfig();
            config.setXmlHttpRequest(false);

            return config;
        }
        // user not logged-in, return null or a default configuration
        return new UserObservabilityConfig();
    }

    static class UserObservabilityConfig {
        private boolean enabled = true;
        private boolean documentLoad = true;

        private boolean userInteraction = true;
        private boolean longTask = true;
        private boolean xmlHttpRequest = true;
        private boolean frontendError = true;

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }

        public boolean isDocumentLoad() {
            return enabled && documentLoad;
        }

        public void setDocumentLoad(boolean documentLoad) {
            this.documentLoad = documentLoad;
        }

        public boolean isUserInteraction() {
            return enabled && userInteraction;
        }

        public void setUserInteraction(boolean userInteraction) {
            this.userInteraction = userInteraction;
        }

        public boolean isLongTask() {
            return enabled && longTask;
        }

        public void setLongTask(boolean longTask) {
            this.longTask = longTask;
        }

        public boolean isXmlHttpRequest() {
            return enabled && xmlHttpRequest;
        }

        public void setXmlHttpRequest(boolean xmlHttpRequest) {
            this.xmlHttpRequest = xmlHttpRequest;
        }

        public boolean isFrontendError() {
            return enabled && frontendError;
        }

        public void setFrontendError(boolean frontendError) {
            this.frontendError = frontendError;
        }
    }
}
// end::full-class[]
