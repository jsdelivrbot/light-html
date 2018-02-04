String.prototype.html = function() {
  let parser = new DOMParser();
  let doc = parser.parseFromString(this, "text/html");
  return doc.body.children;
};



class HTML {
  constructor(strings, ...values) {
    this.strings = strings;
    this.values = [...values];
    this.dom = this.parseHTML();
  }

  parseHTML() {
    let {values, strings} = this;

    let domifyStrings = strings.reduce((previous, current, index) => {
      let html, element;
      let value = values[index - (strings.length - 2)];

      html = typeof previous == "string" ? previous.html() : previous;

      let lastChild = null;

      if (value) {
        lastChild = html[html.length - 1];
        if(value.nodeType !== 1) {
          lastChild.removeChild(
            lastChild.childNodes[lastChild.childNodes.length - 1]
          );
        }
      }

      if (value.nodeType == 1) {
        element = value;
      } else {
        let elementType = current.replace("</", "").replace(">", "");
        element = `<${elementType}>${value}</${elementType}>`.html();
      }

      if (lastChild) {
         lastChild.appendChild(element.length > 0 ? element[0] : element);
      }

      return html;
    });
    return domifyStrings;
  }
  
}

export default function html(strings, ...values) {
  return new HTML(strings, ...values)
}
