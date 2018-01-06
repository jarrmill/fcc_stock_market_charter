import React from "react";
import {EntryContainer, Dot, DotContainer, DataEntry} from './styled';
class CrosshairRow extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
  }
  render(){
    return (
      <EntryContainer>
        <DotContainer>
          <Dot style={{backgroundColor:this.props.data.color}} />
        </DotContainer>
        <DataEntry>{this.props.data.name} : {this.props.data.data[this.props.index][1].toFixed(1)}</DataEntry>
      </EntryContainer>
    );
  }
}

export default CrosshairRow;
