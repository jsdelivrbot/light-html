import { UUID } from "./helpers/math.js";
import { eventsList } from "./helpers/constants.js";
import "./helpers/parser.js";

class HTML {
  constructor(strings, values) {
    this.values = values;
    this.dom = this.parseHTML(strings);
    this.render = this.render.bind(this);
  }

  //Render dom to the website
  render(container) {
    let domElements = this.dom;
    container.appendChild(domElements);
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

      if (value.nodeType == 1) {
        container.replaceWith(value);
      } else if (typeof value === "function") {
        const eventType = entry.type;
        container.addEventListener(eventType, value);
      } else if (Array.isArray(value)) {
        let fragment = document.createDocumentFragment();
        value.forEach(item => {
          if (!item.nodeType == 1) {
            item = item.html();
          }
          fragment.appendChild(item);
        });
        container.replaceWith(fragment);
      }

      container.removeAttribute(`data-${id}`);
    }
    return template;
  }

  //Check if string contains click event, or default value.
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

  //Make raw dom that has templates on places where values should be.
  // After templates are added, go to next phase and replace templates with true values
  parseHTML(strings) {
    let { values } = this;
    let valuesMap = [];
    let rawDom = strings
      .map((string, index) => {
        const id = UUID();
        //Skip last string
        if (index + 1 != strings.length) {
          let checkEvent = this.checkEvent(string);
          if (checkEvent) {
            string = `${string}" data-${id}="`;
            valuesMap.push({ id, value: values[index], type: checkEvent });
          } else {
            if (typeof values[index] == "string") {
              string = `${string} ${values[index]}`;
            } else {
              valuesMap.push({ id, value: values[index] });
              string = `${string} <template data-${id}=""> </template>`;
            }
          }
        }
        return string;
      })
      .reduce((prev, current) => prev + current)
      .html();
    //Replace the templates inside
    let domWithValues = this.replaceTemplatesWithValues(rawDom, valuesMap);


    return domWithValues
  }
}

export default function html(strings, ...values) {
  let valuesArray = [...values];
  return new HTML(strings, valuesArray);
}
