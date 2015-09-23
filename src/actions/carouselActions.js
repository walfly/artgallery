var dispatcher = require('../dispatcher.js');

module.exports = {
  navigateForward: function () {
    dispatcher.handleViewAction({
      actionType: 'carousel:forward'
    });
  },
  navigateBackward: function () {
    dispatcher.handleViewAction({
      actionType: 'carousel:backward'
    });
  }
};