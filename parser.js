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
    for ( let entry of values) {
      let id = entry.id, value = entry.value;
      let container = template.parentNode.querySelector(`*[data-selector=${id}]`);

      if(value.nodeType == 1) {
        let parent = container.parentNode;
        parent.removeChild(container);
        parent.appendChild(value);
      } else if (typeof value === "string") {
        container.parentNode.innerHTML = value;
      } else if(typeof value === "function") {
        const eventType = "click";
        container.addEventListener(eventType, value);
      }
    }
    return template;
  }

  parseHTML() {
    let { values, strings } = this;
    let valuesMap = [];

    let templateDom = strings
      .map((string, index) => {
        let id = UUID();

        if((index + 1) != strings.length) {
          if(string.indexOf("onclick") > -1) {
            string = `${string}" data-selector=${id} data-="`;
            valuesMap.push({id, value:values[index]});
          } else {
            valuesMap.push({id, value:values[index]});
            string = `${string} <template data-selector=${id}> </template>`
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
