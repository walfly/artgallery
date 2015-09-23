var React = require('react');
var ImageLoader = require('react-imageloader');
var assign = require('object-assign');

var ImageComponent = React.createClass({
  activeStyles: function (styles) {
    if(this.props.image.distanceFromSelected() <= 5){
      return assign({}, styles, closeStyles);
    }
    return styles
  },
  beforeStyles: function (styles) {
    if(!this.props.image.isPastSelected()){
      return assign({}, styles, beforeStyles);
    }
    return styles
  },
  getActualWidth: function () {
    return this.refs.image.getDOMNode().offsetWidth;
  },
  setZIndex: function (styles) {
    return assign({}, styles, {zIndex: this.props.image.distanceFromSelected() || 100 });
  },
  setPosition: function (width) {
    var container = this.refs.container.getDOMNode();
    if(!this.props.image.selected){
      var newWidth = (width/2) + ((this.props.image.distanceFromSelected()-1) * 25);
      if(!this.props.image.isPastSelected()){
        if(this.loaded){
          newWidth = -(newWidth + container.offsetWidth);
        } else {
          this.baseContainerOffset = newWidth;
        }
      }
      container.style.marginLeft = "" + newWidth + "px";
    }
  },
  position: function () {
    this.loaded = true;
    var el = this.refs.image.getDOMNode();
    var container = this.refs.container.getDOMNode();
    var width = el.offsetWidth/2;
    container.style.left = "50%";
    if(this.props.image.selected){
      container.style.marginLeft = "-" + width + 'px';
      this.props.setPositions();
      return;
    }
    if(this.props.image.isPastSelected()){
      el.style.left = "-" + width + "px";
      el.style.transform = "rotateY(  75deg ) translateX(" + width + "px)";
    } else {
      if(this.baseContainerOffset){
        var newWidth = container.offsetWidth;
        newWidth = -(newWidth + this.baseContainerOffset);
        container.style.marginLeft = "" + newWidth + "px";
      }
      el.style.left = "" + width + "px";
      el.style.transform = "rotateY(  285deg ) translateX(-" + width + "px)";
    }
  },
  styles: function () {
    var styles = this.activeStyles(wrapperStyle);
    styles = this.beforeStyles(styles);
    return this.setZIndex(styles);
  },
  liClass: function () {
    return this.props.image.selected ? "image selected" : this.props.image.isPastSelected() ? "image" : "image before-selected";
  },
  render: function () {
    return (
      <div style={this.styles()} className={"pos"+this.props.image.index} ref="container">
        <li style={baseStyles} className={this.liClass()} ref="image">
          <ImageLoader
            src={this.props.image.url}
            onLoad={this.position}
            imgProps={{height: "500px"}}>
            Image load failed!
          </ImageLoader>
        </li>
      </div>
    );
  }
});

var wrapperStyle = {
  transformStyle: "preserve-3d",
  perspective: "2000px",
  perspectiveOrigin: "center left",
  position: "absolute",
  display: "none",
  height: "90%",
  paddingTop: "20px"
};

var beforeStyles = {
  perspectiveOrigin: "center right",
};

var baseStyles = {
  position: "relative",
  left: "0",
  padding: "10px",
  backgroundColor: "#fff"
};

var closeStyles = {
  display: "inline-block",
};

module.exports = ImageComponent;