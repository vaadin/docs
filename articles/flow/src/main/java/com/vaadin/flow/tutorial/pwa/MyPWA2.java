package com.vaadin.flow.tutorial.pwa;

import com.vaadin.flow.server.PWA;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("pwa/tutorial-pwa-service-worker.asciidoc")
@PWA(name = "My Progressive Web Application",
        shortName = "MyPWA",
        offlineResources = { "styles/offline.css",
                "js/jquery.js", "img/offline.jpg" })
public class MyPWA2 {
}
