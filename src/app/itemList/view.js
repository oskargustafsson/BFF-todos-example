define(function (require) {
  'use strict';

  var View = require('libs/bff/dev/view');
  var templateHtml = require('text!./template.html');
  var ItemListRowView = require('./row/view');

  return View.prototype.makeSubclass({

    constructor: function (itemList) {
      this.itemList = itemList;
      this.el = this.parseHtml(templateHtml);
      this.listEl = this.$('#todo-list');
      this.toggleAllEl = this.$('#toggle-all');

      this.updateViewVisibility(itemList.length);

      this.listenTo(this.toggleAllEl, 'change', this.onToggleAllChanged);

      this.listenTo(itemList, 'change:length', this.updateViewVisibility);
      this.listenTo(itemList, 'item:added', this.onItemAdded);
      this.listenTo(itemList, 'change:nCompleted', this.onCompletedCountChanged);
    },

    updateViewVisibility: function (listLength) {
      this.el.classList[listLength ? 'remove' : 'add']('hidden');
    },

    onItemAdded: function (itemRecord) {
      this.addChild(new ItemListRowView(this.itemList, itemRecord), this.listEl);
    },

    onToggleAllChanged: function () {
      var completed = this.toggleAllEl.checked;
      this.itemList.forEach(function (item) {
        item.completed = completed;
      });
    },

    onCompletedCountChanged: function (nCompleted) {
      this.toggleAllEl.checked = nCompleted === this.itemList.length;
    },

  });

});
