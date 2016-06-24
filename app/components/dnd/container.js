var React = require('react');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');
var MyDiv = require('./my-div');

var Container = React.createClass({
    getInitialState: function() {
        return {
            divs: [{
                id: 1,
                className: 'col-md-12',
                type :'component1',
                group: 1
            }, {
                id: 2,
                className: 'col-md-7',
                type :'component2',
                group: 2
            }, {
                id: 3,
                className: 'col-md-5',
                type :'component3',
                group: 2
            }, {
                id: 4,
                className: 'col-md-6',
                type :'component4',
                group: 3
            }, {
                id: 5,
                className: 'col-md-6',
                type :'component5',
                group: 3
            }, {
                id: 6,
                className: 'col-md-12',
                type :'component6',
                group: 4
            }]
        };
    },
    swapDiv: function(dragIndex, dropIndex){
        var divs = this.state.divs;
        var dragGroup = divs[dragIndex].group;
        var dropGroup = divs[dropIndex].group;
        if(divs[dragIndex].className.indexOf('12') > -1){
            // drop: 2->1, 2->1
            for(var i = 0 ; i < divs.length ; i++){
                if(divs[i].group == dropGroup){
                    divs[i].group = dragGroup;
                }
            }
            // drag: 2->1
            divs[dragIndex].group = dropGroup;
        }else if(divs[dropIndex].className.indexOf('12') > -1){
            // drag: 1->2, 1->2
            for(var i = 0 ; i < divs.length ; i++){
                if(divs[i].group == dragGroup){
                    divs[i].group = dropGroup;
                }
            }
            // drop: 2->1
            divs[dropIndex].group = dragGroup;
        }else{
            this.swapDivAttr(divs, dragIndex, dropIndex, 'type');
        }

        // sort by group
        this.state.divs = divs.sort(function(a,b) {return (a.group > b.group) ? 1 : ((b.group > a.group) ? -1 : 0);} );
        this.setState(this.state);
    },
    swapDivAttr: function(divs, dragIndex, dropIndex, key){
        var temp = divs[dragIndex][key];
        divs[dragIndex][key] = divs[dropIndex][key];
        divs[dropIndex][key] = temp;
    },
  render() {
    return (
      <div className="layout container">
        {this.state.divs.map((div, i) => {
          return (
            <MyDiv key={div.id} type={div.type} id={div.group}
                  index={i}
                  className={div.className} swapDiv={this.swapDiv}/>
          );
        })}
      </div>
    );
  }
});

module.exports = DragDropContext(HTML5Backend)(Container);