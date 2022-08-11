import { css, html, LitElement, render } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('iconset-generator')
export class IconsetGenerator extends LitElement {
  static styles = css`
    :host {
      margin: var(--docs-space-xl) 0;
      background-color: var(--docs-surface-color-2);
      border-radius: var(--docs-border-radius-l);
      padding: var(--docs-space-l);
    }

    .input {
      display: flex;
      align-items: center;
      gap: var(--docs-space-s);
    }

    label {
      font-weight: var(--docs-font-weight-emphasis);
    }

    .name {
      -webkit-appearance: none;
      border: 1px solid var(--docs-divider-color-2);
      border-radius: var(--docs-border-radius-l);
      background-color: var(--docs-background-color);
      padding: 0.5em;
      font: inherit;
      color: inherit;
      margin: var(--docs-space-s) 0;
      height: 2.5rem;
      box-sizing: border-box;
      flex-shrink: 1;
      min-width: 5em;
    }

    small {
      color: var(--docs-secondary-text-color);
    }

    .drop {
      display: inline-flex;
      border-radius: var(--docs-border-radius-l);
      align-items: center;
      justify-content: center;
      position: relative;
      font-weight: var(--docs-font-weight-strong);
      color: var(--docs-surface-color-2);
      background-color: var(--docs-link-color);
      cursor: pointer;
      height: 2.5rem;
      padding: 0.5em 1em;
      box-sizing: border-box;
      flex: none;
    }

    .drop:focus-within {
      box-shadow: 0 0 0 2px var(--docs-surface-color-2), 0 0 0 4px var(--docs-link-color);
    }

    .drop:hover,
    :host(.drop-active) .drop {
      background-color: var(--docs-visited-link-color);
    }

    .drop::before {
      content: 'Upload icons';
    }

    .drop input {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: 0;
      opacity: 0;
      width: 100%;
      cursor: inherit;
    }

    .output textarea {
      -webkit-appearance: none;
      width: 100%;
      height: 10em;
      background: transparent;
      font: inherit;
      font-family: var(--docs-font-family-monospace);
      border: 0;
      padding: var(--docs-space-m);
      margin: 0 calc(var(--docs-space-m) * -1);
      margin-bottom: calc(var(--docs-space-m) * -1);
      resize: vertical;
    }

    .output ul {
      list-style: none;
      padding: 0;
    }

    .output li {
      padding: var(--docs-space-s) var(--docs-space-m);
      border: 2px solid var(--docs-divider-color-1);
      border-radius: var(--docs-border-radius-l);
      margin: var(--docs-space-s) 0;
      position: relative;
    }

    .output li details {
      font-size: var(--docs-font-size-xs);
      color: var(--docs-secondary-text-color);
    }

    .output summary {
      cursor: pointer;
    }

    .output summary:hover,
    .output summary:focus-visible {
      color: var(--docs-heading-text-color);
    }

    .output li a {
      color: var(--docs-link-color);
      font-weight: var(--docs-font-weight-strong);
      text-decoration: none;
      display: block;
    }

    .output li a:hover::before {
      content: '';
      position: absolute;
      text-align: end;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border: 2px solid var(--docs-link-color);
      border-radius: var(--docs-border-radius-l);
      pointer-events: none;
    }

    .output li a:hover::after {
      content: '↓';
      position: absolute;
      height: 1em;
      width: 2em;
      top: calc(50% - 0.5em);
      right: 0;
      pointer-events: none;
      font-size: 1.25em;
      line-height: 1;
    }
  `;

  render() {
    return html`
      <label for="iconsetname">Icon set name</label><br />
      <small>Use CamelCase naming. Leave empty to use folder name(s) only.</small><br />
      <div class="input">
        <input type="text" value="MyIcons" class="name" id="iconsetname" />
        <div class="drop">
          <input
            type="file"
            webkitdirectory
            directory
            multiple
            @dragover=${this.handleDragOver}
            @dragleave=${this.handleDragLeave}
            @drop=${this.handleDragLeave}
          />
        </div>
      </div>
      <small>Upload a folder, or nested folders, of <code>.svg</code> files.</small>
      <div class="output"></div>
    `;
  }

  handleDragOver(e: any) {
    e.preventDefault();
    this.classList.add('drag-active');
  }

  handleDragLeave(e: any) {
    this.classList.remove('drag-active');
  }

  protected firstUpdated() {
    const input = this.shadowRoot?.querySelector('.drop input');
    // @ts-ignore
    input.addEventListener('change', this.handleFiles.bind(this));
  }

