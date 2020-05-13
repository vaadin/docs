/*
 * Copyright 2000-2018 Vaadin Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.vaadin.flow.tutorial.components;

import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.component.upload.receivers.MultiFileMemoryBuffer;
import com.vaadin.flow.tutorial.annotations.CodeFor;
import org.junit.Test;

import java.io.InputStream;

@CodeFor("components/tutorial-flow-upload.asciidoc")
public class UploadBasic {

    @Test
    public void singleFileUpload() {
        MemoryBuffer memoryBuffer = new MemoryBuffer();

        Upload upload = new Upload(memoryBuffer);
        upload.addFinishedListener(e -> {
            InputStream inputStream = memoryBuffer.getInputStream();
            // read the contents of the buffered memory
            // from inputStream
        });
    }

    @Test
    public void multipleMemoryUpload() {
        MultiFileMemoryBuffer multiFileMemoryBuffer = new MultiFileMemoryBuffer();
        Upload upload = new Upload(multiFileMemoryBuffer);
    }

}
