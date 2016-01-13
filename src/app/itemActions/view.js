define(function (require) {
  'use strict';

  var View = require('libs/bff/dev/view');
  var makeTemplate = require('lodash/string/template');
  var templateHtml = require('text!./template.html');
  var router = require('app/router');

  var template = makeTemplate(templateHtml);

  var FILTERS = {
    '': 'All',
    'active': 'Active',
    'completed': 'Completed'
  };

  return View.prototype.makeSubclass({

    constructor: function (itemList) {
      this.itemList = itemList;

      this.render();

      this.listenTo('#clear-completed', 'click', this.onClearButtonClicked);

      this.listenTo(itemList, [ 'change:length', 'change:nCompleted' ], this.render);
      this.listenTo(router, 'change:route', this.render);
    },

    getHtml: function () {
      return template({
        nTodosLeft: this.itemList.nUncompleted,
        isListEmpty: this.itemList.length === 0,
        isNoneCompleted: this.itemList.nCompleted === 0,
        currentPath: router.route,
        filters: FILTERS,
      });
    },

    onClearButtonClicked: function () {
      this.itemList.filterMut(function (item) { return !item.completed; });
    },

  });

});
