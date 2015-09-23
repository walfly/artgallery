var React = require('react');
var Carousel = require('./components/carousel.jsx');
var Images = require('./stores/images.js');



React.render(
  <Carousel images={new Images()}/>,
  document.getElementById('app')
);

