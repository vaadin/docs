package com.vaadin.demo.component.upload;

import com.vaadin.flow.component.upload.UploadI18N;

import java.util.Arrays;

/**
 * Provides a default I18N configuration for the Upload examples
 *
 * At the moment the Upload component requires a fully configured I18N
 * instance, even for use-cases where you only want to change individual texts.
 *
 * This I18N configuration is an adaption of the web components I18N defaults
 * and can be used as a basis for customizing individual texts.
 */
public class UploadExamplesI18N extends UploadI18N {
    public UploadExamplesI18N() {
        setDropFiles(new DropFiles()
                .setOne("Drop file here")
                .setMany("Drop files here"));
        setAddFiles(new AddFiles()
                .setOne("Upload File...")
                .setMany("Upload Files..."));
        setCancel("Cancel");
        setError(new Error()
                .setTooManyFiles("Too Many Files.")
                .setFileIsTooBig("File is Too Big.")
                .setIncorrectFileType("Incorrect File Type."));
        setUploading(new Uploading()
                .setStatus(new Uploading.Status()
                        .setConnecting("Connecting...")
                        .setStalled("Stalled")
                        .setProcessing("Processing File...")
                        .setHeld("Queued"))
                .setRemainingTime(new Uploading.RemainingTime()
                        .setPrefix("remaining time: ")
                        .setUnknown("unknown remaining time"))
                .setError(new Uploading.Error()
                        .setServerUnavailable("Upload failed, please try again later")
                        .setUnexpectedServerError("Upload failed due to server error")
                        .setForbidden("Upload forbidden")));
        setUnits(new Units()
                .setSize(Arrays.asList("B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")));
    }
}
