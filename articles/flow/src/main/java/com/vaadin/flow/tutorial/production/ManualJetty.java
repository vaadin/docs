package com.vaadin.flow.tutorial.production;

import com.helger.commons.lang.ClassPathHelper;
import com.vaadin.flow.server.VaadinServlet;
import com.vaadin.flow.tutorial.annotations.CodeFor;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.util.resource.Resource;
import org.eclipse.jetty.util.resource.ResourceCollection;
import org.eclipse.jetty.webapp.Configuration;
import org.eclipse.jetty.webapp.WebAppContext;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@CodeFor("production/tutorial-jetty.asciidoc")
public final class ManualJetty {
    public static void main(String[] args) throws Exception {
        Server server = new Server(8080);

        // Specifies the order in which the configurations are scanned
        Configuration.ClassList classlist = Configuration.ClassList.setServerDefault(server);
        classlist.addAfter("org.eclipse.jetty.webapp.FragmentConfiguration", "org.eclipse.jetty.plus.webapp.EnvConfiguration", "org.eclipse.jetty.plus.webapp.PlusConfiguration");
        classlist.addBefore("org.eclipse.jetty.webapp.JettyWebXmlConfiguration", "org.eclipse.jetty.annotations.AnnotationConfiguration");

        // Creation of a temporal directory
        File tempDir = new File(System.getProperty("java.io.tmpdir"), "JettyTest");
        if (tempDir.exists()) {
            if (!tempDir.isDirectory()) {
                throw new RuntimeException("Not a directory: " + tempDir);
            }
        } else if (!tempDir.mkdirs()) {
            throw new RuntimeException("Could not make: " + tempDir);
        }

        WebAppContext context = new WebAppContext();
        context.setInitParameter("productionMode", "true");
		
        // Context path of the application
        context.setContextPath("");
		
        // Exploded WAR or not
        context.setExtractWAR(false);
        context.setTempDirectory(tempDir);

        // It pulls the respective config from the VaadinServlet
        context.addServlet(VaadinServlet.class, "/*");

        context.setAttribute("org.eclipse.jetty.server.webapp.ContainerIncludeJarPattern", ".*");

        context.setParentLoaderPriority(true);
        server.setHandler(context);

        // This add jars to the jetty classpath in a certain syntax and the pattern makes sure to load all of them
        List<Resource> resourceList = new ArrayList<>();
        for (String entry : ClassPathHelper.getAllClassPathEntries()) {
            File file = new File(entry);
            if (entry.endsWith(".jar")) {
                resourceList.add(Resource.newResource("jar:" + file.toURI().toURL() + "!/"));
            } else {
                resourceList.add(Resource.newResource(entry));
            }
        }

        // It adds the web application resources. Styles, client-side components, ...
        resourceList.add(Resource.newResource("./src/main/webapp"));
		
        // The base resource is where jetty serves its static content from
        context.setBaseResource(new ResourceCollection(resourceList.toArray(new Resource[0])));

        server.start();
        server.join();
    }
}
