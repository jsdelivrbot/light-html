import {SVG_TAGS} from "./constants.js";

{
  String.prototype.html = function() {
    const svgCheck = SVG_TAGS.find((tag) => this.search(`<${tag}`) > -1);
    const parserType = svgCheck ? "image/svg+xml" : "text/html";

    let parser = new DOMParser();
    let doc = parser.parseFromString(this, parserType);

    return svgCheck ? doc.documentElement : doc.body.firstChild;
  };
}
