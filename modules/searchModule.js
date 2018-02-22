import { eventsList } from "../helpers/constants.js";

export const checkIfContains = (type, string) => {
    switch (type) {
      case "eventListeners":
        return eventsList.find(event => string.search(event) > 0);
        break;
    }
}
