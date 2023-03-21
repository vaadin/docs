package com.vaadin.demo.hilla.testing;

import java.util.List;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.vaadin.testbench.BrowserTest;
import com.vaadin.testbench.BrowserTestBase;

// tag::snippet[]
public class UsersPageTest extends BrowserTestBase {
    @BeforeEach
    public void setUp() {
        getDriver().get("http://localhost:8080/");
    }

    @BrowserTest
    public void should_ListAllUsers() {
        var users = findElements(By.cssSelector("[data-testid=users] tr")).stream().map(
                tr -> tr.findElements(By.cssSelector("td")).stream().map(WebElement::getText).collect(
                        Collectors.joining(" "))).toList();
        Assertions.assertEquals(List.of("John Doe", "Jane Doe"), users);
    }
}
// end::snippet[]
