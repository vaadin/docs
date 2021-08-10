package com.vaadin.dspublisher.licensecheck;

import com.vaadin.pro.licensechecker.LicenseChecker;

public class Check {
    public static void main(String[] args) {
        try {
            LicenseChecker.checkLicense("vaadin-dspublisher", "1.0.2");
        } catch (Exception e) {
            System.exit(1);
        }

    }
}
