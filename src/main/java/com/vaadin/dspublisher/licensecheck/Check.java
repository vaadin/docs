package com.vaadin.dspublisher.licensecheck;

import com.vaadin.pro.licensechecker.BuildType;
import com.vaadin.pro.licensechecker.LicenseChecker;

public class Check {
    public static void main(String[] args) {
        try {
            LicenseChecker.checkLicense("vaadin-dspublisher", "2.1.0-alpha.2", BuildType.DEVELOPMENT);
        } catch (Exception e) {
            System.exit(1);
        }

    }
}
