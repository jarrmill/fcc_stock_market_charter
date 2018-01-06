import axios from 'axios';

//"https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?api_key=YOURAPIKEY"
export function get_stock(){
  const root_url = "https://www.quandl.com/api/v3/datasets/WIKI/"
  const datatype = "/data.json?api_key=";
  const api_key = "b_E8Lf_YyoR8LxfC6wmd";
  const start_date = "&start_date=2017-10-01";
  var full_url = root_url + "AAPL" + datatype + api_key + start_date;
  console.log("Initiating get request at: ", full_url);
  axios.get(full_url).then(response => {
    return response;
  }).catch(error => {
    console.log("error!", error);
  });
}
//this function posts to database with new stock info
//database will update data
export function request_stock(stock_name){
  console.log("Requesting new stock");
  axios.post('http://localhost:8080/newstock', {stock: stock_name}).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })
}

export function getAllStocks(){
  return new Promise(function(resolve, reject){
    axios.get('http://localhost:8080/getstocks').then(response => {
      resolve(response.data);
    }).catch(error => {
      reject(error);
    });
  });
}
