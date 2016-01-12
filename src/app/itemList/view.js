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

      this.listenTo(itemList, 'change:length', this.render);
      this.listenTo(itemList, 'change:nCompleted', this.render);
      this.listenTo(itemList, 'item:added', this.addItemView);
      this.listenTo(this.children, 'item:removeItem', itemList.remove, itemList);
    },

    getHtml: function () {
      return template({
        isListEmpty: this.itemList.length === 0,
        isAllCompleted: this.itemList.nCompleted === this.itemList.length,
      });
    },

    toggleAllItems: function (ev) {
      var completed = ev.target.checked;
      this.itemList.forEach(function (item) {
        item.completed = completed;
      });
    },

    addItemView: function (itemRecord) {
      this.addChild(new ItemListRowView(itemRecord), this.$('#todo-list'));
    },

  });

});
