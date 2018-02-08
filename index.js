import html from "./parser.js";

class Component extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  log() {
    console.log("shit")
  }

  mouseOver() {
    console.log("mouseOver")
  }

  render() {
    let value = "random";

    let innerContainer = html`
                              <div id="inner">
                                <span>${value}</span>
                                <span>${value}</span>
                                <span>${value}</span>
                              </div>
                              `;

    let container = html`<section onmouseover="${this.mouseOver}" onclick="${this.log}" id="container">
                            <div class="element">${value}</div>
                            ${innerContainer.dom}
                        </section>
                        `

      container.render(this);

      value = "sitarada";

      innerContainer.remove();
  }
}


customElements.define("test-html", Component);
