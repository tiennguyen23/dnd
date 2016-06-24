var React = require('react');
var Container = require('./dnd/container');
var MyDraggable = React.createClass({
  render: function() {
    return (
        <Container />
    )
  }
});
module.exports = MyDraggable;