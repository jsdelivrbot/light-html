import { UUID } from "./math.js";
import { eventsList } from "./constants.js";

const checkIfContains = (type, string) => {
    switch (type) {
      case "eventListeners":
        return eventsList.find(event => string.search(event) > 0);
        break;
    }
  },
  addId = (string, id) => {
    return `${string}" ${id} "`;
  },
  addTemplate = (string, id) => {
    return `${string} <template ${id}> </template>`;
  };

export const createTemplateString = (strings, values) => {
  let valuesMap = [];
  let string = strings
    .map((string, index) => {
      const id = UUID();
      const value = values[index];
      let event = checkIfContains("eventListeners", string);
      if (event) {
        string = addId(string, id);
        valuesMap.push({
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
        if (value) {
          string = addTemplate(string, id);
          valuesMap.push({
            id,
            value: value,
            type: typeof value
          });
        }
        return string;
      }
    })
    .reduce((prev, current) => prev + current);
  return { string, valuesMap };
};

export const putValuesToCorrectPlaces = (template, values) => {
  for (let entry of values) {
    let { type, value, id } = entry;
    let container = template.parentNode.querySelector(`*[${id}]`);
    switch (true) {
      case type == "eventListeners":
        const eventType = entry.param;
        container[eventType] = value;
        break;

      case value.nodeType == 1:
        container.replaceWith(value);
        break;

      case Array.isArray(value):
        let fragment = document.createDocumentFragment();
        value.forEach(item => {
          if (!item.nodeType == 1) item = item.html();
          fragment.appendChild(item);
        });
        container.replaceWith(fragment);
        break;
    }
  }
  return template;
};
