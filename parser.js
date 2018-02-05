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

  parseHTML() {
    let { values, strings } = this;
    let valuesMap = new Map();

    let newStrings = strings
      .map((string, index) => {
        let id = UUID();
        valuesMap.set(id, values[index]);
        let newString =
          index + 1 == strings.length
            ? string
            : `${string} <template id=${id}> </template>`;
        return newString;
      })
      .reduce((prev, current) => {
        return prev + current;
      });

      console.log(newStrings.html())
  }
}

export default function html(strings, ...values) {
  return new HTML(strings, ...values);
}
