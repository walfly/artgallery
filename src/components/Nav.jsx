var React = require('react');

var Nav = React.createClass({
    bio: function () {},
    paintings: function () {},
    installations: function () {},
    render: function () {
        return <ul>
            <li onClick={this.bio}>Bio</li>
            <li onClick={this.paintings}>Paintings</li>
            <li onClick={this.installations}>Installations</li>
        </ul>
    }
});
