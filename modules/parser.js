import { checkIfContains } from "./searchModule.js";
import { UUID } from "../helpers/math.js";

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
    return `${string}" data-${id}="`;
  }

  addTemplate(string, id) {
    return `${string} <template data-${id}=""> </template>`;
  }

  createHTML(strings, values) {
    return strings
      .map((string, index) => {
        const id = UUID();
        const notLastString = index + 1 != strings.length;
        const value = values[index];

        if (notLastString) {
          let event = checkIfContains("eventListeners", string);
          if (event) {
            string = this.addId(string, id);
            this.valuesMap.push({
              id,
              value: value,
              param: event,
              type: "eventListeners"
            });
          } else {
            if (typeof value == "string" || typeof value == "number") {
              let attribute = checkIfContains("attributes", string);
              if (attribute) {
                string = this.addId(string, id);
                this.valuesMap.push({
                  id,
                  value: value,
                  param: attribute,
                  type: "attribute"
                });
              } else {
                string = this.addTemplate(string, id);
                this.valuesMap.push({
                  id,
                  value: value,
                  type: "value"
                });
              }
            } else {
              string = this.addTemplate(string, id);
              this.valuesMap.push({
                id,
                value: value
              });
            }
          }
        }
        return string;
      })
      .reduce((prev, current) => prev + current)
      .html();
  }

  putValuesToCorrectPlaces(template, values) {
    for (let entry of values) {
      let id = entry.id,
        value = entry.value,
        type = entry.type;

      let container = template.parentNode.querySelector(`*[data-${id}]`);

      switch (true) {
        case type == "value" || type == "attribute":
          if (type == "value") {
            container.parentNode.innerHTML = value;
          } else if (type == "attribute") {
            container.setAttribute(entry.param, entry.value);
          }
          break;

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
