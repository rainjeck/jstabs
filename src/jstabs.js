/**
 * Author and copyright: Tishuk Nadezda (https://github.com/rainjeck)
 * Repository: https://github.com/rainjeck/jstabs
 * License: MIT, see file 'LICENSE'
 */

export default class jstabs {
  constructor(id, params) {
    this.id = id;
    this.params = params;

    const el = document.querySelector(id);
    const tabItems = el.querySelectorAll("[data-tab]");
    const tabIDs = Object.keys(tabItems).map(function(idx) {
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

    this.el = el;
    this.id = id;
    this.tabItems = tabItems;
    this.tabs = tabs;

    let activeTab = (this.params && this.params.activeTab) ? this.params.activeTab : tabIDs[0];

    if (this.params && this.params.hash) {
      var hash = window.location.hash.substring(1);

      if (hash) {
        activeTab = hash;
      }
    }

    this.activeTab = activeTab;

    this.to(activeTab);

    [].forEach.call(tabItems, (tabItem) => {
      tabItem.addEventListener("click", (e) => {
        e.preventDefault();

        var _this = e.currentTarget;

        var id = _this.getAttribute("data-tab");

        this.to(id);
      });
    });
  }

  to(tabID) {

    const tabItems = Array.prototype.slice.call(this.tabItems);
    const tabs = Array.prototype.slice.call(this.tabs);

    const filterTabItems = tabItems.filter( (item) => {
      var attr = item.getAttribute("data-tab");
      return attr == tabID;
    });

    const filterTabs = tabs.filter( (item) => {
      var id = item.id;
      return id == tabID;
    });

    const tabItem = filterTabItems.shift();
    const tab = filterTabs.shift();

    if (!tab) {
      console.error(`Tab "${tabID}" not found`);
      return;
    }

    if (this.params && typeof this.params.before === "function") {
      this.params.before(this);
    }

    const input = tabItem.querySelector("input[type='radio']");

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

  off() {

    [].forEach.call(this.tabItems, (tabItem) => {
      tabItem.classList.remove("is-active");
      const input = tabItem.querySelector("input");

      if (input && input.type == "radio") {
        input.removeAttribute("checked");
      }
    });

    [].forEach.call(this.tabs, (tab) => tab.classList.remove("is-active"));

  }

  disableInputs() {
    [].forEach.call(this.tabs, (tab) => {
      var inputs = tab.querySelectorAll("input, select, textarea");

      if (inputs) {
        [].forEach.call(inputs, (input) => input.setAttribute("disabled", "disabled"));
      }
    });
  }

  enableInputs(tab) {
    var inputs = tab.querySelectorAll("input, select, textarea");

    if (inputs) {
      [].forEach.call(inputs, (input) => input.removeAttribute("disabled"));
    }
  }

  hash() {
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
}
