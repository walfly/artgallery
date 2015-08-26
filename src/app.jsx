var React = require('react');
var Carousel = require('./components/carousel.jsx');

console.log('hello');

React.render(
  <Carousel copy={"hello"}/>,
  document.getElementById('app')
);