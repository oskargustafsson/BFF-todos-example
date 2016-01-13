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

    constructor: function (itemRecord) {
      this.itemRecord = itemRecord;
      this.stateRecord = new ItemListRowRecord();

      this.render();

      this.listenTo('input.toggle', 'change', this.setItemCompletedState);
      this.listenTo('input.edit', [ 'blur', 'keydown' ], this.leaveEditMode);
      this.listenTo('button.destroy', 'click', this.removeItem);
      this.listenTo('label', 'dblclick', this.enterEditMode);

      this.listenTo(this.stateRecord, 'change:editing', this.updateItemTitle);
      this.listenTo(this.stateRecord, 'change:hidden', this.render);
      this.listenTo(itemRecord, 'removed', this.destroy);
      this.listenTo(itemRecord, 'change', this.render);
      this.listenTo(itemRecord, 'change:completed', this.updateItemVisibility);
      this.listenTo(itemRecord, 'change:title', this.removeEmptyItem);
      this.listenTo(router, 'change:route', this.updateItemVisibility);

      this.updateItemVisibility();
    },

    render: function () {
      View.prototype.render.apply(this, arguments);
      this.stateRecord.editing && this.$('input.edit').focus();
    },

    getHtml: function () {
      return template(extend(this.itemRecord.toJSON(), this.stateRecord.toJSON()));
    },

    updateItemVisibility: function () {
      switch (router.route) {
      case 'active': this.stateRecord.hidden = this.itemRecord.completed; break;
      case 'completed': this.stateRecord.hidden = !this.itemRecord.completed; break;
      default: this.stateRecord.hidden = false; break;
      }
    },

    setItemCompletedState: function (ev) {
      this.itemRecord.completed = ev.target.checked;
    },

    enterEditMode: function () {
      this.stateRecord.saveOnExit = true;
      this.stateRecord.editing = true;
    },

    leaveEditMode: function (ev) {
      if (ev.type === 'blur') { ev.keyCode = ENTER_KEY; }
      switch (ev.which || ev.keyCode) {
      case ESCAPE_KEY:
        this.stateRecord.saveOnExit = false;
        /* falls through */
      case ENTER_KEY:
        this.stateRecord.editing = false;
      }
    },

    updateItemTitle: function (editing) {
      if (!editing && this.stateRecord.saveOnExit) {
        this.itemRecord.title = this.$('input.edit').value.trim();
      }
      this.render();
    },

    removeItem: function () {
      this.itemRecord.emit('requestRemove', this.itemRecord);
    },

    removeEmptyItem: function () {
      this.itemRecord.title || this.removeItem();
    }

  });

  return ItemListRowView;

});
