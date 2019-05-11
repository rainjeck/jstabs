/*!
 * jstabs - Simple vanilla javascript tabs.
 * Copyright (c) 2019 Tishuk Nadezda - https://github.com/rainjeck/jstabs
 * License: MIT
 */
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(factory);
  } else if (typeof exports === "object") {
    module.exports = factory;
  } else {
    root.jstabs = factory(root);
  }
})(this, function(root) {
  "use strict";

  var defaults = {};

  // Utility method to extend defaults with user options
  function extendDefaults(source, properties) {
    var property;
    var extended = source;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        extended[property] = properties[property];
      }
    }
    return extended;
  }

  function off(settings) {
    [].forEach.call(settings.tabItems, function(tabItem) {
      tabItem.classList.remove("is-active");
    });

    [].forEach.call(settings.tabs, function(tab) {
      tab.classList.remove("is-active");
    });
  }

  function hash(settings) {
    var hash = window.location.hash.substring(1);

    var firstTab = settings.tabItems[0].getAttribute("data-tab");
    var activeTab = settings.activeTab;

    if (!hash && firstTab != activeTab) {
      window.location.hash = "#" + activeTab;
    }

    if (hash) {
      window.location.hash = "#" + activeTab;
    }
  }

  function to(tabID, settings) {
    var tabItems = Array.prototype.slice.call(settings.tabItems);
    var tabs = Array.prototype.slice.call(settings.tabs);

    var tabItem = tabItems.filter(function(item) {
      var attr = item.getAttribute("data-tab");
      return attr == tabID;
    })[0];

    var tab = tabs.filter(function(item) {
      var id = item.id;
      return id == tabID;
    })[0];

    if (!tab) {
      console.error("Tab '" + tabID + "' not found");
      return;
    }

    settings.activeTab = tabID;

    if (settings.before && typeof settings.before === "function") {
      settings.before(settings);
    }

    if (settings.disableInputs) {
      disableInputs(settings);
    }

    off(settings);

    tabItem.classList.add("is-active");
    tab.classList.add("is-active");

    if (settings.disableInputs) {
      enableInputs(tab);
    }

    if (settings.hash) {
      hash(settings);
    }

    if (settings.after && typeof settings.after === "function") {
      settings.after(settings);
    }
  }

  function disableInputs(settings) {
    [].forEach.call(settings.tabs, function(tab) {
      var inputs = tab.querySelectorAll("input, select");

      if (inputs) {
        [].forEach.call(inputs, function(input) {
          input.setAttribute("disabled", "disabled");
        });
      }
    });
  }

  function enableInputs(tab) {
    var inputs = tab.querySelectorAll("input, select");
    if (inputs) {
      [].forEach.call(inputs, function(input) {
        input.removeAttribute("disabled");
      });
    }
  }

  var jstabs = function(id, options = {}) {
    var el = document.querySelector(id);

    var tabItems = el.querySelectorAll("[data-tab]");

    var tabIDs = Object.keys(tabItems).map(function(idx) {
      var id = tabItems[idx].getAttribute("data-tab");
      return id;
    });

    var tabs = tabIDs.map(function(tabID) {
      return document.getElementById(tabID);
    });

    var empty = tabs.indexOf(null);

    if (!empty || empty > 0) {
      console.error("Tab not found. Check tabs elements");
      return;
    }

    options.el = el;
    options.id = id;
    options.tabItems = tabItems;
    options.tabs = tabs;

    var settings = options;

    settings.off = function() {
      off(options);
    };
    settings.to = function(tabID) {
      to(tabID, options);
    };

    if (settings.disableInputs) {
      disableInputs(settings);
    }

    if (settings.activeTab) {
      to(settings.activeTab, settings);
    } else {
      to(tabIDs[0], settings);
    }

    [].forEach.call(tabItems, function(tabItem) {
      tabItem.addEventListener("click", function(e) {
        e.preventDefault();
        var id = this.getAttribute("data-tab");
        to(id, settings);
      });
    });

    return settings;
  };

  return jstabs;
});
