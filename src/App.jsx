import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./App.css";
import Board from "./components/Board";

class App extends Component{
    render(){
        return(
            <Board />
            // <div className="App">
            //     <h1> Hello, World! </h1>
            // </div>
        );
    }
}

export default hot(module)(App);