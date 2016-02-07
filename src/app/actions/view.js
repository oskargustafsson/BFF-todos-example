define(function (require) {
	'use strict';

	var View = require('bff/view');
	var makeTemplate = require('lodash/string/template');
	var templateHtml = require('text!./template.html');
	var router = require('app/router');
	var items = require('models/items');

	var template = makeTemplate(templateHtml);

	var FILTERS = {
		'': 'All',
		'active': 'Active',
		'completed': 'Completed'
	};

	return View.prototype.makeSubclass({

		constructor: function () {
			this.render();
			// DOM change listeners
			this.listenTo('#clear-completed', 'click', this.onClearButtonClicked);
			// Data change listeners
			this.listenTo([ router, items ], 'change', this.requestRender);
		},

		getHtml: function () {
			return template({
				nTodosLeft: items.nActive,
				isListEmpty: items.length === 0,
				isNoneCompleted: items.nCompleted === 0,
				currentPath: router.route,
				filters: FILTERS,
			});
		},

		onClearButtonClicked: function () {
			// Remove all the completed items from the items list
			items.filterMut(function (item) { return !item.completed; });
		},

	});

});
