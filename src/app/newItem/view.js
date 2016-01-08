define(function (require) {
  'use strict';

  var View = require('libs/bff/dev/view');
  var templateHtml = require('text!./template.html');
  var ItemRecord = require('entities/item');

  var ENTER_KEY = 13;

  return View.prototype.makeSubclass({

    constructor: function (itemList) {
      this.itemList = itemList;
      this.el = this.parseHtml(templateHtml);
      this.inputEl = this.$('#new-todo');

      this.listenTo(this.inputEl, 'keydown', this.onKeyDown);
    },

    onKeyDown: function (ev) {
      switch (ev.which) {
      case ENTER_KEY:
        this.addItemToList();
        break;
      }
    },

    addItemToList: function () {
      var itemText = this.inputEl.value.trim();

      if (!itemText) { return; }

      this.itemList.push(new ItemRecord({ text: itemText }));
      this.inputEl.value = '';
    },

  });

});
