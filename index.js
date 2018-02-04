import html from "./parser.js";
import html2 from "./parser2.js";

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
  let value = "pask"
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
    console.log(body)              
}
}

customElements.define("test-html", Component);
