import React, { Component } from "react";
import axios from "axios";
import { get } from "lodash-es";
import CanvasJSReact from "../../src/assets/canvasjs.react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const chartOptions = {
  animationEnabled: true,
  theme: "light2",
  title: {
    text: "Kaboom Prices"
  },
  axisY: {
    includeZero: false,
    title: "Price"
  }
};

class HistoricalChart extends Component {
  state = { data: null };
  async componentDidMount() {
    try {
      const response = await axios({
        method: "get",
        url: "http://kaboom.rksv.net/api/historical"
      });
      this.setState({ data: get(response, "data") });
    } catch (e) {
      console.error(e);
    }
  }

  getOLHCDataPoints = dataPoint => {
    // console.log({ dataPoint });
    const [timeStamp, ...rest] = dataPoint.split(",");
    return {
      x: new Date(Number(timeStamp)),
      y: rest.slice(0, 4).map(x => Number(x))
    };
  };

  render() {
    if (!this.state.data) return null;
    return (
      <div>
        <CanvasJSChart
          options={{
            ...chartOptions,
            data: [
              {
                type: "ohlc",
                yValueFormatString: "###0.00",
                xValueFormatString: "MMM YYYY",
                dataPoints: this.state.data.map(dataPoint =>
                  this.getOLHCDataPoints(dataPoint)
                )
              }
            ]
          }}
          onRef={ref => (this.chart = ref)}
        />
      </div>
    );
  }
}

HistoricalChart.propTypes = {};

export default HistoricalChart;
