import {checkIfContains} from "./searchModule.js";
import {UUID} from "../helpers/math.js";

String.prototype.html = function() {
  let parser = new DOMParser();
  let doc = parser.parseFromString(this, "text/html");
  return doc.body.firstChild;
};

String.prototype.svg = function() {
  let parser = new DOMParser();
  let doc = parser.parseFromString(this, "image/svg+xml");
  return doc.documentElement;
};

class Parser {
  constructor(strings, values) {
    this.valuesMap = [];
    this.rawDom = this.createHTML(strings, values);
  }

  addId(string, id) {
    return `${string}" ${id} "`;
  }

  addTemplate(string, id) {
    return `${string} <template ${id}> </template>`;
  }

  createHTML(strings, values) {
    return strings
      .map((string, index) => {
        const id = UUID();
        const value = values[index];

        let event = checkIfContains("eventListeners", string);
        if (event) {
          string = this.addId(string, id);
          this.valuesMap.push({
            id,
            value: value,
            param: event,
            type: "eventListeners"
          });
          return string;
        }

        if (typeof value == "string" || typeof value == "number") {
          string = `${string}${value}`;
          return string;
        } else {
          if(value) {
            string = this.addTemplate(string, id);
            this.valuesMap.push({
              id,
              value: value,
              type: typeof value
            });
          }
          return string;
        }
      })
      .reduce((prev, current) => prev + current)
      .html();
  }

  putValuesToCorrectPlaces(template, values) {
    for (let entry of values) {
      let id = entry.id,
        value = entry.value,
        type = entry.type;

      let container = template.parentNode.querySelector(`*[${id}]`);

      switch (true) {
        case value.nodeType == 1:
          container.replaceWith(value);
          break;

        case type == "eventListeners":
          const eventType = entry.param;
          container[eventType] = value;
          break;

        case Array.isArray(value):
          let fragment = document.createDocumentFragment();
          value.forEach(item => {
            if (!item.nodeType == 1) {
              item = item.html();
            }
            fragment.appendChild(item);
          });
          container.replaceWith(fragment);
          break;
      }
    }

    return template;
  }

  getHTML() {
    return this.putValuesToCorrectPlaces(this.rawDom, this.valuesMap);
  }

  getSVG() {
    let html = this.putValuesToCorrectPlaces(this.rawDom, this.valuesMap);
    html.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    let svg = html.outerHTML.svg();
    return svg;
  }
}

export default Parser;
