import {SVG_TAGS} from "./constants.js";

{
  String.prototype.html = function() {
    const svgCheck = SVG_TAGS.map(tag => this.search(`<${tag}`)).filter(output => output > -1).length > 0 ? true : false;
    const parserType = svgCheck ? "image/svg+xml" : "text/html";

    let parser = new DOMParser();
    let doc = parser.parseFromString(this, parserType);

    return svgCheck ? doc.documentElement : doc.body.firstChild;
  };
}
