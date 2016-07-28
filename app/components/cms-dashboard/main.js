var React = require('react');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');


var focusHighlightDefault={
  indexCol:"",
  indexRow:"",
  list:[]
};

var widgetConfigDefault={
    affiliateId: "0",
    widgets: [

    ]
};

var limitRow=3;

widgetConfigDefault = {
    affiliateId: "0",
    widgets: [

    ]
};


var MainDnD = React.createClass({

    getInitialState: function() {
        return {
          checkFinished : false,
          focusWidgets  :  "",
          focusHighlights : JSON.parse(JSON.stringify(focusHighlightDefault)),
          isOpen: false,
          componentType : "",
          widgetConfig : JSON.parse(JSON.stringify(widgetConfigDefault)),
        };
    },

    componentWillMount: function(){

    },

    isOpenTool: function(e) {
      e.preventDefault();
      this.setState( { isOpen: !this.state.isOpen } );
    },


    saveCMSDashBoard : function(divs){

    },

    showUXNotice: function(status,message){

  	},

    // check number
    checkNumber : function(value){
      var check=false;
      if(value!=null && value!=undefined){
        check=true;
      }
      return check;
    },

    // add Widget (ADD)
    onDragStartWidget: function(componentType,event){
      event.dataTransfer.effectAllowed = 'move';
      // setData() is necessary for starting the drag in firefox
      event.dataTransfer.setData('text', 'dummy');
      this.setState({componentType:componentType});

    },

    // over Widget (ADD)
    onDragOverWidget : function(focusWidgets,event){
      event.preventDefault();
      console.log(focusWidgets);
      if(this.state.focusWidgets || this.state.focusWidgets!==focusWidgets ){
        this.setState({focusWidgets:focusWidgets,focusHighlights:JSON.parse(JSON.stringify(focusHighlightDefault))});
      }
    },

    // drag leave widget (ADD)
    onDragLeaveWidget: function(focusWidgets,event){
      event.preventDefault();
      if(this.state.focusWidgets===focusWidgets ){
        this.setState({focusWidgets:""});
      }
    },

    // drag end widget (ADD)
    onDragEndWidget : function(event){
      event.preventDefault();
      this.setState({componentType:"",focusHighlights:JSON.parse(JSON.stringify(focusHighlightDefault))});
    },

    // drop end widget (ADD)
    onDropEndWidget : function(componentType,indexRow,indexCol,action,event){
      event.preventDefault();
      var widgetConfig=this.state.widgetConfig;
      var widgets=
        {
            "col": "12",
            "componentType": this.state.componentType,
            "moduleItem": []
        }
      ;
      // add row
      if(!this.checkNumber(indexCol)){
        if(!this.checkNumber(indexRow)){
          widgetConfig.widgets.push([widgets]);
        }else{
          var index=indexRow+1;
          widgetConfig.widgets.splice(index, 0, [widgets]);
        }
        this.setState({widgetConfig:widgetConfig,focusWidgets:""});
      // add col & row
      }else{
        var rowWidgets=JSON.parse(JSON.stringify(widgetConfig.widgets[indexRow]));
        if(action==="before"){
          rowWidgets.splice(indexCol, 0, widgets);
        }else if(action==="after"){
          rowWidgets.splice((indexCol+1), 0, widgets);
        }
        var numCol=12/(rowWidgets.length);
        rowWidgets.map(function(item,index){
          rowWidgets[index]["col"]=numCol;
        });
        widgetConfig.widgets[indexRow]=rowWidgets;
        this.setState({widgetConfig:widgetConfig,focusWidgets:""});
      }
    },

    onDragOverHighlights:function(indexRow,indexCol,event){
      event.preventDefault();
      var focusHighlights=this.state.focusHighlights;
      if(focusHighlights.indexRow===indexRow && focusHighlights.indexCol===indexCol){
        return;
      }else{
        focusHighlights.indexRow=indexRow;
        focusHighlights.indexCol=indexCol;
        focusHighlights.list.push(indexRow);
        if(indexRow>0){
          focusHighlights.list.push(indexRow-1);
        }
        if(this.checkNumber(indexCol)){
          focusHighlights.list.push(indexRow+"."+indexCol+".before");
          focusHighlights.list.push(indexRow+"."+indexCol+".after");
        }
        if(indexCol>0){
          focusHighlights.list.push(indexRow+"."+(indexCol-1)+".after");
        }
        this.setState({focusHighlights:focusHighlights});
      }

    },

    onDragLeaveHighlights:function(indexRow,indexCol){
      event.preventDefault();
      var focusHighlights=this.state.focusHighlights;
      if(focusHighlights.indexRow===indexRow && focusHighlights.indexCol===indexCol){
        this.setState({focusHighlights:JSON.parse(JSON.stringify(focusHighlightDefault))});
      }
    },

    render() {
      return (
        <div className="dashboard-page dashboard-new-layout">
          <div id="page-title">
            <h1 className="page-header">Dashboard</h1>
            <div className="dashTools">
                <a href="#" className=""></a>
                <a href="#"  className={(this.state.isOpen ? 'isActive' : '')} onClick={this.isOpenTool} ><i className="fa fa-plus"></i></a>
            </div>
          </div>
          {!(this.state.widgetConfig && this.state.widgetConfig.widgets && this.state.widgetConfig.widgets.length) &&
            <div className={'main-content '+ (this.state.isOpen ? 'isOpenTool' : '')}
              onDragOver={this.onDragOverWidget.bind(this,"addWidgets")}
              onDragLeave={this.onDragLeaveWidget.bind(this,"addWidgets")}
              onDrop={this.onDropEndWidget.bind(this,"snapshots",null,null,"")}>
                <div className={"box__input-addWidget" + (this.state.focusWidgets==="addWidgets" ? ' choose ' : ' no-choose ')} >
                    <span> + ADD  WIDGET</span>
                </div>
            </div>
          }
          {(this.state.widgetConfig && this.state.widgetConfig.widgets && this.state.widgetConfig.widgets.length > 0) &&
            <div className={ 'main-content ' + (this.state.isOpen ? 'isOpenTool' : '')}>
              {
                this.state.widgetConfig.widgets.map((row, indexRow) => {
                  return (
                    <div>
                      <div className="row" key={indexRow}>
                        { row.length < limitRow &&
                          <div className={"point-focus-begin"+ (this.state.focusWidgets===(indexRow+".0.before") ? ' choose ' : ' no-choose ')
                              + (this.state.focusHighlights.list.indexOf(indexRow+"."+"0"+".before")>=0  ? ' highlight ' : '') }
                              key={indexRow+"."+"0"+".before"}
                              onDragLeave={this.onDragLeaveWidget.bind(this,indexRow+".0.before")}
                              onDragOver={this.onDragOverWidget.bind(this,indexRow+".0.before")}
                              onDrop={this.onDropEndWidget.bind(this,"snapshots",indexRow,0,"before")}
                          ></div>
                        }
                        {(() => {
                          var colWidgets=row.length-1;
                          var rowWidgets=[];
                          if(colWidgets>=1 && row.length < limitRow){
                            for (var col = 0; col < colWidgets; col++) {
                              var left= ((100/row.length)*(col+1))+"%";
                              console.log(indexRow+"."+colWidgets+".after");
                              rowWidgets.push(
                                <div style={{'left': left}} className={"point-focus-end-col-"+col+" point-focus-end-col "+(this.state.focusWidgets===(indexRow+"."+col+".after") ? ' choose ' : ' no-choose ')
                                    + (this.state.focusHighlights.list.indexOf(indexRow+"."+col+".after")>=0  ? ' highlight ' : '') }
                                    key={indexRow+"."+col+".after"}
                                    onDragLeave={this.onDragLeaveWidget.bind(this,indexRow+"."+col+".after")}
                                    onDragOver={this.onDragOverWidget.bind(this,indexRow+"."+col+".after")}
                                    onDrop={this.onDropEndWidget.bind(this,"snapshots",indexRow,col,"after")}></div>

                              );
                            }
                          }
                          console.log(rowWidgets);
                          return rowWidgets;
                        })()}
                        {
                          row.map((widget, indexCol) => {
                            return (
                                <div className={"col-md-"+widget.col} key={indexRow+"."+indexCol}
                                  onDragOver={this.onDragOverHighlights.bind(this,indexRow,indexCol)}
                                  onDragLeave={this.onDragLeaveHighlights.bind(this,indexRow,indexCol)} >
                                  <div className="widget">
                                    <div className="widget-heading clearfix">
                                        <div className="widget-control">
                                            <a href="#" className="icon-settings"><i className="fa fa-cog"></i></a>
                                        </div>
                                        <h2 className="widget-title">{widget.componentType}</h2>
                                    </div>
                                    <div className="widget-content"></div>
                                  </div>
                                </div>
                            );
                          })
                        }
                        { row.length < limitRow &&
                          <div className={"point-focus-end"+(this.state.focusWidgets===(indexRow+"."+(row.length-1)+".after") ? ' choose ' : ' no-choose ')
                              + (this.state.focusHighlights.list.indexOf(indexRow+"."+(row.length-1)+".after")>=0  ? ' highlight ' : '') }
                              key={indexRow+"."+(row.length-1)+".after"}
                              onDragLeave={this.onDragLeaveWidget.bind(this,indexRow+"."+(row.length-1)+".after")}
                              onDragOver={this.onDragOverWidget.bind(this,indexRow+"."+(row.length-1)+".after")}
                              onDrop={this.onDropEndWidget.bind(this,"snapshots",indexRow,(row.length-1),"after")}></div>
                        }

                      </div>
                      <div className={"row point-bottom" + (this.state.focusWidgets===(indexRow+".bottom") ? ' choose ' : ' no-choose ')
                        + (this.state.focusHighlights.list.indexOf(indexRow)>=0  ? ' highlight ' : '') }
                        key={indexRow+"."+".bottom"}
                        onDragLeave={this.onDragLeaveWidget.bind(this,indexRow+".bottom")}
                        onDragOver={this.onDragOverWidget.bind(this,indexRow+".bottom")}
                        onDrop={this.onDropEndWidget.bind(this,"snapshots",indexRow,null,"")}>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          }

          <div className={ 'moduleCategories ' + (this.state.isOpen ? 'isOpenTool' : '')}>
            <div className="item-moduleCategorie">
              <h3>Quick view</h3>
              <div
                className={this.state.componentType==="snapshots" ? "component choose" : "component no-choose" }  draggable='true'
                onDragStart={this.onDragStartWidget.bind(this,"snapshots")}
                onDragEnd={this.onDragEndWidget}>Snapshots</div>
            </div>
            <div className="item-moduleCategorie">
              <h3>Producer Tools</h3>
              <div
                className={this.state.componentType==="mostPopular" ? "component choose" : "component no-choose" }  draggable='true'
                onDragStart={this.onDragStartWidget.bind(this,"mostPopular")}
                onDragEnd={this.onDragEndWidget}>
              Most Popular</div>
              <div
                className={this.state.componentType==="editorList" ? "component choose" : "component no-choose" }  draggable='true'
                onDragStart={this.onDragStartWidget.bind(this,"editorList")}
                onDragEnd={this.onDragEndWidget}
              >Editor List</div>
            </div>
            <div className="item-moduleCategorie">
              <h3>Analytics</h3>
              <div
                className={this.state.componentType==="googleAnalytics" ? "component choose" : "component no-choose" }  draggable='true'
                onDragStart={this.onDragStartWidget.bind(this,"googleAnalytics")}
                onDragEnd={this.onDragEndWidget}
              >Google analytics</div>
              <div
                className={this.state.componentType==="chartbeat" ? "component choose" : "component no-choose" }  draggable='true'
                onDragStart={this.onDragStartWidget.bind(this,"chartbeat")}
                onDragEnd={this.onDragEndWidget}
              >Chartbeat</div>
              <div
                className={this.state.componentType==="sharablee" ? "component choose" : "component no-choose" }  draggable='true'
                onDragStart={this.onDragStartWidget.bind(this,"sharablee")}
                onDragEnd={this.onDragEndWidget}
              >sharablee</div>
            </div>
            <div className="item-moduleCategorie">
              <h3>Weather</h3>
              <div
                className={this.state.componentType==="weatherOverview" ? "component choose" : "component no-choose" }  draggable='true'
                onDragStart={this.onDragStartWidget.bind(this,"weatherOverview")}
                onDragEnd={this.onDragEndWidget}
              >Weather Overview</div>
            </div>
          </div>
      </div>
      );
    }
});

module.exports = DragDropContext(HTML5Backend)(MainDnD);
