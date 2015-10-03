var assign = require('object-assign');
var events = require('events').EventEmitter;
var map = require('lodash/collection/map');
var each = require('lodash/collection/each');
var findIndex = require('lodash/array/findindex');
var dispatcher = require('../dispatcher.js');

var Image = require('./image.js');

var Images = function () {
  this.list = this.getImages();
};

assign(Images.prototype, events.prototype, {
  getImages: function () {
    var list = require('../fixtures/images');
    return map(list, function (item, index) {
      return new Image({
        url: item,
        selected: index === 0 ? true : false,
        index: index
      }, this);
    }, this);
  },
  resetList: function () {
    each(this.list, function (item) {
      item.selected = false;
    });    
  },
  goToIndex: function (index) {
    this.resetList();
    this.list[index].selected = true;
  },
  currentSelected: function () {
    return findIndex(this.list, function (image) {
      return image.selected === true;
    });
  },
  getActiveImages: function () {
    numberPerSide = 8;
    var selIndex = this.currentSelected();
    var min = Math.max(selIndex - numberPerSide, 0);
    var max = Math.min(selIndex + numberPerSide, this.list.length - 1);
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