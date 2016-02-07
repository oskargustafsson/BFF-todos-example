define(function (require) {
	'use strict';

	var View = require('bff/view');
	var makeTemplate = require('lodash/string/template');
	var templateHtml = require('text!./template.html');
	var ItemListRowView = require('./row/view');
	var items = require('models/items');

	var template = makeTemplate(templateHtml);

	return View.prototype.makeSubclass({

		constructor: function () {
			// Bind an option to the render method. Subsequent calls to render will not change the contents of the
			// #todo-list element, which contains all the individual item subviews
			this.render = this.render.bind(this, { ignoreSubtreeOf: '#todo-list' });
			this.render();
			// DOM change listeners
			this.listenTo('input#toggle-all', 'change', this.toggleAllItems);
			// Data change listeners
			this.listenTo(items, [ 'change:length', 'change:nCompleted' ], this.requestRender);
			this.listenTo(items, 'item:added', this.addItemView);
			this.listenTo(items, 'item:requestRemove', items.remove, items);
		},

		getHtml: function () {
			return template({
				isListEmpty: items.length === 0,
				isAllCompleted: items.nActive === 0,
			});
		},

		toggleAllItems: function (ev) {
			var completed = ev.target.checked;
			items.forEach(function (item) { item.completed = completed; });
		},

		addItemView: function (itemRecord) {
			this.addChild(new ItemListRowView(itemRecord), this.$('#todo-list'));
		},

	});

});
