import html from "./parser.js";

class Component extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    let testDom = document.createElement("div");
    testDom.innerHTML = `<span>te</span>
                           <span>pask</span>
                           <span>sitt</span>`;
    let value = "juurvili";
    let body = html`<div>
                    <h3>Tere</h3>
                    <span>Pask</span>
                  </div>
                  <div id="test">
                    <h3>test</h3>
                    <span>${value}</span>
                    ${testDom}
                  </div>
                  `;
  }
}

customElements.define("test-html", Component);
