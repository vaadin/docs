package com.vaadin.demo.buildingapps.uistatemanagement;

public class ServiceHealth {

    private Status status;
    private String city;
    private int input;
    private int output;

    public enum Status {
        EXCELLENT, OK, FAILING
    }

    public ServiceHealth() {
    }

    public ServiceHealth(Status status, String city, int input, int output) {
        this.status = status;
        this.city = city;
        this.input = input;
        this.output = output;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getInput() {
        return input;
    }

    public void setInput(int input) {
        this.input = input;
    }

    public int getOutput() {
        return output;
    }

    public void setOutput(int output) {
        this.output = output;
    }
}
