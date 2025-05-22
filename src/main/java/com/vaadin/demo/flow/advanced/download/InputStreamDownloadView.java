package com.vaadin.demo.flow.advanced.download;

import java.sql.Blob;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.streams.DownloadHandler;
import com.vaadin.flow.server.streams.DownloadResponse;

@Route("/download-attachment")
public class InputStreamDownloadView extends Div  {
    public InputStreamDownloadView(AttachmentRepository attachmentsRepository) {
        long attachmentId = 1L; // Example attachment ID
        // tag::snippet[]
        Anchor downloadAttachment = new Anchor(
                DownloadHandler.fromInputStream((event) -> {
            try {
                Attachment attachment = attachmentsRepository.findById(attachmentId);
                return new DownloadResponse(attachment.getData().getBinaryStream(),
                        attachment.getName(), attachment.getMime(), attachment.getSize());
            } catch (Exception e) {
                return DownloadResponse.error(500);
            }
        }), "Download attachment");
        // end::snippet[]
        add(downloadAttachment);
    }

    @Entity
    @Table(name = "attachment")
    public static class Attachment {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        private Long id;

        @Lob
        @Column(name = "data", nullable = false)
        private Blob data;

        @Column(name = "size", nullable = false)
        private Integer size;

        @Column(name = "name", nullable = false)
        private String name;

        @Column(name = "mime", nullable = false)
        private String mime;

        public Blob getData() { return data; }
        public Integer getSize() { return size; }
        public String getName() { return name; }
        public String getMime() { return mime; }

        // other class fields and methods are omitted
    }

    public interface AttachmentRepository extends
            JpaRepository<Attachment, Long>, JpaSpecificationExecutor<Attachment> {
        Attachment findById(long id);
        // other class fields and methods are omitted
    }
}
