import React from 'react';

import {
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryZoomContainer,
  VictoryBrushContainer
} from 'victory';
import moment from 'moment';

class ProfitChart extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleZoom(domain) {
    this.setState({ selectedDomain: domain });
  }

  handleBrush(domain) {
    this.setState({ zoomDomain: domain });
  }

  render() {
    return (
      <div>
        <VictoryChart
          width={600}
          height={350}
          scale={{ x: 'time' }}
          containerComponent={
            <VictoryZoomContainer
              responsive={false}
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          <VictoryAxis
            // tickFormat={['1-2', '2-3', '3-4', '4-5', '5+']}
            tickCount={10}
            tickFormat={t => `${moment(t).format('MMMM')}`}
            style={{
              tickLabels: {
                fontSize: 14,
                fill: 'white',
                padding: 10,
                angle: 335
              }
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={x => `${x}$`}
            style={{
              tickLabels: {
                fontSize: 11,
                fill: 'white',
                padding: 5
              }
            }}
          />
          <VictoryLine
            style={{
              data: { stroke: 'tomato' }
            }}
            data={this.props.datesFunction(this.props.bets)}
          />
        </VictoryChart>

        <VictoryChart
          padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
          width={600}
          height={90}
          scale={{ x: 'time' }}
          containerComponent={
            <VictoryBrushContainer
              responsive={false}
              brushDimension="x"
              brushDomain={this.state.selectedDomain}
              onBrushDomainChange={this.handleBrush.bind(this)}
            />
          }
        >
          <VictoryAxis
            tickValues={[
              new Date(2017, 6, 1),
              new Date(2018, 1, 1),
              new Date(2018, 6, 1),
              new Date(2019, 1, 1),
              new Date(2019, 6, 1),
              new Date(2020, 1, 1)
            ]}
            tickFormat={x => moment(x).format('DD/MM/YYYY')}
            style={{
              tickLabels: {
                fontSize: 10,
                fill: 'white',
                padding: 5
              }
            }}
          />
          <VictoryLine
            style={{
              data: { stroke: 'tomato' },
              tickLabels: { fill: 'white' }
            }}
            data={this.props.datesFunction(this.props.bets)}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default ProfitChart;
