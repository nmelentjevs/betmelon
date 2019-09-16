import React from 'react';

import {
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryZoomContainer,
  VictoryBrushContainer,
  VictoryLabel
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
            domain={{
              y: [-30, 30]
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
        <g>
          <svg viewBox="0 0 450 350">
            <VictoryLabel
              x={25}
              y={75}
              text={"Relative peak interest in 'Web developer' \n % over time"}
            />
            <VictoryLabel
              x={425}
              y={75}
              text={'React downloads\n in millions'}
            />
            <g transform={'translate(0, 40)'}>
              {/* Shared independent axis */}
              <VictoryAxis
                scale="time"
                standalone={false}
                tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                tickFormat={date =>
                  date.toLocaleString('en-us', { month: 'short' })
                }
              />
              {/* Dependent axis for data set one. */}
              <VictoryAxis
                dependentAxis
                domain={[0, 110]}
                offsetX={50}
                orientation="left"
                standalone={false}
              />
              {/* Dataset one */}
              <VictoryLine
                data={this.props.datesFunction(this.props.bets)}
                domain={{
                  x: [new Date(2018, 1, 1), new Date(2019, 1, 1)],
                  y: [0, 110]
                }}
                interpolation="monotoneX"
                scale={{ x: 'time', y: 'linear' }}
                standalone={false}
              />
              {/* Dependent axis for data set two. */}
              <VictoryAxis
                dependentAxis
                domain={[0, 15000000]}
                orientation="right"
                standalone={false}
                tickFormat={x => `${x / 1000000}`}
              />
              {/* Dataset two */}
              <VictoryLine
                data={this.props.datesFunction(this.props.bets)}
                domain={{
                  x: [new Date(2018, 1, 1), new Date(2019, 1, 1)],
                  y: [0, 40]
                }}
                interpolation="monotoneX"
                scale={{ x: 'time', y: 'linear' }}
                standalone={false}
              />
            </g>
          </svg>
        </g>
      </div>
    );
  }
}

export default ProfitChart;
