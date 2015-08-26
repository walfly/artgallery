var React = require('react');

var Carousel = React.createClass({
  render: function () {
    return <div style={styles}>{this.props.copy}</div>;
  }
});

var styles = {
  "background-color": "#808080"
};

module.exports = Carousel;