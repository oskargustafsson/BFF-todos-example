define(function (require) {
  'use strict';

  var View = require('libs/bff/dev/view');
  var templateHtml = require('text!./template.html');

  return View.prototype.makeSubclass({

    constructor: function (itemList) {
      this.itemList = itemList;

      this.el = this.parseHtml(templateHtml);
      this.clearCompletedButtonEl = this.$('#clear-completed');

      this.updateViewVisibility(itemList.length);
      this.updateClearButtonVisibility(itemList.nCompleted);

      this.listenTo(itemList, 'change:length', this.updateViewVisibility);
      this.listenTo(itemList, 'change:nCompleted', this.updateClearButtonVisibility);

      this.listenTo(this.clearCompletedButtonEl, 'click', this.onClearButtonClicked);
    },

    updateViewVisibility: function (listLength) {
      this.el.classList[listLength ? 'remove' : 'add']('hidden');
    },

    updateClearButtonVisibility: function (nCompleted) {
      this.clearCompletedButtonEl.classList[nCompleted === 0 ? 'add' : 'remove']('hidden');
    },

    onClearButtonClicked: function () {
      this.itemList.filterMut(function (item) {
        return !item.completed;
      });
    },

  });

});
