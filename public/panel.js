(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, copyDefault, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toESM = (module, isNodeMode) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/json-formatter-js/dist/json-formatter.umd.js
  var require_json_formatter_umd = __commonJS({
    "node_modules/json-formatter-js/dist/json-formatter.umd.js"(exports, module) {
      !function(t, e) {
        typeof exports == "object" && typeof module != "undefined" ? module.exports = e() : typeof define == "function" && define.amd ? define(e) : (t = t || self).JSONFormatter = e();
      }(exports, function() {
        "use strict";
        function t(t2) {
          return t2 === null ? "null" : typeof t2;
        }
        function e(t2) {
          return !!t2 && typeof t2 == "object";
        }
        function r(t2) {
          if (t2 === void 0)
            return "";
          if (t2 === null)
            return "Object";
          if (typeof t2 == "object" && !t2.constructor)
            return "Object";
          var e2 = /function ([^(]*)/.exec(t2.constructor.toString());
          return e2 && e2.length > 1 ? e2[1] : "";
        }
        function n(t2, e2, r2) {
          return t2 === "null" || t2 === "undefined" ? t2 : (t2 !== "string" && t2 !== "stringifiable" || (r2 = '"' + r2.replace(/"/g, '\\"') + '"'), t2 === "function" ? e2.toString().replace(/[\r\n]/g, "").replace(/\{.*\}/, "") + "{\u2026}" : r2);
        }
        function o(o2) {
          var i2 = "";
          return e(o2) ? (i2 = r(o2), Array.isArray(o2) && (i2 += "[" + o2.length + "]")) : i2 = n(t(o2), o2, o2), i2;
        }
        function i(t2) {
          return "json-formatter-" + t2;
        }
        function s(t2, e2, r2) {
          var n2 = document.createElement(t2);
          return e2 && n2.classList.add(i(e2)), r2 !== void 0 && (r2 instanceof Node ? n2.appendChild(r2) : n2.appendChild(document.createTextNode(String(r2)))), n2;
        }
        !function(t2) {
          if (t2 && typeof window != "undefined") {
            var e2 = document.createElement("style");
            e2.setAttribute("media", "screen"), e2.innerHTML = t2, document.head.appendChild(e2);
          }
        }('.json-formatter-row {\n  font-family: monospace;\n}\n.json-formatter-row,\n.json-formatter-row a,\n.json-formatter-row a:hover {\n  color: black;\n  text-decoration: none;\n}\n.json-formatter-row .json-formatter-row {\n  margin-left: 1rem;\n}\n.json-formatter-row .json-formatter-children.json-formatter-empty {\n  opacity: 0.5;\n  margin-left: 1rem;\n}\n.json-formatter-row .json-formatter-children.json-formatter-empty:after {\n  display: none;\n}\n.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-object:after {\n  content: "No properties";\n}\n.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-array:after {\n  content: "[]";\n}\n.json-formatter-row .json-formatter-string,\n.json-formatter-row .json-formatter-stringifiable {\n  color: green;\n  white-space: pre;\n  word-wrap: break-word;\n}\n.json-formatter-row .json-formatter-number {\n  color: blue;\n}\n.json-formatter-row .json-formatter-boolean {\n  color: red;\n}\n.json-formatter-row .json-formatter-null {\n  color: #855A00;\n}\n.json-formatter-row .json-formatter-undefined {\n  color: #ca0b69;\n}\n.json-formatter-row .json-formatter-function {\n  color: #FF20ED;\n}\n.json-formatter-row .json-formatter-date {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n.json-formatter-row .json-formatter-url {\n  text-decoration: underline;\n  color: blue;\n  cursor: pointer;\n}\n.json-formatter-row .json-formatter-bracket {\n  color: blue;\n}\n.json-formatter-row .json-formatter-key {\n  color: #00008B;\n  padding-right: 0.2rem;\n}\n.json-formatter-row .json-formatter-toggler-link {\n  cursor: pointer;\n}\n.json-formatter-row .json-formatter-toggler {\n  line-height: 1.2rem;\n  font-size: 0.7rem;\n  vertical-align: middle;\n  opacity: 0.6;\n  cursor: pointer;\n  padding-right: 0.2rem;\n}\n.json-formatter-row .json-formatter-toggler:after {\n  display: inline-block;\n  transition: transform 100ms ease-in;\n  content: "\u25BA";\n}\n.json-formatter-row > a > .json-formatter-preview-text {\n  opacity: 0;\n  transition: opacity 0.15s ease-in;\n  font-style: italic;\n}\n.json-formatter-row:hover > a > .json-formatter-preview-text {\n  opacity: 0.6;\n}\n.json-formatter-row.json-formatter-open > .json-formatter-toggler-link .json-formatter-toggler:after {\n  transform: rotate(90deg);\n}\n.json-formatter-row.json-formatter-open > .json-formatter-children:after {\n  display: inline-block;\n}\n.json-formatter-row.json-formatter-open > a > .json-formatter-preview-text {\n  display: none;\n}\n.json-formatter-row.json-formatter-open.json-formatter-empty:after {\n  display: block;\n}\n.json-formatter-dark.json-formatter-row {\n  font-family: monospace;\n}\n.json-formatter-dark.json-formatter-row,\n.json-formatter-dark.json-formatter-row a,\n.json-formatter-dark.json-formatter-row a:hover {\n  color: white;\n  text-decoration: none;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-row {\n  margin-left: 1rem;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty {\n  opacity: 0.5;\n  margin-left: 1rem;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty:after {\n  display: none;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-object:after {\n  content: "No properties";\n}\n.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-array:after {\n  content: "[]";\n}\n.json-formatter-dark.json-formatter-row .json-formatter-string,\n.json-formatter-dark.json-formatter-row .json-formatter-stringifiable {\n  color: #31F031;\n  white-space: pre;\n  word-wrap: break-word;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-number {\n  color: #66C2FF;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-boolean {\n  color: #EC4242;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-null {\n  color: #EEC97D;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-undefined {\n  color: #ef8fbe;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-function {\n  color: #FD48CB;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-date {\n  background-color: rgba(255, 255, 255, 0.05);\n}\n.json-formatter-dark.json-formatter-row .json-formatter-url {\n  text-decoration: underline;\n  color: #027BFF;\n  cursor: pointer;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-bracket {\n  color: #9494FF;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-key {\n  color: #23A0DB;\n  padding-right: 0.2rem;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-toggler-link {\n  cursor: pointer;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-toggler {\n  line-height: 1.2rem;\n  font-size: 0.7rem;\n  vertical-align: middle;\n  opacity: 0.6;\n  cursor: pointer;\n  padding-right: 0.2rem;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-toggler:after {\n  display: inline-block;\n  transition: transform 100ms ease-in;\n  content: "\u25BA";\n}\n.json-formatter-dark.json-formatter-row > a > .json-formatter-preview-text {\n  opacity: 0;\n  transition: opacity 0.15s ease-in;\n  font-style: italic;\n}\n.json-formatter-dark.json-formatter-row:hover > a > .json-formatter-preview-text {\n  opacity: 0.6;\n}\n.json-formatter-dark.json-formatter-row.json-formatter-open > .json-formatter-toggler-link .json-formatter-toggler:after {\n  transform: rotate(90deg);\n}\n.json-formatter-dark.json-formatter-row.json-formatter-open > .json-formatter-children:after {\n  display: inline-block;\n}\n.json-formatter-dark.json-formatter-row.json-formatter-open > a > .json-formatter-preview-text {\n  display: none;\n}\n.json-formatter-dark.json-formatter-row.json-formatter-open.json-formatter-empty:after {\n  display: block;\n}\n');
        var a = /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,4})(\s*(?:0?[1-9]:[0-5]|1(?=[012])\d:[0-5])\d\s*[ap]m)?$/, f = /\d{2}:\d{2}:\d{2} GMT-\d{4}/, m = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/, l = window.requestAnimationFrame || function(t2) {
          return t2(), 0;
        }, d = { hoverPreviewEnabled: false, hoverPreviewArrayCount: 100, hoverPreviewFieldCount: 5, animateOpen: true, animateClose: true, theme: null, useToJSON: true, sortPropertiesBy: null };
        return function() {
          function c(t2, e2, r2, n2) {
            e2 === void 0 && (e2 = 1), r2 === void 0 && (r2 = d), this.json = t2, this.open = e2, this.config = r2, this.key = n2, this._isOpen = null, this.config.hoverPreviewEnabled === void 0 && (this.config.hoverPreviewEnabled = d.hoverPreviewEnabled), this.config.hoverPreviewArrayCount === void 0 && (this.config.hoverPreviewArrayCount = d.hoverPreviewArrayCount), this.config.hoverPreviewFieldCount === void 0 && (this.config.hoverPreviewFieldCount = d.hoverPreviewFieldCount), this.config.useToJSON === void 0 && (this.config.useToJSON = d.useToJSON), this.key === "" && (this.key = '""');
          }
          return Object.defineProperty(c.prototype, "isOpen", { get: function() {
            return this._isOpen !== null ? this._isOpen : this.open > 0;
          }, set: function(t2) {
            this._isOpen = t2;
          }, enumerable: true, configurable: true }), Object.defineProperty(c.prototype, "isDate", { get: function() {
            return this.json instanceof Date || this.type === "string" && (a.test(this.json) || m.test(this.json) || f.test(this.json));
          }, enumerable: true, configurable: true }), Object.defineProperty(c.prototype, "isUrl", { get: function() {
            return this.type === "string" && this.json.indexOf("http") === 0;
          }, enumerable: true, configurable: true }), Object.defineProperty(c.prototype, "isArray", { get: function() {
            return Array.isArray(this.json);
          }, enumerable: true, configurable: true }), Object.defineProperty(c.prototype, "isObject", { get: function() {
            return e(this.json);
          }, enumerable: true, configurable: true }), Object.defineProperty(c.prototype, "isEmptyObject", { get: function() {
            return !this.keys.length && !this.isArray;
          }, enumerable: true, configurable: true }), Object.defineProperty(c.prototype, "isEmpty", { get: function() {
            return this.isEmptyObject || this.keys && !this.keys.length && this.isArray;
          }, enumerable: true, configurable: true }), Object.defineProperty(c.prototype, "useToJSON", { get: function() {
            return this.config.useToJSON && this.type === "stringifiable";
          }, enumerable: true, configurable: true }), Object.defineProperty(c.prototype, "hasKey", { get: function() {
            return this.key !== void 0;
          }, enumerable: true, configurable: true }), Object.defineProperty(c.prototype, "constructorName", { get: function() {
            return r(this.json);
          }, enumerable: true, configurable: true }), Object.defineProperty(c.prototype, "type", { get: function() {
            return this.config.useToJSON && this.json && this.json.toJSON ? "stringifiable" : t(this.json);
          }, enumerable: true, configurable: true }), Object.defineProperty(c.prototype, "keys", { get: function() {
            if (this.isObject) {
              var t2 = Object.keys(this.json);
              return !this.isArray && this.config.sortPropertiesBy ? t2.sort(this.config.sortPropertiesBy) : t2;
            }
            return [];
          }, enumerable: true, configurable: true }), c.prototype.toggleOpen = function() {
            this.isOpen = !this.isOpen, this.element && (this.isOpen ? this.appendChildren(this.config.animateOpen) : this.removeChildren(this.config.animateClose), this.element.classList.toggle(i("open")));
          }, c.prototype.openAtDepth = function(t2) {
            t2 === void 0 && (t2 = 1), t2 < 0 || (this.open = t2, this.isOpen = t2 !== 0, this.element && (this.removeChildren(false), t2 === 0 ? this.element.classList.remove(i("open")) : (this.appendChildren(this.config.animateOpen), this.element.classList.add(i("open")))));
          }, c.prototype.getInlinepreview = function() {
            var t2 = this;
            if (this.isArray)
              return this.json.length > this.config.hoverPreviewArrayCount ? "Array[" + this.json.length + "]" : "[" + this.json.map(o).join(", ") + "]";
            var e2 = this.keys, r2 = e2.slice(0, this.config.hoverPreviewFieldCount).map(function(e3) {
              return e3 + ":" + o(t2.json[e3]);
            }), n2 = e2.length >= this.config.hoverPreviewFieldCount ? "\u2026" : "";
            return "{" + r2.join(", ") + n2 + "}";
          }, c.prototype.render = function() {
            this.element = s("div", "row");
            var t2 = this.isObject ? s("a", "toggler-link") : s("span");
            if (this.isObject && !this.useToJSON && t2.appendChild(s("span", "toggler")), this.hasKey && t2.appendChild(s("span", "key", this.key + ":")), this.isObject && !this.useToJSON) {
              var e2 = s("span", "value"), r2 = s("span"), o2 = s("span", "constructor-name", this.constructorName);
              if (r2.appendChild(o2), this.isArray) {
                var a2 = s("span");
                a2.appendChild(s("span", "bracket", "[")), a2.appendChild(s("span", "number", this.json.length)), a2.appendChild(s("span", "bracket", "]")), r2.appendChild(a2);
              }
              e2.appendChild(r2), t2.appendChild(e2);
            } else {
              (e2 = this.isUrl ? s("a") : s("span")).classList.add(i(this.type)), this.isDate && e2.classList.add(i("date")), this.isUrl && (e2.classList.add(i("url")), e2.setAttribute("href", this.json));
              var f2 = n(this.type, this.json, this.useToJSON ? this.json.toJSON() : this.json);
              e2.appendChild(document.createTextNode(f2)), t2.appendChild(e2);
            }
            if (this.isObject && this.config.hoverPreviewEnabled) {
              var m2 = s("span", "preview-text");
              m2.appendChild(document.createTextNode(this.getInlinepreview())), t2.appendChild(m2);
            }
            var l2 = s("div", "children");
            return this.isObject && l2.classList.add(i("object")), this.isArray && l2.classList.add(i("array")), this.isEmpty && l2.classList.add(i("empty")), this.config && this.config.theme && this.element.classList.add(i(this.config.theme)), this.isOpen && this.element.classList.add(i("open")), this.element.appendChild(t2), this.element.appendChild(l2), this.isObject && this.isOpen && this.appendChildren(), this.isObject && !this.useToJSON && t2.addEventListener("click", this.toggleOpen.bind(this)), this.element;
          }, c.prototype.appendChildren = function(t2) {
            var e2 = this;
            t2 === void 0 && (t2 = false);
            var r2 = this.element.querySelector("div." + i("children"));
            if (r2 && !this.isEmpty)
              if (t2) {
                var n2 = 0, o2 = function() {
                  var t3 = e2.keys[n2], i2 = new c(e2.json[t3], e2.open - 1, e2.config, t3);
                  r2.appendChild(i2.render()), (n2 += 1) < e2.keys.length && (n2 > 10 ? o2() : l(o2));
                };
                l(o2);
              } else
                this.keys.forEach(function(t3) {
                  var n3 = new c(e2.json[t3], e2.open - 1, e2.config, t3);
                  r2.appendChild(n3.render());
                });
          }, c.prototype.removeChildren = function(t2) {
            t2 === void 0 && (t2 = false);
            var e2 = this.element.querySelector("div." + i("children"));
            if (t2) {
              var r2 = 0, n2 = function() {
                e2 && e2.children.length && (e2.removeChild(e2.children[0]), (r2 += 1) > 10 ? n2() : l(n2));
              };
              l(n2);
            } else
              e2 && (e2.innerHTML = "");
          }, c;
        }();
      });
    }
  });

  // src/panel.js
  var import_json_formatter_js = __toESM(require_json_formatter_umd());
  console.log = (...args) => {
    chrome.devtools.inspectedWindow.eval("console.log(" + args.map((arg) => JSON.stringify(arg)) + ");");
  };
  var jsonContainer = document.querySelector("#json");
  var renderJson = (jsonString) => {
    const json = JSON.parse(jsonString);
    const formatter = new import_json_formatter_js.default(json, 3, { theme: "dark" });
    const node = formatter.render();
    jsonContainer.innerHTML = "";
    jsonContainer.appendChild(node);
  };
  var renderJsonFromHtml = (html) => {
    if (!html.length) {
      return;
    }
    const parser = new DOMParser();
    const document2 = parser.parseFromString(html, "text/html");
    const element = document2.querySelector("[data-page]");
    if (element && element.dataset.page) {
      renderJson(element.dataset.page);
    }
  };
  chrome.devtools.inspectedWindow.getResources((resources) => {
    const document2 = resources.find((resource) => resource.type === "document");
    document2.getContent(renderJsonFromHtml);
  });
  chrome.devtools.network.onRequestFinished.addListener((request) => {
    if (request._resourceType === "document") {
      request.getContent(renderJsonFromHtml);
    }
    if (request.response.headers.find((header) => header.name === "X-Inertia")) {
      request.getContent(renderJson);
    }
  });
})();
