var React = require('react');
var Images = require('../stores/images.js');
var ImageComponent = require('./image.jsx');
var times = require('lodash/utility/times');

var images = new Images();

var Carousel = React.createClass({
  componentDidMount: function () {
    images.addChangeListener(this.onChange);
  },
  componentWillUnmount: function () {
    images.removeChangeListener(this.onChange);
  },
  getInitialState: function () {
    return {
      list: images.list
    };
  },
  setPositions: function () {
    var selectedIndex = images.currentSelected();
    var selectedWidth = this.refs["image" + selectedIndex].getActualWidth();
    times(images.list.length, function (n) {
      this.refs["image" + n].setPosition(selectedWidth);
    }, this);
  },
  onChange: function () {},
  render: function () {
    var imageList = this.state.list.map(function (item, index) {
      return (<ImageComponent ref={"image" + index} setPositions={this.setPositions} key={item.index} image={item}/>)
    },this);
    return <ul style={styles}>{imageList}</ul>;
  }
});

var styles = {
  position: "relative",
  backgroundColor: "black",
  height: "100vh",
  listStyle: "none",
  padding: "0",
  margin: "0",
  overflowY: "hidden",
  whiteSpace : "nowrap"
};

module.exports = Carousel;