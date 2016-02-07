define(function (require) {
	'use strict';

	var View = require('libs/bff/dev/view');
	var templateHtml = require('text!./template.html');
	var ItemRecord = require('models/item');
	var items = require('models/items');

	var ENTER = 13;

	return View.prototype.makeSubclass({

		constructor: function () {
			this.render();
			// DOM change listeners
			this.listenTo('#new-todo', 'keydown', this.addItem, items);
			// Data change listeners
			this.listenTo(items, 'item:added', this.requestRender);
		},

		getHtml: function () {
			return templateHtml;
		},

		addItem: function (ev) {
			if (ev.which !== ENTER) { return; }
			var itemText = ev.target.value.trim();
			itemText && this.push(new ItemRecord({ title: itemText }));
		},

	});

});
