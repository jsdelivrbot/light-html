# light-html
> Light weight dom parsing, using template strings.


## Usage

__Install__

`npm i -D tonis2/light-html`;






__Register__

Import directly

```js
import {HTML} from "https://cdn.rawgit.com/tonis2/light-html/master/index.js"
```

or with compiling

```js
import {HTML} from "light-html"

```

__Example__

```js
const apples = SVG`<g xmlns="http://www.w3.org/2000/svg" class="bar">
                      <rect width="40" height="19"></rect>
                      <text x="45" y="9.5" dy=".35em">4 apples</text>
                    </g>`;

const svg = SVG`<svg xmlns="http://www.w3.org/2000/svg" class="chart" width="420" height="150" aria-labelledby="title desc" role="img">
                    <title id="title">A bar chart showing information</title>
                    <desc id="desc">4 apples; 8 bananas; 15 kiwis; 16 oranges; 23 lemons</desc>
                    <g class="bar">
                      <rect width="80" height="19" y="20"></rect>
                      <text x="85" y="28" dy=".35em">8 bananas</text>
                    </g>
                    ${apples}
                    <g class="bar">
                      <rect width="150" height="19" y="40"></rect>
                      <text x="150" y="48" dy=".35em">15 kiwis</text>
                    </g>
                  </svg>`;

let valuesData = ["data1", "data2", "data3"];
let valuesData2 = ["sadas", "xcvxc", "dasdasda"];

let createElement = (values) => HTML`<div id="inner">
                                        ${values.map((value) =>  `<span>${value}</span>`)}
                                      </div>`;

let data = createElement(valuesData);

const randomValue = "test";
let container = HTML`<section onclick="${this.log}" onmouseover="${this.mouseOver}" id="container">
                        <div class="element">${randomValue}</div>
                        <input type="text" value="${randomValue}" > </input>
                        ${data}
                    </section>`;
setTimeout(() => {
  data.update(createElement(valuesData2))
}, 2000)

svg.render(this);
container.render(this);                 
```                          

See working example https://tonis2.github.io/light-html/example/

### Why ?

I needed a light weight library to create all my html elements in javascript, and it should also support SVG, and would not be bloated with code and dependencies.
This is my attempt to fulfill these requirements.
