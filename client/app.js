"use strict";

var _module = require("./module");
var App = function App() {
  var style = (0, _module.aiCss)("\n    an element with good contrast of light blue\n  ");
  return /*#__PURE__*/React.createElement("div", {
    className: style
  }, "Hey There \uD83D\uDC4B\uD83C\uDFFB");
};

/// mount
var rootElement = document.getElementById("root");
var root = ReactDOM.createRoot(rootElement);
root.render( /*#__PURE__*/React.createElement(App, null));