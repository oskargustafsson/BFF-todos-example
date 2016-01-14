define(function (require) {
	'use strict';

	var View = require('libs/bff/dev/view');
	var ItemRecord = require('models/item');
	var items = require('models/items');
	var templateHtml = require('text!./template.html');
	var NewItemView = require('./new/view');
	var ItemListView = require('./list/view');
	var ItemActionsView = require('./actions/view');

	var LOCAL_STORAGE_NS = 'todos-bff';

	return View.prototype.makeSubclass({

		constructor: function () {
			// Render this view; will set this.el to what is returned (and parsed) from getHtml()
			this.render();
			// Create all the subviews
			this.addChild(new NewItemView());
			this.addChild(new ItemListView());
			this.addChild(new ItemActionsView());
			// Load saved items and set up data change listeners
			this.loadItems();
			this.listenTo(items, [ 'change:length', 'item:change' ], this.saveItems);
		},

		getHtml: function () {
			return templateHtml;
		},

		loadItems: function () {
			var savedItemsStr = localStorage[LOCAL_STORAGE_NS];
			var itemDataToModel = function (itemData) { return new ItemRecord(itemData); };
			savedItemsStr && items.pushAll(JSON.parse(savedItemsStr).map(itemDataToModel));
		},

		saveItems: function () {
			localStorage[LOCAL_STORAGE_NS] = JSON.stringify(items);
		},

	});

});
