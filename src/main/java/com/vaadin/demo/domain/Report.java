package com.vaadin.demo.domain;

import java.util.Date;

import javax.annotation.Nonnull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true) // hidden-source-line
// tag::snippet[]
public class Report {
    @Nonnull
    private String assignee;

    @Nonnull
    private Date due;

    @Nonnull
    private Integer id;

    @Nonnull
    private String report;

    @Nonnull
    private String status;

    public String getAssignee() {
        return assignee;
    }

    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }

    public Date getDue() {
        return due;
    }

    public void setDue(Date due) {
        this.due = due;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getReport() {
        return report;
    }

    public void setReport(String report) {
        this.report = report;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public int hashCode() {
        return id;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (!(obj instanceof Report)) {
            return false;
        }
        Report other = (Report) obj;
        return id == other.id;
    }
}
// end::snippet[]