package com.vaadin.flow.tutorial.advanced;

import java.util.List;

import com.vaadin.flow.server.DependencyFilter;
import com.vaadin.flow.server.VaadinService;
import com.vaadin.flow.shared.ui.Dependency;
import com.vaadin.flow.shared.ui.LoadMode;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("advanced/tutorial-dependency-filter.asciidoc")
public class DependencyFilterPage {

    public class BundleFilter implements DependencyFilter {
        @Override
        public List<Dependency> filter(List<Dependency> dependencies,
                VaadinService service) {

            if (service.getDeploymentConfiguration().isProductionMode()) {
                dependencies.clear();
                dependencies.add(new Dependency(Dependency.Type.STYLESHEET,
                        "my-style.css", LoadMode.EAGER));
            }

            return dependencies;
        }
    }

}
