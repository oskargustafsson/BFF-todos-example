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
			this.listenTo('#new-todo', 'keydown', this.addItem, items);
			this.listenTo(items, 'item:added', this.render);
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
