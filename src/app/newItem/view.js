define(function (require) {
  'use strict';

  var View = require('libs/bff/dev/view');
  var templateHtml = require('text!./template.html');
  var ItemRecord = require('entities/item');

  var ENTER_KEY = 13;

  return View.prototype.makeSubclass({

    constructor: function (items) {
      this.render();
      this.listenTo('#new-todo', 'keydown', this.addItem, items);
      this.listenTo(items, 'item:added', this.render);
    },

    getHtml: function () {
      return templateHtml;
    },

    addItem: function (ev) {
      if ((ev.which || ev.keyCode) !== ENTER_KEY) { return; }
      var itemText = ev.target.value.trim();
      itemText && this.push(new ItemRecord({ title: itemText }));
    },

  });

});
