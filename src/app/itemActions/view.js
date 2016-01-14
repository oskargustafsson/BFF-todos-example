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

    constructor: function (items) {
      this.items = items;

      this.render();

      this.listenTo('#clear-completed', 'click', this.onClearButtonClicked);

      this.listenTo(items, [ 'change:length', 'change:nCompleted' ], this.render);
      this.listenTo(router, 'change:route', this.render);
      // TODO: replace with following when BFF List bug has been fixed
      // this.listenTo([ router items ], 'change', this.render);
    },

    getHtml: function () {
      return template({
        nTodosLeft: this.items.nUncompleted,
        isListEmpty: this.items.length === 0,
        isNoneCompleted: this.items.nCompleted === 0,
        currentPath: router.route,
        filters: FILTERS,
      });
    },

    onClearButtonClicked: function () {
      this.items.filterMut(function (item) { return !item.completed; });
    },

  });

});
