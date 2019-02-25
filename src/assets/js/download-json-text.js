var downloadJsonText = function (filename, text) {
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:application/json;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);
  element.click();
}
module.exports = downloadJsonText;