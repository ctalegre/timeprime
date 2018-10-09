import React, { Component } from "react";

class Chrono extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTS: null,
      diff: null,
      suspended: 0,
      interval: null
    };
  }
  getInitialState() {
    return {
      startTS: null,
      diff: null,
      suspended: 0,
      interval: null
    };
  }
  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
  }
  onKeyDown = evt => {
    evt.preventDefault();
    // start|stop on [space]
    evt.keyCode === 32 && this[!this.state.startTS ? "start" : "stop"]();
    // reset on [escape]
    evt.keyCode === 27 && this.reset();
  };
  start = () => {
    if (this.state.startTS) {
      // prevent multi clicks on start
      return;
    }
    this.setState({
      startTS: +new Date() - this.state.suspended,
      interval: requestAnimationFrame(this.tick),
      suspended: 0
    });
  };

  stop = () => {
    cancelAnimationFrame(this.state.interval);
    this.setState({
      startTS: null,
      suspended: +this.state.diff
    });
  };

  reset = () => {
    cancelAnimationFrame(this.state.interval);
    this.setState(this.getInitialState());
  };

  tick = () => {
    this.setState({
      diff: new Date(+new Date() - this.state.startTS),
      interval: requestAnimationFrame(this.tick)
    });
  };

  addZero = n => {
    return n < 10 ? "0" + n : n;
  };

  render() {
    var diff = this.state.diff;
    var hundredths = diff
      ? Math.round(this.state.diff.getMilliseconds() / 10)
      : 0;
    var seconds = diff ? this.state.diff.getSeconds() : 0;
    var minutes = diff ? this.state.diff.getMinutes() : 0;

    if (hundredths === 100) hundredths = 0;

    return (
      <div className="Chrono">
        <h1>
          {this.addZero(minutes)}:{this.addZero(seconds)}:
          {this.addZero(hundredths)}
        </h1>
        <div className="buttons">
          <button onClick={this.start}>START</button>
          <button onClick={this.stop}>STOP</button>
          <button onClick={this.reset}>RESET</button>
        </div>
      </div>
    );
  }
}
export default Chrono;
