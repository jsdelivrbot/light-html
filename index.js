import Parser from "./modules/parser.js";

class ELEMENT {
  constructor(strings, values, type) {
    this.values = values;
    this.strings = strings;
    this.type = type;
    this.dom = this.parseHTML();
    this.render = this.render.bind(this);
    this.update = this.update.bind(this);
    return this.dom;
  }

  //Render dom to the website
  render(container) {
    container.appendChild(this);
  }

  update() {
    console.log(this.values);
  }

  //Remove dom from the website
  remove() {
    this.dom.remove();
  }

  parseHTML() {
    let { values, strings, type } = this;
    let parser = new Parser(strings, values);
    let result = type == "HTML" ? parser.getHTML() : parser.getSVG();
    this.attachFunctionsToDom(result);
    return result;
  }

  attachFunctionsToDom(dom) {
    dom.render = this.render;
    dom.update = this.update;
  }
}


export function HTML(strings, ...values) {
  let valuesArray = [...values];
  const type = "HTML";
  return new ELEMENT(strings, valuesArray, type);
}

export function SVG(strings, ...values) {
  let valuesArray = [...values];
  const type = "SVG";
  return new ELEMENT(strings, valuesArray, type);
}
