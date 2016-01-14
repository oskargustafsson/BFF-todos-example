define(function (require) {
  'use strict';

  var View = require('libs/bff/dev/view');
  var makeTemplate = require('lodash/string/template');
  var templateHtml = require('text!./template.html');
  var ItemListRowView = require('./row/view');

  var template = makeTemplate(templateHtml);

  return View.prototype.makeSubclass({

    constructor: function (items) {
      this.items = items;

      // Bind an option to the render method. Subsequent calls to render will not change the contents of the
      // #todo-list element, which contains all the individual item subviews
      this.render = this.render.bind(this, { ignoreSubtreeOf: '#todo-list' });
      this.render();

      this.listenTo('input#toggle-all', 'change', this.toggleAllItems);

      this.listenTo(items, [ 'change:length', 'change:nCompleted' ], this.render);
      this.listenTo(items, 'item:added', this.addItemView);
      this.listenTo(items, 'item:requestRemove', items.remove, items);
    },

    getHtml: function () {
      return template({
        isListEmpty: this.items.length === 0,
        isAllCompleted: this.items.nCompleted === this.items.length,
      });
    },

    toggleAllItems: function (ev) {
      this.items.forEach(function (item) { item.completed = ev.target.checked; });
    },

    addItemView: function (itemRecord) {
      this.addChild(new ItemListRowView(itemRecord), this.$('#todo-list'));
    },

  });

});
