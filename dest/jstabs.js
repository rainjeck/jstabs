(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.jstabs = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  /**
   * Author and copyright: Tishuk Nadezda (https://github.com/rainjeck)
   * Repository: https://github.com/rainjeck/jstabs
   * License: MIT, see file 'LICENSE'
   */
  var jstabs =
  /*#__PURE__*/
  function () {
    function jstabs(id, params) {
      var _this2 = this;

      _classCallCheck(this, jstabs);

      this.id = id;
      this.params = params;
      var el = document.querySelector(id);
      var tabItems = el.querySelectorAll("[data-tab]");
      var tabIDs = Object.keys(tabItems).map(function (idx) {
        var id = tabItems[idx].getAttribute("data-tab");
        return id;
      });
      var tabs = tabIDs.map(function (tabID) {
        return document.getElementById(tabID);
      });
      var empty = tabs.indexOf(null);

      if (!empty || empty > 0) {
        console.error("Tab not found. Check tabs elements");
        return;
      }

      this.el = el;
      this.id = id;
      this.tabItems = tabItems;
      this.tabs = tabs;
      var activeTab = this.params && this.params.activeTab ? this.params.activeTab : tabIDs[0];

      if (this.params && this.params.hash) {
        var hash = window.location.hash.substring(1);

        if (hash) {
          activeTab = hash;
        }
      }

      this.activeTab = activeTab;
      this.to(activeTab);
      [].forEach.call(tabItems, function (tabItem) {
        tabItem.addEventListener("click", function (e) {
          e.preventDefault();
          var _this = e.currentTarget;

          var id = _this.getAttribute("data-tab");

          _this2.to(id);
        });
      });
    }

    _createClass(jstabs, [{
      key: "to",
      value: function to(tabID) {
        var tabItems = Array.prototype.slice.call(this.tabItems);
        var tabs = Array.prototype.slice.call(this.tabs);
        var filterTabItems = tabItems.filter(function (item) {
          var attr = item.getAttribute("data-tab");
          return attr == tabID;
        });
        var filterTabs = tabs.filter(function (item) {
          var id = item.id;
          return id == tabID;
        });
        var tabItem = filterTabItems.shift();
        var tab = filterTabs.shift();

        if (!tab) {
          console.error("Tab \"".concat(tabID, "\" not found"));
          return;
        }

        if (this.params && typeof this.params.before === "function") {
          this.params.before(this);
        }

        var input = tabItem.querySelector("input[type='radio']");

        if (input) {
          if (!input.disabled) {
            input.checked = 'true';
          }

          if (input.disabled) {
            return;
          }
        }

        this.activeTab = tabID;

        if (this.params && this.params.disableInputs) {
          this.disableInputs();
        }

        this.off();
        tabItem.classList.add("is-active");
        tab.classList.add("is-active");

        if (this.params && this.params.disableInputs) {
          this.enableInputs(tab);
        }

        if (this.params && this.params.hash) {
          this.hash();
        }

        if (this.params && typeof this.params.after === "function") {
          this.params.after(this);
        }
      }
    }, {
      key: "off",
      value: function off() {
        [].forEach.call(this.tabItems, function (tabItem) {
          tabItem.classList.remove("is-active");
          var input = tabItem.querySelector("input");

          if (input && input.type == "radio") {
            input.removeAttribute("checked");
          }
        });
        [].forEach.call(this.tabs, function (tab) {
          return tab.classList.remove("is-active");
        });
      }
    }, {
      key: "disableInputs",
      value: function disableInputs() {
        [].forEach.call(this.tabs, function (tab) {
          var inputs = tab.querySelectorAll("input, select, textarea");

          if (inputs) {
            [].forEach.call(inputs, function (input) {
              return input.setAttribute("disabled", "disabled");
            });
          }
        });
      }
    }, {
      key: "enableInputs",
      value: function enableInputs(tab) {
        var inputs = tab.querySelectorAll("input, select, textarea");

        if (inputs) {
          [].forEach.call(inputs, function (input) {
            return input.removeAttribute("disabled");
          });
        }
      }
    }, {
      key: "hash",
      value: function hash() {
        var hash = window.location.hash.substring(1);
        var firstTab = this.tabItems[0].getAttribute("data-tab");
        var activeTab = this.activeTab;

        if (!hash && firstTab != activeTab) {
          window.location.hash = "#" + activeTab;
        }

        if (hash) {
          window.location.hash = "#" + activeTab;
        }
      }
    }]);

    return jstabs;
  }();

  _exports["default"] = jstabs;
});
//# sourceMappingURL=../dest/jstabs.js.map
