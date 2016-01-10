define(function (require) {
  'use strict';

  var View = require('libs/bff/dev/view');
  var ItemRecord = require('entities/item');
  var ItemList = require('entities/itemList');
  var templateHtml = require('text!./template.html');
  var NewItemView = require('./newItem/view');
  var ItemListView = require('./itemList/view');
  var ItemActionsView = require('./itemActions/view');

  var LOCAL_STORAGE_NS = 'todos-bff';

  return View.prototype.makeSubclass({

    constructor: function () {
      // Create an empty list of todo items
      this.itemsList = new ItemList();

      // Render this view; will set this.el to whatever is returned (and parsed) from getHtml()
      this.render();

      // Create all the subviews
      this.addChild(new NewItemView(this.itemsList), this.el);
      this.addChild(new ItemListView(this.itemsList), this.el);
      this.addChild(new ItemActionsView(this.itemsList), this.el);

      // Read stored items
      var savedItemsStr = localStorage[LOCAL_STORAGE_NS];
      savedItemsStr && this.itemsList.pushAll(JSON.parse(savedItemsStr).map(function (itemData) {
        return new ItemRecord(itemData);
      }));

      // Save the items whenever they are added, removed, or edited
      this.listenTo(this.itemsList, 'change:length', this.saveToLocalStorage);
      this.listenTo(this.itemsList, 'item:change', this.saveToLocalStorage);
    },

    getHtml: function () {
      return templateHtml;
    },

    saveToLocalStorage: function () {
      localStorage[LOCAL_STORAGE_NS] = JSON.stringify(this.itemsList);
    },

  });

});
