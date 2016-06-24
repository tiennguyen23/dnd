var React = require('react');
var PropTypes = React.PropTypes;
var ReactDnd = require('react-dnd');
var DragSource = ReactDnd.DragSource;
var DropTarget = ReactDnd.DropTarget;
var flow = require('lodash/flow');

var MyForm = require('./my-form');

var divSource = {
  beginDrag: function (props) {
    return {
        index: props.index
    };
  },
  endDrag(props, monitor) {
      var item = monitor.getItem();
      var dropResult = monitor.getDropResult();

      if (dropResult) {
        if(item.index != dropResult.index){
            props.swapDiv(item.index, dropResult.index);
        }
      }
    }
};

var divTarget = {
  drop: function (props) {
    return {
        index: props.index
    };
  }
};

function collectDrag(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function collectDrop(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}


var MyDiv = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,

    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
  },

  render: function () {
    var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

    var connectDropTarget = this.props.connectDropTarget;
    var isOver = this.props.isOver;
    var canDrop = this.props.canDrop;
    var isActive = canDrop && isOver;

    return connectDragSource(connectDropTarget(
      <div className={this.props.className} id={this.props.id} index={this.props.index} style={{
        opacity: isDragging ? 0.3 : 1,
        fontSize: 16,
        cursor: 'move'
      }}>
        {(() => {
            if(this.props.type==='component1'){
                return(
                    <div className={isActive ? 'is-active' : ''}>
                        <img src="/img/7.png"  width='100%' className="img-responsive"/>
                    </div>
                )
            }
            if(this.props.type==='component2'){
                return(
                    <div className={isActive ? 'is-active' : ''} style={{height:'385px'}}>
                        <img src="/img/1.png" width='100%'  className="img-responsive"/>
                    </div>
                )
            }
            if(this.props.type==='component3'){
                return(
                    <div className={isActive ? 'is-active' : ''} style={{height:'385px'}}>
                        <img src="/img/2.png" width='100%'  className="img-responsive"/>
                    </div>
                )
            }
            if(this.props.type==='component4'){
                return(
                    <div className={isActive ? 'is-active' : ''} style={{height:'385px'}}>
                        <img src="/img/3.png" width='100%'  className="img-responsive"/>
                    </div>
                )
            }
            if(this.props.type==='component5'){
                return(
                    <div className={isActive ? 'is-active' : ''} style={{height:'385px'}}>
                        <img src="/img/4.png" width='100%'  className="img-responsive"/>
                    </div>
                )
            }
            if(this.props.type==='component6'){
                return(
                    <div className={isActive ? 'is-active' : ''}>
                        <img src="/img/8.png"  width='100%' className="img-responsive"/>
                    </div>
                )
            }
        })()}
      </div>
    ));
  }
});

module.exports = flow(
    DragSource("div", divSource, collectDrag),
    DropTarget("div", divTarget, collectDrop)
)(MyDiv);