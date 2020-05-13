package com.vaadin.flow.tutorial;

import java.nio.file.Path;
import java.util.Collection;

/**
 * @author Vaadin Ltd.
 */
interface TutorialLineChecker {

    /**
     * Verifies the given tutorial line.
     *
     * @param tutorialPath the path of the tutorial to verify
     * @param tutorialName the name of the tutorial to verify
     * @param line         the tutorial line to verify
     * @param lineNumber   the number of the line in the file
     * @return list of error messages, if any validation error occurred, empty list otherwise.
     */
    Collection<String> verifyTutorialLine(Path tutorialPath,
                                          String tutorialName, String line, int lineNumber);
}
