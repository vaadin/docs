import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState, useRef } from 'react';

function IconsetGenerator() {
  const [iconsets, setIconSets] = useState([]);
  const nameInput = useRef();
  const output = useRef();

  function handleDragOver(e: React.DragEvent<HTMLInputElement>) {
    e.preventDefault();
    e.currentTarget.delegateTarget.classList.add('drag-active');
  }

  function handleDragLeave(e: React.DragEvent<HTMLInputElement>) {
    e.currentTarget.delegateTarget.classList.remove('drag-active');
  }

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const dropzone = e.currentTarget;
    const files = Array.from(dropzone.files);
    const folderName = '';
    const promises = [];

    const uploadAndSortFiles = (fileList) => {
      fileList.forEach((f) => {
        const parts = f.webkitRelativePath.split(/\/|\\/);
        const iconsetName = parts[parts.length - 2].toLowerCase();

        let set = iconsets[iconsetName];
        if (!set) {
          iconsets[iconsetName] = [];
          set = iconsets[iconsetName];
        }
        set.push(f);
      });

      Object.entries(iconsets).forEach(([iconsetName, set]) =>
        (promises as arry).push(generateVaadinIconset(iconsetName, set))
      );
    };

    const uploadAndSortFilesReordererd = () => {
      files.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      let enumName = name + (iconsetName ? '.' + capitalize(iconsetName) : '');
      if (!enumName) {
        enumName = 'Icons';
      }
      const jsName = enumName.replace(/([a-z])([A-Z]+)/g, '$1-$2').toLowerCase();
    };

    uploadAndSortFiles(files);
    uploadAndSortFilesReordered();

    const outputHtml = await Promise.all(promises);
    setIconSets(outputHtml);

    const plural = Object.keys(iconsets).length > 1;
    const tFiles = plural ? 'files are' : 'file is';
    const tThem = plural ? 'them' : 'it';

    const p = document.createElement('p');
    p.innerHTML = `Download the following files. The <code>.js</code> ${tFiles} required.
            Place ${tThem} into the <code>frontend/icons/</code> folder.
            The <code>.java</code> ${tFiles} optional.
            Place ${tThem} under the <code>src/</code> folder (you are free to choose the Java package).`;
    output.current.appendChild(p);

    const ul = document.createElement('ul');
    outputHtml.forEach((output) => ul.appendChild(output));
    output.current.appendChild(ul);

    dropzone.value = '';
  }

  return (
    <>
      <label for="iconsetname">Icon set name</label>
      <br />
      <small>Use CamelCase naming. Leave empty to use folder name(s) only.</small>
      <br />
      <div className="input">
        <input type="text" value="MyIcons" className="name" id="iconsetname" ref={nameInput} />
        <div className="drop">
          <input
            type="file"
            webkitdirectory
            directory
            multiple
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDragLeave}
            onChange={handleFiles}
          />
        </div>
      </div>
      <small>
        Upload a folder, or nested folders, of <code>.svg</code> files.
      </small>
      <div className="output" ref={output}></div>
    </>
  );
}

export default reactExample(IconsetGenerator);
