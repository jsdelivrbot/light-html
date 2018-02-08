import { UUID } from "../helpers/math.js";
import { eventsList } from "../helpers/constants.js";
import "../helpers/parser.js"


class HTML {
  constructor(strings, ...values) {
    this.values = [...values];
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

      let container = template.parentNode.querySelector(`*[id-${id}]`);
      if (value.nodeType == 1) {
        let parent = container.parentNode;
        parent.removeChild(container);
        parent.appendChild(value);
      } else if (typeof value === "string") {
        container.parentNode.innerHTML = value;
      } else if (typeof value === "function") {
        const eventType = entry.type;
        container.addEventListener(eventType, value);
      }
    }
    return template;
  }

  checkClickEvents(string) {
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

    let templateDom = strings
      .map((string, index) => {
        let id = UUID();
        if (index + 1 != strings.length) {
          let clickEvent = this.checkClickEvents(string);
          if (clickEvent) {
            string = `${string}" id-${id} "`;
            valuesMap.push({ id, value: values[index], type: clickEvent });
          } else {
            valuesMap.push({ id, value: values[index] });
            string = `${string} <template id-${id}> </template>`;
          }
        }
        return string;
      })
      .reduce((prev, current) => prev + current)
      .html();

    return this.replaceTemplatesWithValues(templateDom, valuesMap);
  }
}

export default function html(strings, ...values) {
  return new HTML(strings, ...values);
}
