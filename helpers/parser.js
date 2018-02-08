{
  String.prototype.html = function() {
    let parser = new DOMParser();
    let doc = parser.parseFromString(this, "text/html");
    return doc.body.firstChild;
  };
}
