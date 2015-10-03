var React = require('react');
var ImageComponent = require('./image.jsx');
var times = require('lodash/utility/times');

var Carousel = React.createClass({
  componentDidMount: function () {
    this.setState({
      baseOffsetWidth: this.selectedWidth()
    });
    this.props.images.addChangeListener(this.onChange);
  },
  componentWillUnmount: function () {
    this.props.images.removeChangeListener(this.onChange);
  },
  getInitialState: function () {
    return {
      list: this.props.images.getActiveImages(),
      baseOffsetWidth: 0,
    };
  },
  selectedWidth: function () {
    var selectedIndex = this.props.images.currentSelected();
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
      list: this.props.images.getActiveImages(),
      baseOffsetWidth: this.selectedWidth()
    });
  },
  selectedImageLoaded: function () {
    this.setState({
      baseOffsetWidth: this.selectedWidth()
    });
  },
  render: function () {
    var imageList = this.state.list.map(function (item, index) {
      return (<ImageComponent
                ref={"image" + index}
                selectedImageLoaded={this.selectedImageLoaded}
                key={item.index}
                image={item}
                baseOffsetWidth={this.state.baseOffsetWidth}
              />)
    },this);
    return (
      <div>
        <ul style={styles}>
          {imageList}
        </ul>
        <button onClick={this.left}>Left</button>
        <button onClick={this.right}>Right</button>
      </div>
    );
  }
});

var styles = {
  position: "relative",
  backgroundColor: "#fff",
  height: "100vh",
  listStyle: "none",
  padding: "0",
  margin: "0",
  overflowY: "hidden",
  whiteSpace : "nowrap"
};

module.exports = Carousel;