var React = require('react');
var ImageLoader = require('react-imageloader');
var assign = require('object-assign');

var ImageComponent = React.createClass({
  getInitialState: function () {
    return {
      elWidth: 0,
      containerWidth: 0,
    };
  },
  getActualWidth: function () {
    return this.state.containerWidth;
  },
  setZIndex: function (styles) {
    return this.props.image.distanceFromSelected() || 100;
  },
  imageLoaded: function () {
    var el = this.refs.image.getDOMNode();
    var container = this.refs.container.getDOMNode();
    var elWidth = el.offsetWidth/2;
    console.log("elWidth: " + elWidth + " containerWidth: " + container.offsetWidth + " index: " + this.props.image.index);
    this.setState({
      elWidth: elWidth,
      containerWidth: container.offsetWidth,
    });
    if(this.props.selected){
      this.props.selectedImageLoaded()
    }
  },
  containerPosition: function () {
    var baseOffset = (this.props.baseOffsetWidth/2) + ((this.props.image.distanceFromSelected()-1) * 25)
    var styles = {};
    styles.zIndex = this.setZIndex();
    if(this.props.selected){
      styles.marginLeft = "-" + this.state.elWidth + 'px';
      return styles;
    }
    if(this.props.image.isPastSelected()){
      styles.marginLeft = "" + baseOffset + "px";
    } else {
      var marginLeft = -(this.state.containerWidth + baseOffset);
      styles.marginLeft = "" +  marginLeft + "px";
    }
    return styles;
  },
  imagePosition: function () {
    var styles = {};
    if(this.props.selected){
      styles.transform = "rotateY(  0deg ) translateX(" + 0 + "px)" 
      styles.left = 0;
      return styles;
    }
    if(this.props.image.isPastSelected()){
      styles.left = "-" + this.state.elWidth + "px";
      styles.transform = "rotateY(  75deg ) translateX(" + this.state.elWidth + "px)";
    } else {
      styles.left = "" + this.state.elWidth + "px";
      styles.transform = "rotateY(  285deg ) translateX(-" + this.state.elWidth + "px)";
    }
    return styles;
  },
  liClass: function () {
    var additionalClasses = this.props.selected ?
      "image selected" :
      this.props.image.isPastSelected() ? 
        "image" : 
        "image before-selected";
    return "base-styles " + additionalClasses;
  },
  wrapperClass: function () {
    var className = "pos" + this.props.image.index + " wrapper-style"
    if(!this.props.image.isPastSelected()){
      className += " before-styles";
    }
    var distanceFromSelected = this.props.image.distanceFromSelected()
    if(distanceFromSelected <= 4){
      className += " close-styles";
    }
    return className;
  },
  render: function () {
    return (
      <div style={this.containerPosition()} className={this.wrapperClass()} ref="container">
        <li style={this.imagePosition()} className={this.liClass()} ref="image">
          <ImageLoader
            src={this.props.image.url}
            onLoad={this.imageLoaded}
            imgProps={{height: "100%"}}>
            Image load failed!
          </ImageLoader>
        </li>
      </div>
    );
  }
});


module.exports = ImageComponent;