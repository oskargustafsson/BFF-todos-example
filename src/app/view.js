define(function (require) {
  'use strict';

  var View = require('libs/bff/dev/view');
  var ItemList = require('entities/itemList');
  var templateHtml = require('text!./template.html');
  var NewItemView = require('./newItem/view');
  var ItemListView = require('./itemList/view');
  var ItemActionsView = require('./itemActions/view');

  return View.prototype.makeSubclass({

    constructor: function () {
      var itemsList = new ItemList();

      this.el = this.parseHtml(templateHtml);

      this.addChild(new NewItemView(itemsList), this.el);
      this.addChild(new ItemListView(itemsList), this.el);
      this.addChild(new ItemActionsView(itemsList), this.el);
    },

  });

});
