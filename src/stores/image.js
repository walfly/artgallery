var assign = require('object-assign');

var Image = function (props, parent) {
  this.parent = parent;
  this.url = props.item.image;
  this.item = props.item;
  this.index = props.index;
};

assign(Image.prototype, {
  isPastSelected: function () {
    return this.parent.currentSelected() < this.index;
  },
  toggleSelected: function () {
    this.selected = !this.selected;
  },
  distanceFromSelected: function () {
    return Math.abs(this.parent.currentSelected() - this.index);
  }
});

module.exports = Image;
