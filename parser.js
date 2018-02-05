import { UUID } from "../helpers/math.js";

String.prototype.html = function() {
  let parser = new DOMParser();
  let doc = parser.parseFromString(this, "text/html");
  return doc.body.children[0];
};

class HTML {
  constructor(strings, ...values) {
    this.strings = strings;
    this.values = [...values];
    this.dom = this.parseHTML();
    this.render = this.render.bind(this);
  }

  render(container) {
    let domElements = this.dom;
    container.appendChild(domElements);
  }


  replaceTemplatesWithValues(template, values) {
    for ( let value of values) {
      let id = value[0], entry = value[1];
      console.log(id, entry)
      // let temp = template.querySelector(`#${id}`);
      //
      // if(entry.nodeType == 1) {
      //   template.replaceChild(template, entry);
      // } else if (typeof entry == "string") {
      //   console.log(temp)
      // }
    }
  }

  parseHTML() {
    let { values, strings } = this;
    let valuesMap = new Map();

    let templateDom = strings
      .map((string, index) => {
        let id = UUID();
        if((index + 1) != strings.length) {
           valuesMap.set(id, values[index]);
           string = `${string} <template id=${id}> </template>`
        }
        return string;
      })
      .reduce((prev, current) => prev + current)
      .html();

      this.replaceTemplatesWithValues(templateDom, valuesMap);
  }
}

export default function html(strings, ...values) {
  return new HTML(strings, ...values);
}
