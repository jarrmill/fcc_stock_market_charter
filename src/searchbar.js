import React from "react";
import {SearchBarContainer, SearchField, SearchButton} from './styled';
class SearchBar extends React.Component{
  render(){
    const welcome = ">: Enter NASDAQ company here! EBAY - AAPL - AMZN - GOOG ";
    return (
      <SearchBarContainer>
        <SearchField value={this.props.title} placeholder={welcome} onChange={(event) => this.props.changeFunction(event)} />
        <SearchButton onClick={this.props.submitFunction}> Send! </SearchButton>
      </SearchBarContainer>
    );
  }
}

export default SearchBar;
