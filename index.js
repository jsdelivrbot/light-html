import { UUID } from "./helpers/math.js";
import { eventsList } from "./helpers/constants.js";
import "./helpers/parser.js";

class HTML {
  constructor(strings, values) {
    this.values = values;
    this.dom = this.parseHTML(strings);
    this.render = this.render.bind(this);
  }

  render(container) {
    let domElements = this.dom;
    container.appendChild(domElements);
  }

  remove() {
    this.dom.remove();
  }

  replaceTemplatesWithValues(template, values) {
    for (let entry of values) {
      let id = entry.id,
        value = entry.value;

      let container = template.parentNode.querySelector(`*[data-${id}]`);

      if (value.nodeType == 1) {
        container.replaceWith(value);
      } else if (typeof value === "string") {
        container.parentNode.innerHTML = value;
      } else if (typeof value === "function") {
        const eventType = entry.type;
        container.addEventListener(eventType, value);
      } else if (Array.isArray(value)) {
        let fragment = document.createDocumentFragment();
        value.forEach(item => {
          fragment.appendChild(item.html());
        });
        container.replaceWith(fragment);
      }
    }
    return template;
  }

  checkEvent(string) {
    let checkForEvents = eventsList
      .map(event => {
        let result = string.search(event);
        if (result > 0) {
          return event;
        } else {
          return null;
        }
      })
      .filter(result => result)[0];

    return checkForEvents ? checkForEvents : false;
  }

  parseHTML(strings) {
    let { values } = this;
    let valuesMap = [];

    let rawTemplate = strings
      .map((string, index) => {
        let id = UUID();

        //Skip last string
        if (index + 1 != strings.length) {
          let checkEvent = this.checkEvent(string);
          if (checkEvent) {
            string = `${string}" data-${id}=""`;
            valuesMap.push({ id, value: values[index], type: checkEvent });
          } else {
            valuesMap.push({ id, value: values[index] });
            string = `${string} <template data-${id}="" > </template>`;
          }
        }
        return string;
      })
      .reduce((prev, current) => prev + current)
      .html();

    return this.replaceTemplatesWithValues(rawTemplate, valuesMap);
  }
}

export default function html(strings, ...values) {
  let valuesArray = [...values];
  return new HTML(strings, valuesArray);
}
