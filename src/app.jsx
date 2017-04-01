var React = require('react');
var Carousel = require('./components/carousel.jsx');
var Images = require('./stores/images.js');


const artImages = new Images('art');
const installImages = new Images('installations');

React.render(
  <Carousel images={artImages}/>,
  document.getElementById('app')
);

