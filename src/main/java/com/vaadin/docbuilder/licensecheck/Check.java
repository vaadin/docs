package com.vaadin.docbuilder.licensecheck;

import com.vaadin.pro.licensechecker.LicenseChecker;

public class Check {
    public static void main(String[] args) {
        try {
            LicenseChecker.checkLicense("vaadin-docbuilder", "0.0.1");
        } catch (Exception e) {
            System.exit(1);
        }

    }
}
