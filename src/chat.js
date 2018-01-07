import React from "react";
import io from "socket.io-client";
import { getAllStocks } from './stock_functions';
import Chart from './chart/chart.js';
import { MainContainer, ButtonContainer, Button, ButtRow, ButtonColor } from './styled';
import SearchBar from './searchbar';

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            stockInput:'', stocks: null
        };
        const root_url = process.env.REACT_APP_DB_PATH;

        this.socket = io(root_url);

        this.socket.on('STOCKS_UPDATE', function(data){
            console.log("Update message recieved: ", data);
            updateStocks(data);

        });

        this.socket.on('ERROR', function(data){
          console.log("Bad data name: ", data.error_code);
        })

        const updateStocks = data => {
            this.setState({stocks: data, stockInput: ""}, () => {
              console.log("Stocks updated - ", this.state.stocks);
            });
        };
    }
    componentWillMount(){
      console.log("Initializing stocks");
      getAllStocks().then(stocks => {
        this.setState({stocks: stocks}, () => {
          //console.log("Stocks initialized", this.state.stocks);
        })
      })
      /*this.setState({stocks: getAllStocks()}, ()=> {
        console.log("Stocks initialized, ", this.state.stocks);
      });*/
    }
    GetStocks = () => {
      //get_stocks(this.state.stockInput);
      //request_stock(this.state.stockInput);
      //get_stock();
      console.log("emitting stock: ", this.state.stockInput);
      this.socket.emit('NEW_STOCK', {
          stock : this.state.stockInput
      })
    };
    handleSubmit = () => {
      this.GetStocks();
      this.setState({stockInput: ''}, () => {
        console.log("Input should be reset:", this.state.stockInput );
      });
    }
    removeStock = (stock_name) => {
      this.socket.emit("DEL_STOCK", {
        stock: stock_name
      });
    }
    renderButtons = () => {
      if(this.state.stocks == null){
        return null;
      }
      var Buttons = this.state.stocks.map((stock, i) => {
        return(
          <ButtRow>
            <ButtonColor style={{backgroundColor:stock.color}}/>
            <Button key={i} onClick={()=> this.removeStock(stock.name)}>{stock.name}</Button>
          </ButtRow>);
      });
      return Buttons;
    };
    handleSearchBarChange = (ev) => {
      this.setState({stockInput: ev.target.value});
    }
    render(){
      if(this.state.stocks !== null){
        const stockData = this.state.stocks.slice();
          return (
            <MainContainer>
                <SearchBar title={this.state.stockInput}
                           changeFunction={this.handleSearchBarChange}
                           submitFunction={this.handleSubmit} />
                <Chart data={stockData} />
                <ButtonContainer>
                  {this.renderButtons()}
                </ButtonContainer>
            </MainContainer>
          );
      } else {
        console.log("No state detected...", this.state.stocks);
        return (<div>...loading</div>)
      }
    }
}

export default Chat;
