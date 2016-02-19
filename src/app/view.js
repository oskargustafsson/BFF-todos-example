define(
	[ 'bff/view', 'bff/extend', 'models/item', './row/view', 'models/items', 'app/router', '_/template', 'text!./template.html' ], function (
	   View,       extend,       ItemRecord,    RowView,      items,          router,       _template,    templateHtml) {

	'use strict';

	var template = _template(templateHtml);
	var LOCAL_STORAGE_NS = 'todos-bff';
	var ENTER = 13;

	return View.prototype.makeSubclass({

		constructor: function () {
			// Render this view; will set this.el to what is returned (and parsed) from getHtml()
			this.render();
			// DOM change listeners
			this.listenTo('#new-todo', 'keydown', this.addItem);
			this.listenTo('#clear-completed', 'click', this.removeAllItems);
			this.listenTo('input#toggle-all', 'change', this.toggleAllItems);
			// Data change listeners
			this.listenTo(items, [ 'change:length', 'item:change' ], this.saveItems);
			this.listenTo(items, 'item:added', this.addItemView);
			this.listenTo(items, 'item:requestRemove', items.remove, items);
			this.listenTo([ router, items ], 'change', this.requestRender);
			// Load saved items
			this.loadItems();
		},

		getHtml: function () {
			return template(extend(items.propertiesToJSON(), router.toJSON()));
		},

		addItem: function (ev) {
			if (ev.which !== ENTER) { return; }
			var itemText = ev.target.value.trim();
			itemText && items.push(new ItemRecord({ title: itemText }));
		},

		removeAllItems: function () {
			items.filterMut(function (item) { return !item.completed; });
		},

		toggleAllItems: function (ev) {
			var completed = ev.target.checked;
			items.forEach(function (item) { item.completed = completed; });
		},

		addItemView: function (itemRecord) {
			this.$('#todo-list').appendChild(new RowView(itemRecord).el);
		},

		saveItems: function () {
			localStorage[LOCAL_STORAGE_NS] = JSON.stringify(items);
		},

		loadItems: function () {
			var itemDataToModel = function (itemData) { return new ItemRecord(itemData); };
			items.pushAll(JSON.parse(localStorage[LOCAL_STORAGE_NS] || '[]').map(itemDataToModel));
		},

	});

});
