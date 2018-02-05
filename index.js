import html from "./parser.js";

class Component extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }
  log() {
    console.log('works')
  }

  render() {
    let value = "juurvili";
    let testDom = html`<div>
                        <span>te</span>
                         <span>pask</span>
                         <section id="test">
                           <span>${value}</span>
                          <div id="test2">
                            <p>${value}</p>
                          </div>
                         </section>
                       </div>`;

      console.log(testDom)
    // let body = html`<div>
    //                   <div>
    //                     <h3>Tere</h3>
    //                     <span>Pask</span>
    //                   </div>
    //                     <div id="test">
    //                       <h3>test</h3>
    //                       <span>${value}</span>
    //                       ${testDom.dom}
    //                     </div>
    //                   </div>
    //                 `;
    //
    //     body.render(this);
  }
}

customElements.define("test-html", Component);
