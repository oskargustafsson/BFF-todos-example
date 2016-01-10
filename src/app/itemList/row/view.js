define(function (require) {
  'use strict';

  var View = require('libs/bff/dev/view');
  var mustache = require('mustache');
  var ItemListRowRecord = require('./record');
  var templateHtml = require('text!./template.html');

  var ENTER_KEY = 13;

  return View.prototype.makeSubclass({

    constructor: function (itemList, itemRecord) {
      this.itemList = itemList;
      this.itemRecord = itemRecord;
      this.stateRecord = new ItemListRowRecord();

      this.render();

      this.listenTo('input.toggle', 'change', this.onToggleElChanged);
      this.listenTo('button.destroy', 'click', this.removeItemFromList);
      this.listenTo('label', 'dblclick', this.onLabelDoubleClicked);
      this.listenTo('input.edit', 'change', this.onInputChanged);

      this.listenTo(this.itemRecord, 'change', this.render);
      this.listenTo(this.itemRecord, 'removed', this.destroy);
      this.listenTo(this.stateRecord, 'change:editing', this.onEditingStateChanged);
    },

    getHtml: function () {
      return mustache.render(templateHtml, {
        text: this.itemRecord.text,
        completed: this.itemRecord.completed,
        editing: this.stateRecord.editing,
      });
    },

    onToggleElChanged: function (ev) {
      this.itemRecord.completed = ev.target.checked;
    },

    removeItemFromList: function () {
      this.itemList.remove(this.itemRecord);
    },

    onLabelDoubleClicked: function () {
      this.stateRecord.editing = !this.stateRecord.editing;
    },

    onEditingStateChanged: function (editing) {
      this[editing ? 'listenTo' : 'stopListening']('input.edit', 'blur', this.onInputElBlurred);
      this[editing ? 'listenTo' : 'stopListening']('input.edit', 'keydown', this.onInputElKeyDown);
      this.render();
      editing && this.$('input.edit').focus();
    },

    onInputElBlurred: function () {
      this.stateRecord.editing = false;
    },

    onInputElKeyDown: function (ev) {
      if ((ev.which || ev.keyCode) !== ENTER_KEY) { return; }
      this.stateRecord.editing = false;
    },

    onInputChanged: function (ev) {
      var itemText = ev.target.value.trim();
      if (itemText) {
        this.itemRecord.text = itemText;
      } else {
        this.removeItemFromList();
      }
    },

  });

});
