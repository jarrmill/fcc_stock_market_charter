import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #eee;

`

export const ChartContainer = styled.div`
  width: 80%;
  height: 100%;
  background-color: #eee;
`
export const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  top: 30px;
  right: 0;
  background-color: #ddd;
  flex-direction: column;
  width: 18%;
`
export const ButtRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 40px;
`
export const Button = styled.button`
  flex: 1;
  border-radius: 0px;
  box-sizing: border-box;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #cccccc;
  border-right: none;
  border-left: none;
  &: hover{
    background-color: #ddd;
  }
  &: focus{
    outline: none;
  }
`
export const ButtonColor = styled.div`
  height: 40px;
  width: 10px;
  box-sizing: border-box;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #cccccc;
  border-right: none;
  border-left: none;
`
export const SearchBarContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
`
export const SearchField = styled.input`
  flex: 1;
`
export const SearchButton = styled.button`
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 0px;

  &: hover {
    background-color: #27ae60;
  }
  &: focus {
    border: none;
    outline: none;
  }
`
//--------
//CROSSHAIR
//--------
export const CrosshairContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0,0,0,.8);
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`
export const EntryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  height: 20px;
`
export const DotContainer = styled.div`
  height: 10px;
  width: 10px;
  display: flex;
  margin: 0px;
  align-items: center;
  justify-content: center;

`
export const Dot = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 50%;
`
export const DataEntry = styled.p`
  flex: 1;
  padding-left: 5px;
  margin: 0px;
  font-size: 70%;
`
