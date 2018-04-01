import {
  createTemplateString,
  putValuesToCorrectPlaces
} from "../helpers/parserHelpers.js";

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
    this.template = createTemplateString(strings, values);
  }

  getHTML() {
    let html = putValuesToCorrectPlaces(
      this.template.string.html(),
      this.template.valuesMap
    );
    return html;
  }

  getSVG() {
    let html = putValuesToCorrectPlaces(
      this.template.string.html(),
      this.template.valuesMap
    );
    html.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    let svg = html.outerHTML.svg();
    return svg;
  }
}

export default Parser;
