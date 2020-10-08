import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/selectConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-select/vaadin-select';
import '@vaadin/vaadin-list-box/vaadin-list-box';
import '@vaadin/vaadin-item/vaadin-item';

@customElement('select-rich')
export class Example extends LitElement {
  render() {
    let people: Array<Array<string>>;
    people = [["Leelah Leatherbarrow","Allergist"],
      ["Gladys Kanyinda", "Dermatologist"],
      ["Ogasawara Katsumi","Cardiologist"],
      ["Yi Hanying", "Endocrinologist"]];

    return html`
      <!-- tag::snippet[] -->
      <vaadin-select
        label="Sort by"
        .renderer=${(root: HTMLElement) =>
          render(
            html`
              <vaadin-list-box>
                <style>
                  .person-title {
                    display: block;
                    color: gray;
                    font-size: 80%;
                  }
                  .person-info {display: inline-block;}
                  .person-info div {display: block;}
                  .person-img {
                    width: 42px;
                    border-radius: 50%;
                    vertical-align: top;
                  }
                </style>
                ${people.map((value,index) => html`
                <vaadin-item>
                  <img class="person-img"
                       src="${this.imageSource(index)}">
                  <div class="person-info">
                    ${value[0]}
                    <div class="person-title">${value[1]}</div>
                  </div>
                </vaadin-item>
                `)}
            `,
            root
          )}
      ></vaadin-select>
      <!-- end::snippet[] -->
    `;
  }

  imageSource(imageNo: number) {
    return "https://randomuser.me/api/portraits/women/" + imageNo + ".jpg"
  }
}
