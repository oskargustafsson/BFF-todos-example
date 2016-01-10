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
      this.itemsList = new ItemList();

      this.el = this.parseHtml(templateHtml);

      this.addChild(new NewItemView(this.itemsList), this.el);
      this.addChild(new ItemListView(this.itemsList), this.el);
      this.addChild(new ItemActionsView(this.itemsList), this.el);

      var savedItemsStr = localStorage[LOCAL_STORAGE_NS];
      savedItemsStr && this.itemsList.pushAll(JSON.parse(savedItemsStr).map(function (itemData) {
        return new ItemRecord(itemData);
      }));

      this.listenTo(this.itemsList, 'change:length', this.saveToLocalStorage);
      this.listenTo(this.itemsList, 'item:change', this.saveToLocalStorage);
    },

    saveToLocalStorage: function () {
      localStorage[LOCAL_STORAGE_NS] = JSON.stringify(this.itemsList);
    },

  });

});
