define(function (require) {
  'use strict';

  var Record = require('libs/bff/dev/record');

  return Record.prototype.bindSchema({

    editing: {
      type: 'boolean',
      defaultValue: false,
      forbiddenValues: [ undefined ],
    },

  });

});
