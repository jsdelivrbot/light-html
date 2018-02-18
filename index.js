import {UUID} from "./helpers/math.js";
import {eventsList} from "./helpers/constants.js";
import "./helpers/parser.js";

class HTML {
  constructor(strings, values) {
    this.values = values;
    this.strings = strings;
    this.dom = this.parseHTML();
    this.render = this.render.bind(this);
    this.update = this.render.bind(this);
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

  //Put the values where they should be in raw dom.
  replaceTemplatesWithValues(template, values) {
    for (let entry of values) {
      let id = entry.id,
        value = entry.value;

      let container = template.parentNode.querySelector(`*[data-${id}]`);
      switch (true) {
        case value.nodeType == 1:
          container.replaceWith(value);
          break;

        case typeof entry.event == "string":
          const eventType = entry.event;
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

  //Check if string contains click event, or default value.
  checkEvent(string) {
    let finding = eventsList.find((event) => string.search(event) > 0);
    return finding;
  }

  //Make raw dom that has templates on places where values should be.
  // After templates are added, go to next phase and replace templates with true values
  parseHTML() {
    let {
      values,
      strings
    } = this;
    let valuesMap = [];

    let rawDom = strings
      .map((string, index) => {
        const id = UUID();
        const notLastString = index + 1 != strings.length;

        if (notLastString) {
          let checkEvent = this.checkEvent(string);
          if (checkEvent) {
            string = `${string}" data-${id}="`;
            valuesMap.push({
              id,
              value: values[index],
              event: checkEvent
            });
          } else {
            if (typeof values[index] == "string") {
              string = `${string} ${values[index]}`;
            } else {
              valuesMap.push({
                id,
                value: values[index]
              });
              string = `${string} <template data-${id}=""> </template>`;
            }
          }
        }
        return string;
      })
      .reduce((prev, current) => prev + current)
      .html();

    let domWithValues = this.replaceTemplatesWithValues(rawDom, valuesMap);
    this.attachFunctionsToDom(domWithValues);
    return domWithValues;
  }

  attachFunctionsToDom(dom) {
    dom.render = this.render;
    dom.update = this.update;
  }
}

export default function html(strings, ...values) {
  let valuesArray = [...values];
  return new HTML(strings, valuesArray);
}
