define(function (require) {
  'use strict';

  var View = require('libs/bff/dev/view');
  var appHtml = require('text!./template.html');

  return View.prototype.makeSubclass({

    constructor: function AppController() {
      this.el = this.parseHtml(appHtml);
    },

  });

});
