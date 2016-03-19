var assign = require('object-assign');
var events = require('events').EventEmitter;
var map = require('lodash/collection/map');
var each = require('lodash/collection/each');

var Image = require('./image.js');

var Images = function () {
  this.list = this.getImages();
  this.selected = 0;
};

assign(Images.prototype, events.prototype, {
  getImages: function () {
    var list = require('manifest');
    return map(list, function (item, index) {
      return new Image({
        url: item,
        index: index
      }, this);
    }, this);
  },
  goToIndex: function (index) {
    this.selected = index;
  },
  currentSelected: function () {
    return this.selected;
  },
  getActiveImages: function () {
    numberPerSide = 8;
    var selIndex = this.currentSelected();
    var min = Math.max(selIndex - numberPerSide, 0);
    var max = Math.min(selIndex + numberPerSide, this.list.length);
    return this.list.slice(min, max);
  },
  goToPreviouse: function () {
    var selIndex = this.currentSelected();
    var prev = Math.max(0, selIndex - 1);
    this.goToIndex(prev);
    this.emitChange();
  },
  goToNext: function () {
    var next = Math.min(this.currentSelected() + 1, this.list.length - 1);
    this.goToIndex(next);
    this.emitChange();
  },
  emitChange: function () {
    this.emit('change');
  },
  addChangeListener: function (callback) {
    this.on('change', callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  }

});

module.exports = Images; 