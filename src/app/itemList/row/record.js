define(function (require) {
  'use strict';

  var Record = require('libs/bff/dev/record');

  return Record.prototype.bindSchema({

    editing: {
      type: 'boolean',
      defaultValue: false,
      forbiddenValues: [ undefined ],
    },

    saveOnExit: {
      type: 'boolean',
      defaultValue: true,
      forbiddenValues: [ undefined ],
    },

  });

});
