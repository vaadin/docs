package com.vaadin.demo.component.upload;

import com.vaadin.flow.component.upload.UploadI18N;

import java.util.Arrays;

/**
 * At the moment the Upload component requires a fully configured I18N
 * instance, even for use-cases where you only want to change individual texts.
 * Please make sure that you have set all translations when writing a custom
 * I18N config.
 */
public class UploadFinnishI18N extends UploadI18N {
    public UploadFinnishI18N() {
        setDropFiles(new DropFiles()
                .setOne("Raahaa tiedosto tähän")
                .setMany("Raahaa tiedostot tähän"));
        setAddFiles(new AddFiles()
                .setOne("Valitse tiedosto...")
                .setMany("Valitse tiedostot..."));
        setCancel("Peruuta");
        setError(new Error()
                .setTooManyFiles("Liian monta tiedostoa.")
                .setFileIsTooBig("Tiedosto on liian suuri.")
                .setIncorrectFileType("Väärä tiedostomuoto."));
        setUploading(new Uploading()
                .setStatus(new Uploading.Status()
                        .setConnecting("Yhdistetään...")
                        .setStalled("Pysäytetty")
                        .setProcessing("Käsitellään tiedostoa...")
                        .setHeld("Jonossa"))
                .setRemainingTime(new Uploading.RemainingTime()
                        .setPrefix("aikaa jäljellä: ")
                        .setUnknown("jäljellä olevaa aikaa ei saatavilla"))
                .setError(new Uploading.Error()
                        .setServerUnavailable("Palvelin ei vastaa")
                        .setUnexpectedServerError("Palvelinvirhe")
                        .setForbidden("Kielletty")));
        setUnits(new Units()
                .setSize(Arrays.asList("B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")));
    }
}
