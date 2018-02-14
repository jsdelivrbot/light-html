# light-html
> Light weight dom parsing, using template strings.


## Usage

__Install__

`npm i -D tonis2/light-html`;






__Register__

Import directly

```js
import html from "https://cdn.jsdelivr.net/gh/tonis2/light-html@1.0/index.js"
```

or with compiling

```js
import html from "light-html"

```

__Example__

```js
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
                  </svg>`;

let values = ["data1", "data2", "data3"];
let innerContainer = html`
                          <div id="inner">
                            ${values.map((value) => {return `<span>${value}</span>`})}
                          </div>`;

const randomValue = "test";
let container = html`<section onclick="${this.log}" onmouseover="${this.mouseOver}" id="container">
                        <div class="element">${randomValue}</div>
                        <input type="text" value="${randomValue}" > </input>
                        ${innerContainer.dom}
                    </section>`;

svg.render(this);
container.render(this);                 
```                          

See working example https://tonis2.github.io/light-html/example/

### Why ?

I needed a light weight library to create all my html elements in javascript, and it should also support SVG, and would not be bloated with code and dependencies.
This is my attempt to fulfill these requirements.
