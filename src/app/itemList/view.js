define(function (require) {
  'use strict';

  var View = require('libs/bff/dev/view');
  var makeTemplate = require('lodash/string/template');
  var templateHtml = require('text!./template.html');
  var ItemListRowView = require('./row/view');

  var template = makeTemplate(templateHtml);

  return View.prototype.makeSubclass({

    constructor: function (itemList) {
      this.itemList = itemList;

      // Bind an option to the render method. Subsequent calls to render will not change the contents of the
      // #todo-list element, which contains all the individual item subviews
      this.render = this.render.bind(this, { ignoreSubtreeOf: '#todo-list' });
      this.render();

      this.listenTo('input#toggle-all', 'change', this.toggleAllItems);

      this.listenTo(itemList, [ 'change:length', 'change:nCompleted' ], this.render);
      this.listenTo(itemList, 'item:added', this.addItemView);
      this.listenTo(itemList, 'item:requestRemove', itemList.remove, itemList);
    },

    getHtml: function () {
      return template({
        isListEmpty: this.itemList.length === 0,
        isAllCompleted: this.itemList.nCompleted === this.itemList.length,
      });
    },

    toggleAllItems: function (ev) {
      this.itemList.forEach(function (item) { item.completed = ev.target.checked; });
    },

    addItemView: function (itemRecord) {
      this.addChild(new ItemListRowView(itemRecord), this.$('#todo-list'));
    },

  });

});
