import {
        FlexibleWidthXYPlot,
        XAxis,
        HorizontalGridLines,
        Crosshair,
        VerticalGridLines,
        LineSeries} from 'react-vis';
import React, { Component } from "react";
import { ChartContainer, CrosshairContainer } from '../styled';
import CrosshairRow from '../crosshair';
import '../../node_modules/react-vis/dist/style.css';
class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {stocks: this.props.data, mouseCoords: []}
  }
  renderChart = () => {
    var data = this.props.data;
    const numberOfTicks = 10;
    var tickArray = this.calculateTickArray(data, numberOfTicks);
    //var axisArray = tickArray.map(x => new Date(x).toDateString());
    //var crosshairArray = this.calculateCrosshairData(tickArray);
    var options = { day: '2-digit', year:'numeric', month: '2-digit'}
    var ch = [{x: this.state.mouseCoords[0], y: 50},{x: 1279065600001}];
    var pointerValue = this.props.data[0].data[this.state.mouseCoords[1]];
    const date = pointerValue ? Date.parse(pointerValue[0]) : null;
    return (
      <ChartContainer>
      <FlexibleWidthXYPlot height={500}
                           onMouseLeave={(event) => this.handleMouseLeave(event)}
                           style={{paddingRight: "20px"}}>
        <Crosshair values={ch}>
          <CrosshairContainer style={{padding: "5px"}}>
           <h3>{new Date(date).toLocaleDateString("en-US", options)}</h3>
           {this.renderCrossHairData()}
          </CrosshairContainer>
        </Crosshair>
        <HorizontalGridLines />
        <XAxis tickValues={tickArray} tickFormat={v => new Date(v).toLocaleDateString("en-US", options)} />
        <VerticalGridLines tickValues={tickArray} style={{stroke: "#777"}} />
        {this.renderLineSeries(data)}
      </FlexibleWidthXYPlot>
      </ChartContainer>
    )
  };
  //<LineSeries data={data1} stroke="red" fill="green"/>
  renderLineSeries = (data) => {
    //console.log("Renderline data: ", data);
    var aggData = data.map((dataset, i) => this.formatLineData(dataset, i));
    return aggData;
  };
  formatLineData = (dataset, i) => {
    //console.log("Formatline Data: " , dataset);
    var lineSeriesData = dataset.data.map((entry, ind) => {
      return {x: Date.parse(entry[0]), y: entry[2]};
    })
    return <LineSeries
                key={i}
                data={lineSeriesData}
                xType="time-utc"
                style={{fill:"none"}}
                stroke={dataset.color}
                onNearestX={(datapoint, event) => this.handleMouseMove(datapoint, event)}
                />
    //return (<LineSeries> data={demoData} stroke="red"</LineSeries>);
    //data is an array of stock data

  }
  handleMouseMove = (datapoint, event) => {
    this.setState({mouseCoords: [datapoint.x, event.index]});
  };
  handleMouseLeave = (event) => {
    this.setState({mouseCoords: [0, 0]});
  }
  calculateTickArray =(data, numberOfTicks) => {
    //ldi = index of array w/ longest data - longest data index
    const ldi = this.findLongestDateRange(data);
    const fraction = Math.floor(data[ldi].data.length / numberOfTicks);
    var TickArray = [];
    for(var i = 0; i < numberOfTicks; i++){
      var iteration = i * fraction;
      //fetches each date at each iteration and parses it to utc format;
      TickArray.push(Date.parse(data[ldi].data[iteration][0]));
    }
    return TickArray;
  };
  calculateCrosshairData = (array) => {
    var results = [];
    array.forEach(coord => {
      results.push({x: coord, y: 10});
    })
    return results;
  }
  renderCrossHairData = () => {
    var infoArray = []
    var index = this.state.mouseCoords[1];
    for(var i = 0; i < this.props.data.length; i++){
      if(this.props.data[i].data[index]){
        infoArray.push(<CrosshairRow data={this.props.data[i]} index={index} />);
        //infoArray.push(<p>{this.props.data[i].name}:{this.props.data[i].data[index][1]}</p>);
      }else{
        //
      }

    }
    return infoArray;
  };
  findLongestDateRange = (data) => {
    var highestNumber = 0;
    var highestIndex = 0;

    for (var i = 0; i < data.length; i++){
      if(data[i].data.length > highestNumber){
        highestNumber = data[i].data.length;
        highestIndex = i;
      }
    }
    return highestIndex;
  };
  render(){
    if(this.props.data !== null){
      return <div>{this.renderChart()}</div>
    } else{
      return <div>State not good!!1!</div>
    }
  }
}
export default Chart;
