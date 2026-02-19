package com.vaadin.demo;

import com.vaadin.experimental.Feature;
import com.vaadin.experimental.FeatureFlags;
import com.vaadin.flow.server.frontend.Options;
import com.vaadin.flow.server.frontend.TypeScriptBootstrapModifier;
import com.vaadin.flow.server.frontend.scanner.FrontendDependenciesScanner;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.util.List;
import java.util.stream.Collectors;

// Flow toggles feature flags on the client-side at runtime, once the Flow app bootstraps.
// When showing only Lit / React examples there is no Flow app yet, so we generate a second
// JS module that enables active feature flags and import this in `init.ts` so that the
// feature flags are properly set when a Lit / React example renders.
public class FeatureFlagsExporter implements TypeScriptBootstrapModifier {
    public void modify(List<String> bootstrapTypeScript, Options options,
            FrontendDependenciesScanner frontendDependenciesScanner) {
        try {
            Files.writeString(
                    options.getFrontendGeneratedFolder().toPath()
                            .resolve("activate-vaadin-featureflags.js"),
                    featureFlagsInitializer(options.getFeatureFlags()));
        } catch (IOException ex) {
            throw new UncheckedIOException(ex);
        }
    }

    static String featureFlagsInitializer(FeatureFlags featureFlags) {
        return featureFlags.getFeatures().stream().filter(Feature::isEnabled)
                .map(feature -> String.format("activator(\"%s\");",
                        feature.getId()))
                .collect(Collectors.joining("\n",
                        """
                                window.Vaadin = window.Vaadin || {};
                                window.Vaadin.featureFlagsUpdaters = window.Vaadin.featureFlagsUpdaters || [];
                                window.Vaadin.featureFlagsUpdaters.push((activator) => {
                                """,
                        "});"));
    }
}
