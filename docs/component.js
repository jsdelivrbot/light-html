import html from "./light-html.m.js";

class Component extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  log() {
    console.log("click event");
  }

  mouseOver() {
    console.log("mouseOver");
  }

  render() {
    const apples = html`<g xmlns="http://www.w3.org/2000/svg" class="bar">
                          <rect width="40" height="19"></rect>
                          <text x="45" y="9.5" dy=".35em">4 apples</text>
                        </g>`;

    const svg = html`<svg xmlns="http://www.w3.org/2000/svg" class="chart" width="420" height="150" aria-labelledby="title desc" role="img">
                        <title id="title">A bar chart showing information</title>
                        <desc id="desc">4 apples; 8 bananas; 15 kiwis; 16 oranges; 23 lemons</desc>
                        <g class="bar">
                          <rect width="80" height="19" y="20"></rect>
                          <text x="85" y="28" dy=".35em">8 bananas</text>
                        </g>
                        ${apples.dom}
                        <g class="bar">
                          <rect width="150" height="19" y="40"></rect>
                          <text x="150" y="48" dy=".35em">15 kiwis</text>
                        </g>
                        <g class="bar">
                          <rect width="160" height="19" y="60"></rect>
                          <text x="161" y="68" dy=".35em">16 oranges</text>
                        </g>
                        <g class="bar">
                          <rect width="230" height="19" y="80"></rect>
                          <text x="235" y="88" dy=".35em">23 lemons</text>
                        </g>
                      </svg>`;

    let value = "random";
    let innerContainer = html`
                              <div id="inner">
                                <span>${value}</span>
                                <span>${value}</span>
                                <span>${value}</span>
                              </div>
                              `;

    let container = html`<section onclick="${this.log}" onmouseover="${this.mouseOver}" id="container">
                            <div class="element">${value}</div>
                            ${innerContainer.dom}
                        </section>`;

    svg.render(this);
    container.render(this);
  }
}

customElements.define("test-html", Component);