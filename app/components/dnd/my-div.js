var React = require('react');
var PropTypes = React.PropTypes;
var ReactDnd = require('react-dnd');
var DragSource = ReactDnd.DragSource;
var DropTarget = ReactDnd.DropTarget;
var flow = require('lodash/flow');

var divSource = {
  beginDrag: function (props) {
    console.log('Drag Item Index: ' + props.index);
    return {
        index: props.index,
        className: props.className
    };
  },
  endDrag(props, monitor) {
      var item = monitor.getItem();
      var dropResult = monitor.getDropResult();
      if (dropResult) {
        props.swapDiv(item.index, dropResult.index);
      }
    }
};

var divTarget = {
  canDrop: function (props, monitor) {
      var item = monitor.getItem();
      var dropResult = monitor.getDropResult();
      if(item.index == props.index){
        return false;
      }else if(item.className.indexOf('12') > -1 && props.className.indexOf('12') == -1){
        return false;
      }
      return true;
  },
  drop: function (props) {
    console.log('Drop Item Index: ' + props.index);
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
            var className = '';
            if(!isDragging){
                if(isActive){
                    className = 'active';
                }else if(!canDrop && isOver){
                    className = 'passive';
                }
            }

            if(this.props.type==='component1'){
                return(
                    <div className={className}>
                        <img src="/img/7.png"  width='100%' className="img-responsive"/>
                    </div>
                )
            }
            if(this.props.type==='component2'){
                return(
                    <div className={className} style={{height:'385px'}}>
                        <img src="/img/1.png" width='100%'  className="img-responsive"/>
                    </div>
                )
            }
            if(this.props.type==='component3'){
                return(
                    <div className={className} style={{height:'385px'}}>
                        <img src="/img/2.png" width='100%'  className="img-responsive"/>
                    </div>
                )
            }
            if(this.props.type==='component4'){
                return(
                    <div className={className} style={{height:'385px'}}>
                        <img src="/img/3.png" width='100%'  className="img-responsive"/>
                    </div>
                )
            }
            if(this.props.type==='component5'){
                return(
                    <div className={className} style={{height:'385px'}}>
                        <img src="/img/4.png" width='100%'  className="img-responsive"/>
                    </div>
                )
            }
            if(this.props.type==='component6'){
                return(
                    <div className={className}>
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