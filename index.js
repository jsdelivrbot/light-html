import html from "./parser.js";

class Component extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  log() {
    console.log("works")
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
    let link = html`<a href="">LINK</a>`;
        link.onclick = this.log;

    let container = html`<section onclick="${this.log}" id="container">
                            <div class="element">${value}</div>
                            ${link.dom}
                            ${innerContainer.dom}
                        </section>
                        `
      console.log(container)
      container.render(this);
  }
}

customElements.define("test-html", Component);
