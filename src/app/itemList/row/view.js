define(function (require) {
  'use strict';

  var View = require('libs/bff/dev/view');
  var patch = require('libs/bff/dev/dom-patcher');
  var mustache = require('mustache');
  var ItemListRowRecord = require('./record');
  var templateHtml = require('text!./template.html');

  var ENTER_KEY = 13;

  return View.prototype.makeSubclass({

    constructor: function (itemList, itemRecord) {
      this.itemList = itemList;
      this.itemRecord = itemRecord;
      this.stateRecord = new ItemListRowRecord();

      this.el = this.parseHtml(this.getViewHtml());
      this.inputEl = this.$('input.edit');

      this.listenTo(this.$('input.toggle'), 'change', this.onToggleElChanged);
      this.listenTo(this.$('button.destroy'), 'click', this.removeItemFromList);
      this.listenTo(this.$('label'), 'dblclick', this.onLabelDoubleClicked);
      this.listenTo(this.inputEl, 'change', this.onInputChanged);

      this.listenTo(this.itemRecord, 'change', this.onItemChanged);
      this.listenTo(this.itemRecord, 'removed', this.destroy);
      this.listenTo(this.stateRecord, 'change:editing', this.onEditingStateChanged);
    },

    getViewHtml: function () {
      return mustache.render(templateHtml, this.itemRecord);
    },

    onItemChanged: function () {
      this.patchEl(this.getViewHtml());
    },

    onToggleElChanged: function (ev) {
      this.itemRecord.completed = ev.currentTarget.checked;
    },

    removeItemFromList: function () {
      this.itemList.remove(this.itemRecord);
    },

    onLabelDoubleClicked: function () {
      this.stateRecord.editing = !this.stateRecord.editing;
    },

    onEditingStateChanged: function (editing) {
      this.el.classList[editing ? 'add' : 'remove']('editing');
      this[editing ? 'listenTo' : 'stopListening'](this.inputEl, 'blur', this.onInputElBlurred);
      this[editing ? 'listenTo' : 'stopListening'](this.inputEl, 'keydown', this.onInputElKeyDown);
      editing && this.inputEl.focus();
    },

    onInputElBlurred: function () {
      this.stateRecord.editing = false;
    },

    onInputElKeyDown: function (ev) {
      if (ev.which === ENTER_KEY) {
        this.stateRecord.editing = false;
      }
    },

    onInputChanged: function (ev) {
      var itemText = ev.currentTarget.value.trim();
      if (itemText) {
        this.itemRecord.text = itemText;
      } else {
        this.removeItemFromList();
      }
    },

  });

});
