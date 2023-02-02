import { css, html, LitElement, render } from 'lit';
import type { TemplateResult } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { convertToEnumName, generateVaadinIconset } from './iconset-helpers';

const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);

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
      color: inherit;
      font-family: var(--docs-font-family-monospace);
      border: 0;
      padding: var(--docs-space-m);
      margin: 0;
      resize: vertical;
      pointer-events: auto;
      box-sizing: border-box;
    }

    .output ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .output li {
      border: 2px solid var(--docs-divider-color-1);
      border-radius: var(--docs-border-radius-l);
      margin: var(--docs-space-s) 0;
      position: relative;
    }

    .output li details {
      font-size: var(--docs-font-size-xs);
      pointer-events: none;
      margin-top: -2em;
    }

    .output summary {
      cursor: pointer;
      padding: 0 var(--docs-space-m);
      padding-bottom: var(--docs-space-s);
      width: max-content;
      pointer-events: auto;
      color: var(--docs-secondary-text-color);
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
      padding: var(--docs-space-s) var(--docs-space-m);
      padding-bottom: 2em;
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
      top: 1.25em;
      right: 0;
      pointer-events: none;
      font-size: 1.25em;
      line-height: 1;
    }

    .output details :is(p, label) {
      padding: 0 var(--docs-space-m);
      margin-top: 0;
    }
  `;

  @query('.output')
  private output!: HTMLElement;

  @query('.name')
  private nameInput!: HTMLInputElement;

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
            @change=${this.handleFiles}
          />
        </div>
      </div>
      <small>Upload a folder, or nested folders, of <code>.svg</code> files.</small>
      <div class="output"></div>
    `;
  }

  handleDragOver(e: DragEvent) {
    e.preventDefault();
    this.classList.add('drag-active');
  }

  handleDragLeave() {
    this.classList.remove('drag-active');
  }

  async handleFiles(event: Event) {
    const dropzone = event.target as HTMLInputElement;

    const iconsets: Record<string, File[]> = {};
    const name = this.nameInput.value;
    let folderName = '';

    // Categorize into sets based on folder path
    const files = dropzone.files ?? [];
    [...files].forEach((f) => {
      if (f.webkitRelativePath) {
        const parts = f.webkitRelativePath.split(/\/|\\/);
        folderName = parts[parts.length - 2].toLowerCase();
      }

      const iconsetName = folderName || '';

      let set = iconsets[iconsetName];
      if (!set) {
        iconsets[iconsetName] = [];
        set = iconsets[iconsetName];
      }
      set.push(f);
    });

    const promises = Object.entries(iconsets).map(
      async ([iconsetName, set]): Promise<TemplateResult> => {
        // Sort alphabetically
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

        const jsName = enumName.replace(/([a-z])([A-Z]+)/g, '$1-$2').toLowerCase();

        // Generate <vaadin-iconset> JS import and Java enum class
        const iconsetStrings = await generateVaadinIconset(set, jsName, enumName);

        const jsBlob = new Blob([iconsetStrings.js], { type: 'text/plain' });
        const javaBlob = new Blob([iconsetStrings.java], { type: 'text/plain' });

        return html`
          <li>
            <a download="${jsName}.js" .href=${URL.createObjectURL(jsBlob)}>${jsName}.js</a>
            <details>
              <summary>Usage and contents</summary>
              <p>
                <b>Usage:</b>
                <code>
                  &lt;vaadin-icon icon="${jsName}:${set[0].name.split('.')[0]}">&lt;/vaadin-icon>
                </code>
              </p>
              <label for="jsOutput"><b>File contents:</b></label>
              <textarea readonly id="jsOutput">${iconsetStrings.js}</textarea>
            </details>
          </li>
          <li>
            <a download="${enumName}.java" .href=${URL.createObjectURL(javaBlob)}>
              ${enumName}.java
            </a>
            <details>
              <summary>Usage and contents</summary>
              <p>
                <b>Usage:</b>
                <code>${enumName}.${convertToEnumName(set[0].name.split('.')[0])}.create();</code>
              </p>
              <label for="javaOutput"><b>File contents:</b></label>
              <textarea readonly id="javaOutput">${iconsetStrings.java}</textarea>
            </details>
          </li>
        `;
      }
    );

    const outputHtml = await Promise.all(promises);

    const plural = Object.keys(iconsets).length > 1;

    const tFiles = plural ? 'files are' : 'file is';
    const tThem = plural ? 'them' : 'it';

    render(
      html`
        <p>
          Download the following files. The <code>.js</code> ${tFiles} required.
          Place ${tThem} into the <code>frontend/icons/</code> folder.
        </p>
          The <code>.java</code> ${tFiles} optional.
          Place ${tThem} under the <code>src/</code> folder (you are free to choose the Java
          package).
        </p>
        <ul>
          ${outputHtml}
        </ul>
      `,
      this.output
    );

    dropzone.value = '';
  }
}
