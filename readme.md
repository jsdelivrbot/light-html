# light-html
> Light weight dom parsing, using template strings.


## Usage

__Install__

`npm i -D tonis2/light-html`;


__Register__
```
import html from "light-html";

```

__Example__

```
import html from "light-html";

let value = "random";
let element = html`
                  <div id="inner">
                    <span>${value}</span>
                    <span>${value}</span>
                    <span>${value}</span>
                  </div>`;

let container = html`<section onclick="${this.click}" onmouseover="${this.mouseOver}" id="container">
                          <p class="element">${value}</p>
                          ${element.dom}
                      </section>`;                  

container.render(document.body);                  
```                          

See working example https://tonis2.github.io/light-html/example/

### Why ?

I needed a light weight library to create all my html elements in javascript, and it should also support SVG, and would not be bloated with code and dependencies.
This is my attempt to fulfill these requirements.
