/*
 * Copyright 2000-2020 Vaadin Ltd.
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
package com.vaadin.flow.tutorial.databinding;

import com.vaadin.flow.tutorial.annotations.CodeFor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Example repository for data binding code
 * 
 * @author mstahv
 */
@CodeFor("tutorial-flow-dataprovider.asciidoc")
public interface PersonRepository extends JpaRepository<Person, Long> {

    public Page<Person> findByNameLikeIgnoreCase(String likeFilter, PageRequest of);
    public long countByNameLikeIgnoreCase(String likeFilter);

}
