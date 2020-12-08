/**
 * Copyright (C) 2020 Vaadin Ltd
 *
 * This program is available under Commercial Vaadin Developer License
 * 4.0 (CVDLv4).
 *
 *
 * For the full License, see <https://vaadin.com/license/cvdl-4.0>.
 */
package com.vaadin.mpr.documentation;

import java.nio.file.Path;
import java.util.Collection;

/**
 * Tutorial check interface.
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
