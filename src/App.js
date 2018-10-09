import React, { Component } from "react";
import Chrono from "./Chrono.js";
import "./Chrono.css";

class App extends Component {
  constructor(props) {
    super(props);
  }

  // newChrono = (name) => {
  //   return new t();
  // }
  render() {
    return (
      <div className="flexed">
        <Chrono />
      </div>
    );
  }
}

export default App;
