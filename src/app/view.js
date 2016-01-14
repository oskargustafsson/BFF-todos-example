define(function (require) {
  'use strict';

  var View = require('libs/bff/dev/view');
  var ItemRecord = require('models/item');
  var items = require('models/items');
  var templateHtml = require('text!./template.html');
  var NewItemView = require('./newItem/view');
  var ItemListView = require('./itemList/view');
  var ItemActionsView = require('./itemActions/view');

  var LOCAL_STORAGE_NS = 'todos-bff';

  return View.prototype.makeSubclass({

    constructor: function () {
      // Render this view; will set this.el to what is returned (and parsed) from getHtml()
      this.render();
      // Create all the subviews
      this.addChild(new NewItemView());
      this.addChild(new ItemListView());
      this.addChild(new ItemActionsView());
      // Read stored items
      var savedItemsStr = localStorage[LOCAL_STORAGE_NS];
      var itemDataToRecord = function (itemData) { return new ItemRecord(itemData); };
      savedItemsStr && items.pushAll(JSON.parse(savedItemsStr).map(itemDataToRecord));
      // Save the items to LocalStorage whenever they are added, removed, or updated
      this.listenTo(items, [ 'change:length', 'item:change' ], this.saveToLocalStorage, items);
    },

    getHtml: function () {
      return templateHtml;
    },

    saveToLocalStorage: function () {
      localStorage[LOCAL_STORAGE_NS] = JSON.stringify(this);
    },

  });

});
