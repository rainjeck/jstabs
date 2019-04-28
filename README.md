# JSTABS
Simple vanilla javascript tabs.

Support:
 - Any style - style what you want
 - Hash
 - Nested tabs
 - Disable/enable input fields in tab

## Layout
```
<div id="tabs">
	  <div data-tab="tab1">Tab 1</div>
	  <div data-tab="tab2">Tab 2</div>
</div>

<div class="jstabs-tab" id="tab1">Tab content 1</div>
<div class="jstabs-tab" id="tab2">Tab content 2</div>
```

## Usage
```
var tabs = new jstabs('#tabs', {options});
```

### Options

 - ```activeTab: ''```
active tab on init (element id without "#", default - first)
 - ```disableInputs: false```
if tab contains input elements - disable inputs when tab switch off
- ```hash: false```
use hash
- ```before: function() {}```
action before switch on tab. this - options
- ```after: function() {}```
action after tab switch on. this - options
