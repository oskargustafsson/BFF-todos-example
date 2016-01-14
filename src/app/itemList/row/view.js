define(function (require) {
  'use strict';

  var View = require('libs/bff/dev/view');
  var extend = require('libs/bff/dev/extend');
  var ItemListRowRecord = require('./record');
  var makeTemplate = require('lodash/string/template');
  var templateHtml = require('text!./template.html');
  var router = require('app/router');

  var template = makeTemplate(templateHtml);

  var ENTER_KEY = 13;
  var ESCAPE_KEY = 27;

  var ItemListRowView = View.prototype.makeSubclass({

    constructor: function (item) {
      this.item = item;
      this.viewState = new ItemListRowRecord();

      this.render();

      this.listenTo('input.toggle', 'change', this.setItemCompletedState);
      this.listenTo('input.edit', [ 'blur', 'keydown' ], this.leaveEditMode);
      this.listenTo('button.destroy', 'click', this.removeItem);
      this.listenTo('label', 'dblclick', this.enterEditMode);

      this.listenTo([ item, this.viewState ], 'change', this.render);
      this.listenTo(item, 'removed', this.destroy);
      this.listenTo(item, 'change:title', this.removeEmptyItem);
      this.listenTo(item, 'change:completed', this.updateItemVisibility);
      this.listenTo(router, 'change:route', this.updateItemVisibility);

      this.updateItemVisibility();
    },

    render: function () {
      View.prototype.render.call(this, { ignoreSubtreeOf: 'input.edit' });
      this.viewState.editing && this.$('input.edit').focus();
    },

    getHtml: function () {
      return template(extend(this.item.toJSON(), this.viewState.toJSON()));
    },

    updateItemVisibility: function () {
      this.viewState.visible = !router.route || this.item[router.route];
    },

    setItemCompletedState: function (ev) {
      this.item.completed = ev.target.checked;
    },

    enterEditMode: function () {
      this.$('input.edit').value = this.item.title;
      this.viewState.editing = true;
    },

    leaveEditMode: function (ev) {
      if (ev.type === 'blur') { ev.keyCode = ENTER_KEY; }
      switch (ev.which || ev.keyCode) {
      case ENTER_KEY:
        this.item.title = this.$('input.edit').value;
        /* falls through */
      case ESCAPE_KEY:
        this.viewState.editing = false;
      }
    },

    removeItem: function () {
      this.item.emit('requestRemove', this.item);
    },

    removeEmptyItem: function () {
      this.item.title || this.removeItem();
    }

  });

  return ItemListRowView;

});
