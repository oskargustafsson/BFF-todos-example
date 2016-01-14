define(function (require) {
  'use strict';

  var Record = require('libs/bff/dev/record');

  return Record.prototype.bindSchema({

    hidden: {
      type: 'boolean',
      defaultValue: false,
      forbiddenValues: [ undefined ],
    },

    editing: {
      type: 'boolean',
      defaultValue: false,
      forbiddenValues: [ undefined ],
    },

  });

});
