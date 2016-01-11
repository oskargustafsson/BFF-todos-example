define(function (require) {
  'use strict';

  var View = require('libs/bff/dev/view');
  var ItemListRowRecord = require('./record');
  var makeTemplate = require('lodash/string/template');
  var templateHtml = require('text!./template.html');
  var router = require('app/router');

  var template = makeTemplate(templateHtml);

  var ENTER_KEY = 13;
  var ESCAPE_KEY = 27;

  return View.prototype.makeSubclass({

    constructor: function (itemList, itemRecord) {
      this.itemList = itemList;
      this.itemRecord = itemRecord;
      this.stateRecord = new ItemListRowRecord();

      this.render();

      this.listenTo('input.toggle', 'change', this.onToggleElChanged);
      this.listenTo('button.destroy', 'click', this.removeItemFromList);
      this.listenTo('label', 'dblclick', this.enterEditMode);

      this.listenTo(this.stateRecord, 'change:editing', this.onEditingStateChanged);
      this.listenTo(this.stateRecord, 'change:hidden', this.render);
      this.listenTo(this.itemRecord, 'removed', this.destroy);
      this.listenTo(this.itemRecord, 'change', this.render);
      this.listenTo(this.itemRecord, 'change:completed', this.updateItemVisibility);
      this.listenTo(router, 'change:route', this.updateItemVisibility);

      this.updateItemVisibility();
    },

    render: function () {
      View.prototype.render.apply(this, arguments);
      this.stateRecord.editing && this.$('input.edit').focus();
    },

    getHtml: function () {
      return template({
        text: this.itemRecord.text,
        completed: this.itemRecord.completed,
        editing: this.stateRecord.editing,
        hidden: this.stateRecord.hidden,
      });
    },

    updateItemVisibility: function () {
      switch (router.route) {
      case 'active': this.stateRecord.hidden = this.itemRecord.completed; break;
      case 'completed': this.stateRecord.hidden = !this.itemRecord.completed; break;
      default: this.stateRecord.hidden = false; break;
      }
    },

    onToggleElChanged: function (ev) {
      this.itemRecord.completed = ev.target.checked;
    },

    removeItemFromList: function () {
      this.itemList.remove(this.itemRecord);
    },

    enterEditMode: function () {
      this.stateRecord.saveOnExit = true;
      this.stateRecord.editing = true;
    },

    onInputElBlurred: function () {
      this.stateRecord.editing = false;
    },

    onInputElKeyDown: function (ev) {
      switch (ev.which || ev.keyCode) {
      case ESCAPE_KEY:
        this.stateRecord.saveOnExit = false;
        /* falls through */
      case ENTER_KEY:
        this.stateRecord.editing = false;
      }
    },

    onEditingStateChanged: function (editing) {
      this[editing ? 'listenTo' : 'stopListening']('input.edit', 'blur', this.onInputElBlurred);
      this[editing ? 'listenTo' : 'stopListening']('input.edit', 'keydown', this.onInputElKeyDown);

      if (!editing && this.stateRecord.saveOnExit) {
        var itemText = this.$('input.edit').value.trim();
        if (itemText) {
          this.itemRecord.text = itemText;
        } else {
          this.removeItemFromList();
        }
      }

      this.render();
    },

  });

});