  async handleFiles() {
    const dropzone = this.shadowRoot?.querySelector('.drop input') as HTMLInputElement;
    const nameInput = this.shadowRoot?.querySelector('.name') as HTMLInputElement;

    const iconsets = {};
    const name = nameInput.value;
    let folderName = '';

    // Categorize into sets based on folder path
    // @ts-ignore
    Array.from(dropzone.files).forEach((f) => {
      // @ts-ignore
      if (f.webkitRelativePath) {
        // @ts-ignore
        const parts = f.webkitRelativePath.split(/\/|\\/);
        folderName = parts[parts.length - 2].toLowerCase();
      }

      const iconsetName = folderName || '';

      // @ts-ignore
      let set = iconsets[iconsetName];
      if (!set) {
        // @ts-ignore
        iconsets[iconsetName] = [];
        // @ts-ignore
        set = iconsets[iconsetName];
      }
      set.push(f);
    });

    const outputHtml = [];
    for (const iconsetName in iconsets) {
      // @ts-ignore
      const set = iconsets[iconsetName];

      // Sort alphabetically
      // @ts-ignore
      set.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      let enumName = name + capitalize(iconsetName);
      if (!enumName) {
        enumName = 'Icons';
      }

      // @ts-ignore
      const jsName = enumName.replaceAll(/([a-z])([A-Z]+)/g, '$1-$2').toLowerCase();

      // Generate <vaadin-iconset> JS import and Java enum class
      const iconsetStrings = await generateVaadinIconset(set, jsName, enumName);

      const jsBlob = new Blob([iconsetStrings.js], { type: 'text/plain' });
      const javaBlob = new Blob([iconsetStrings.java], { type: 'text/plain' });

      outputHtml.push(
        html`<li>
            <a download="${jsName}.js" .href=${URL.createObjectURL(jsBlob)}>${jsName}.js</a>
            <details>
              <summary>View contents</summary>
              <textarea readonly>${iconsetStrings.js}</textarea>
            </details>
          </li>
          <li>
            <a download="${enumName}.java" .href=${URL.createObjectURL(javaBlob)}>
              ${enumName}.java
            </a>
            <details>
              <summary>View contents</summary>
              <textarea readonly>${iconsetStrings.java}</textarea>
            </details>
          </li>`
      );
    }

    const output = this.shadowRoot?.querySelector('.output') as HTMLElement;
    render(
      html`<p>
          Download the following files. Place the <code>.js</code> files in the
          <code>frontend/icons/</code> folder and the <code>.java</code> files under the
          <code>src/</code> folder (you are free to choose the Java package).
        </p>
        <ul>
          ${outputHtml}
        </ul>`,
      output
    );

    dropzone.value = '';
  }
}

// @ts-ignore
async function generateVaadinIconset(set, jsName, enumName): { js: string; java: string } {
  const files = await fileListToText(set);
  let size: string | undefined | number;
  // @ts-ignore
  const svgs = files.map((f) => {
    // Get the viewbox size
    // @ts-ignore
    if (!size && f.txt.match(/viewbox/i)) {
      // @ts-ignore
      const viewbox = /viewbox=["']0 0 (.*?) (.*?)["']/i.exec(f.txt);
      if (!viewbox) {
        console.warn('Unusual viewBox definition. Ignoring icon', f.name, f.txt);
      } else {
        if (viewbox[1] != viewbox[2]) {
          size = Math.max(parseInt(viewbox[1]), parseInt(viewbox[2]));
          console.warn('Icons are not square. Using the largest value.', size);
        }
      }
    }

    return `<g id="${jsName}:${f.name}">${f.txt}</g>`;
  });

  if (!size) {
    size = '24'; // Default if not defined by any icon
  }

  const enums = files.map((f) => {
    let name = f.name.toUpperCase().replaceAll('-', '_');
    // Java enums can't start with a number. Prefix with underscore
    if (name.match(/^\d/)) {
      name = '_' + name;
    }
    return name;
  });

  const output = { js: '', java: '' };

  output.js = `import '@vaadin/icon/vaadin-iconset.js';

const template = document.createElement('template');

template.innerHTML = \`<vaadin-iconset name="${jsName}" size="${size}">
  <svg><defs>
    ${svgs.join('\n    ')}
  </defs></svg>
</vaadin-iconset>\`;

document.head.appendChild(template.content);
`;

  output.java = `import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.icon.IconFactory;
import java.util.Locale;

@JsModule("./icons/${jsName}.js")
public enum ${enumName} implements IconFactory {
    ${enums.join(', ')};

    public Icon create() {
        return new Icon(this.name().toLowerCase(Locale.ENGLISH).replace('_', '-').replaceAll("^-", ""));
    }

    public static final class Icon extends com.vaadin.flow.component.icon.Icon {
        Icon(String icon) {
            super("${jsName}", icon);
        }
    }
}`;

  return output;
}

// @ts-ignore
async function fileListToText(fileList) {
  // @ts-ignore
  function getText(file) {
    const reader = new FileReader();
    return new Promise((resolve) => {
      // @ts-ignore
      reader.onload = (e) => {
        // @ts-ignore
        resolve(e.target.result);
      };
      reader.readAsText(file);
    });
  }

  const list = [];

  for (let i = 0; i < fileList.length; i++) {
    const txt = await getText(fileList[i]);
    const name = fileList[i].name.split('.')[0];
    list.push({ name, txt });
  }

  return list;
}

const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);
