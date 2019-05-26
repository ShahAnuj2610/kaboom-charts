import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HistoricalChart from "./components/HistoricalChart";
import LiveHistoricalChart from "./components/LiveHistoricalChart";

function App() {
  return (
    <div className="App">
      <HistoricalChart />
      <LiveHistoricalChart />
    </div>
  );
}

export default App;
