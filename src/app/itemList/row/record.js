define(function (require) {
  'use strict';

  var Record = require('libs/bff/dev/record');

  return Record.prototype.bindSchema({

    visible: {
      type: 'boolean',
      defaultValue: true,
      forbiddenValues: [ undefined ],
    },

    editing: {
      type: 'boolean',
      defaultValue: false,
      forbiddenValues: [ undefined ],
    },

  });

});
