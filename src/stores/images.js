var assign = require('object-assign');
var events = require('events').EventEmitter;
var map = require('lodash/collection/map');
var each = require('lodash/collection/each');
var findIndex = require('lodash/array/findindex');

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
        selected: index === 9 ? true : false,
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
  goToNext: function () {
    var next = (this.currentSelected() + 1) % (this.list.length);
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