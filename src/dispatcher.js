var Dispatcher = require('flux').Dispatcher;

Dispatcher.prototype.handleViewAction = function (action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

module.exports = new Dispatcher();