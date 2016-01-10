define(function (require) {
  'use strict';

  var View = require('libs/bff/dev/view');
  var mustache = require('mustache');
  var templateHtml = require('text!./template.html');
  var ItemListRowView = require('./row/view');

  return View.prototype.makeSubclass({

    constructor: function (itemList) {
      this.itemList = itemList;

      this.render = this.render.bind(this, { ignoreSubtreeOf: '#todo-list' });
      this.render();

      this.listenTo('input#toggle-all', 'change', this.onToggleAllChanged);

      this.listenTo(itemList, 'change:length', this.render);
      this.listenTo(itemList, 'change:nCompleted', this.render);
      this.listenTo(itemList, 'item:added', this.onListItemAdded);
    },

    getHtml: function () {
      return mustache.render(templateHtml, {
        isListEmpty: this.itemList.length === 0,
        isAllCompleted: this.itemList.nCompleted === this.itemList.length,
      });
    },

    onToggleAllChanged: function (ev) {
      var completed = ev.target.checked;
      this.itemList.forEach(function (item) {
        item.completed = completed;
      });
    },

    onListItemAdded: function (itemRecord) {
      this.addChild(new ItemListRowView(this.itemList, itemRecord), this.$('#todo-list'));
    },

  });

});
