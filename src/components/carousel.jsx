var React = require('react');
var ImageComponent = require('./image.jsx');
var times = require('lodash/utility/times');

var Carousel = React.createClass({
  componentDidMount: function () {
    this.setState({
      baseOffsetWidth: this.selectedWidth(this.props.images.currentSelected())
    });
    this.props.images.addChangeListener(this.onChange);
  },
  componentWillUnmount: function () {
    this.props.images.removeChangeListener(this.onChange);
  },
  getInitialState: function () {
    return {
      selected: this.props.images.currentSelected(),
      list: this.props.images.getActiveImages(),
      baseOffsetWidth: 0,
    };
  },
  selectedWidth: function (selectedIndex) {
    console.log(selectedIndex, this.refs["image" + selectedIndex].getActualWidth());
    return this.refs["image" + selectedIndex].getActualWidth();
  },
  left: function () {
    this.props.images.goToPreviouse();
  },
  right: function () {
    this.props.images.goToNext();
  },
  onChange: function () {
    this.setState({
      selected: this.props.images.currentSelected(),
      list: this.props.images.getActiveImages(),
      baseOffsetWidth: this.selectedWidth(this.props.images.currentSelected())
    });
  },
  selectedImageLoaded: function () {
    this.setState({
      baseOffsetWidth: this.selectedWidth(this.props.images.currentSelected())
    });
  },
  render: function () {
    var imageList = this.state.list.map(function (item, index) {
      return (
        <ImageComponent
          ref={"image" + item.index}
          selectedImageLoaded={this.selectedImageLoaded}
          selected={this.state.selected === item.index}
          key={item.index}
          image={item}
          baseOffsetWidth={this.state.baseOffsetWidth} />
      );
    },this);
    return (
      <div>
        <ul className="carousel">
          {imageList}
        </ul>
        <div className="left-button" onClick={this.left}><div className="arrow"></div></div>
        <div className="right-button"onClick={this.right}><div className="arrow"></div></div>
      </div>
    );
  }
});

module.exports = Carousel;
