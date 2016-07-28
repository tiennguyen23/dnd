var React = require('react');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');
var MyComponent = require('./my-component');

var MainDnD = React.createClass({

    getInitialState: function() {
        return {
          checkFinished:false,
          dashBoardV2:{},
          divs : [
                  [
                    {
                      "className": "col-sm-10",
                      "type": "component1"
                    }
                  ],
                  [
                    {
                      "className": "col-sm-7",
                      "type": "component2"
                    },
                    {
                      "className": "col-sm-5",
                      "type": "component3"
                    }
                  ],
                  [
                    {
                      "className": "col-sm-12",
                      "type": "component4"
                    }
                  ],
                  [
                    {
                      "className": "col-sm-5",
                      "type": "component5"
                    },
                    {
                      "className": "col-sm-7",
                      "type": "component6"
                    }
                  ],
                  [
                    {
                      "className": "col-sm-12",
                      "type": "component7"
                    }
                  ],
                  [
                    {
                      "className": "col-sm-12",
                      "type": "component8"
                    }
                  ]
                ],
          rows : {}

        };
    },

    componentWillMount: function(){

    },



    saveDashBoardV2 : function(divs){

    },

    showSaveUXNotice: function(status,message){

  	},

    swapDiv: function(dragItem, dropItem){
        // var divs = this.state.divs;
        // console.log(dragItem);
        // console.log(dropItem);
        // var divDrag=JSON.parse(JSON.stringify(divs[dragItem.indexRow][dragItem.indexDiv]));
        // var divDrog=JSON.parse(JSON.stringify(divs[dropItem.indexRow][dropItem.indexDiv]));
        // if(divDrag.className==="col-sm-12" ||divDrog.className==="col-sm-12"){
        //   // list div change
        //   var divDrags=JSON.parse(JSON.stringify(divs[dragItem.indexRow]));
        //   var divDrogs=JSON.parse(JSON.stringify(divs[dropItem.indexRow]));
        //   divs[dragItem.indexRow]=divDrogs;
        //   divs[dropItem.indexRow]=divDrags;
        // }else{
        //   var divDrag=JSON.parse(JSON.stringify(divs[dragItem.indexRow][dragItem.indexDiv]));
        //   var divDrog=JSON.parse(JSON.stringify(divs[dropItem.indexRow][dropItem.indexDiv]));
        //   divs[dragItem.indexRow][dragItem.indexDiv].type=divDrog.type;
        //   divs[dropItem.indexRow][dropItem.indexDiv].type=divDrag.type;
        // }
        // // this.state.divs=divs;
        // this.setState({});
        if(!this.state.onDrog){
          return;
        }
        console.log("swapDiv");
        this.onDragEnd(dragItem);
    },

    swapDivAttr: function(divs, dragIndex, dropIndex, key){
        var temp = divs[dragIndex][key];
        divs[dragIndex][key] = divs[dropIndex][key];
        divs[dropIndex][key] = temp;
    },

    onDragEnd : function(event){
        var onDrog={action:action,indexRow:indexRow,indexDiv:indexDiv};
        var divs = this.state.divs;
        var dragItem=this.state.dragItem;
        var onDrog=this.state.onDrog;
        var action=onDrog.dragItem;
        var indexRow=onDrog.indexRow;
        var indexDiv=onDrog.indexDiv;

        if(dragItem){
          var divDrags=JSON.parse(JSON.stringify(divs[dragItem.indexRow]));
          var item=JSON.parse(JSON.stringify(divDrags[indexDiv]));
          divDrags.splice(indexDiv, 1);
          console.log(divDrags);
          var divDrogs=JSON.parse(JSON.stringify(divs[indexRow]));
          if(action==="before"){
            divDrogs.splice(dragItem.indexDiv, 0, item);
          }else{
            divDrogs.splice((dragItem.indexDiv+1), 0, item);
          }
          this.state.divs[dragItem.indexRow]=divDrags;
          this.state.divs[indexRow]=divDrogs;
          this.state.divs.map(function(row, indexRow){
              var className=12/row.length;
              row.map(function(div, indexDiv){
                div["className"]="col-sm-"+className;
              });
          });
          console.log(this.state.divs);
          this.setState({});
        }
    },

    onBeginDragItem : function(dragItem){
      console.log(dragItem);
      // var divDrag=JSON.parse(JSON.stringify(divs[dragItem.indexRow]));
      this.state.dragItem=dragItem;
    },

    onDragOver : function(action,indexRow,indexDiv,event){

      event.preventDefault();

      // var divs = this.state.divs;
      // var dragItem=this.state.dragItem;
      // if(dragItem){
      //   var divDrags=JSON.parse(JSON.stringify(divs[dragItem.indexRow]));
      //   var item=JSON.parse(JSON.stringify(divDrags[indexDiv]));
      //   divDrags.splice(indexDiv, 1);
      //   console.log(divDrags);
      //   var divDrogs=JSON.parse(JSON.stringify(divs[indexRow]));
      //   if(action==="before"){
      //     divDrogs.splice(dragItem.indexDiv, 0, item);
      //   }else{
      //     divDrogs.splice((dragItem.indexDiv+1), 0, item);
      //   }
      //   this.state.divs[dragItem.indexRow]=divDrags;
      //   this.state.divs[indexRow]=divDrogs;
      //   this.state.divs.map(function(row, indexRow){
      //       var className=12/row.length;
      //       row.map(function(div, indexDiv){
      //         div["className"]="col-sm-"+className;
      //       });
      //   });
      //   console.log(this.state.divs);
      //   this.setState({});
      // }
      var onDrog={action:action,indexRow:indexRow,indexDiv:indexDiv};
      // console.log(action);
      // console.log(indexRow);
      // console.log(indexDiv);
      this.state.onDrog=onDrog;

    },
    render() {
      return (
        <div className="layout page-content">
          {
            this.state.divs.map((row, indexRow) => {
              return (
                <div className="row">
                  {
                    row.map((div, indexDiv) => {
                      return (
                        <div>
                          <div className="col-sm-1" draggable='true' onDragOver={this.onDragOver.bind(this,"before",indexRow,indexDiv)}> ROW {indexRow} COL {indexDiv} AFTER</div>
                          <MyComponent key={indexRow+"."+indexDiv} type={div.type} onBeginDragItem={this.onBeginDragItem} onDragEnd={this.onDragEnd}
                                indexRow={indexRow} indexDiv={indexDiv}
                                className={div.className} swapDiv={this.swapDiv}/>
                              <div className="col-sm-1" draggable='true' onDragOver={this.onDragOver.bind(this,"after",indexRow,indexDiv)}> ROW {indexRow} COL {indexDiv} BEFORE</div>
                        </div>
                      );
                    })
                  }
                  <div >ROW {indexRow}</div>
                </div>
              );
            })
          }
        </div>
      );
    }
});

module.exports = DragDropContext(HTML5Backend)(MainDnD);
