import React, { Component } from "react";
import openSocket from "socket.io-client";
const socket = openSocket("http://kaboom.rksv.net", { path: "/watch" });

class LiveHistoricalChart extends Component {
  componentDidMount() {
    socket.on("data", data => {
      console.log("data received", data);
    });
    socket.emit("ping", {});
    socket.emit("sub", { state: true });
  }

  render() {
    return <div />;
  }
}

LiveHistoricalChart.propTypes = {};

export default LiveHistoricalChart;
