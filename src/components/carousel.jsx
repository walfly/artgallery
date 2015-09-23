var React = require('react');
var ImageComponent = require('./image.jsx');
var times = require('lodash/utility/times');

var Carousel = React.createClass({
  componentDidMount: function () {
    this.props.images.addChangeListener(this.onChange);
  },
  componentWillUnmount: function () {
    this.props.images.removeChangeListener(this.onChange);
  },
  getInitialState: function () {
    return {
      list: this.props.images.list
    };
  },
  setPositions: function () {
    var selectedIndex = this.props.images.currentSelected();
    var selectedWidth = this.refs["image" + selectedIndex].getActualWidth();
    times(this.props.images.list.length, function (n) {
      this.refs["image" + n].setPosition(selectedWidth);
    }, this);
  },
  left: function () {
    this.props.images.goToPrevious();
  },
  right: function () {
    this.props.images.goToNext();
  },
  onChange: function () {
    this.setState({
      list: this.props.images.list
    });
  },
  render: function () {
    var imageList = this.state.list.map(function (item, index) {
      return (<ImageComponent ref={"image" + index} setPositions={this.setPositions} key={item.index} image={item}/>)
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