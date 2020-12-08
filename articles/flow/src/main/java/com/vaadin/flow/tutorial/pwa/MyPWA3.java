package com.vaadin.flow.tutorial.pwa;

import com.vaadin.flow.server.PWA;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("pwa/tutorial-pwa-web-app-manifest.asciidoc")
@PWA(name = "My Progressive Web Application",
        shortName = "MyPWA",
        manifestPath = "manifest.json")
public class MyPWA3 {
}
