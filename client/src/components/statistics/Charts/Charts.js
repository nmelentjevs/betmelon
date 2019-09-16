import React, { useState, useEffect } from 'react';

import ReactResizeDetector from 'react-resize-detector';

import {
  VictoryBar,
  VictorySharedEvents,
  VictoryLabel,
  VictoryPie,
  VictoryChart,
  VictoryTheme,
  VictoryPolarAxis,
  VictoryLegend,
  VictoryAxis,
  VictoryTooltip
} from 'victory';

// import GraphTooltip from './GraphTooltip';

const Charts = ({
  type,
  statFunction,
  oddsFunction,
  resultFunction,
  datesFunction,
  bets,
  username
}) => {
  return (
    <ReactResizeDetector
      handleWidth
      handleHeight
      render={({ width, height }) => {
        return (
          <>
            <svg viewBox={`0 0 550 ${width > 700 ? 600 : 1100}`}>
              <VictorySharedEvents
                events={[
                  {
                    childName: ['pie', 'bar', 'polar'],
                    target: 'data',
                    eventHandlers: {
                      onMouseOver: () => {
                        return [
                          {
                            childName: ['pie', 'bar', 'polar'],

                            mutation: props => {
                              return {
                                style: Object.assign({}, props.style, {
                                  fill: 'white'
                                })
                              };
                            }
                          }
                        ];
                      },
                      onMouseOut: () => {
                        return [
                          {
                            childName: ['pie', 'bar', 'polar'],
                            mutation: () => {
                              return null;
                            }
                          }
                        ];
                      }
                    }
                  }
                ]}
              >
                <g
                  transform={`translate(${width > 700 ? 190 : 0}, ${
                    width > 700 ? -105 : 250
                  })`}
                >
                  <VictoryBar
                    name="bar"
                    width={width > 700 ? 450 : 600}
                    standalone={false}
                    domainPadding={100}
                    style={{
                      data: { width: width > 700 ? 10 : 15, fill: 'purple' },
                      labels: { fontSize: width > 700 ? 8 : 12 }
                    }}
                    data={statFunction(bets, 'data')}
                    labels={statFunction(bets, 'labels')}
                    labels={({ datum }) => `${datum.x}: ${datum.y}`}
                    labelComponent={
                      <VictoryLabel
                        y={275}
                        angle={315}
                        style={{
                          fill: 'white',
                          fontSize: width > 700 ? 8 : 12
                        }}
                      />
                    }
                  />
                </g>
                <g
                  transform={`translate(${width > 700 ? 0 : -20}, ${
                    width > 700 ? -70 : 0
                  })`}
                >
                  <VictoryPie
                    theme={VictoryTheme.material}
                    name="pie"
                    width={width > 700 ? 250 : 600}
                    standalone={false}
                    style={{
                      labels: {
                        fontSize: width > 700 ? 10 : 14,
                        padding: 15,
                        fill: 'white'
                      }
                    }}
                    data={statFunction(bets, 'data')}
                  />
                </g>
                <g
                  transform={`translate(${width > 700 ? -10 : -20}, ${
                    width > 700 ? 120 : 750
                  })`}
                >
                  <VictoryChart
                    polar
                    standalone={false}
                    theme={VictoryTheme.material}
                    startAngle={90}
                    endAngle={450}
                    width={width > 700 ? 250 : 600}
                  >
                    <VictoryPolarAxis
                      tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                      labelPlacement="vertical"
                      width={250}
                      tickLabelComponent={
                        <VictoryLabel style={{ fill: 'white', fontSize: 0 }} />
                      }
                    />
                    <VictoryLegend
                      x={width > 700 ? 490 : 470}
                      y={width > 700 ? -110 : -740}
                      title={`${username}'s`}
                      centerTitle
                      orientation="vertical"
                      gutter={10}
                      width={100}
                      colorScale={['grey', 'purple', 'green']}
                      style={{
                        border: { stroke: 'white' },
                        title: { fontSize: 9, fill: 'white' },
                        labels: { fontSize: width > 700 ? 8 : 12 }
                      }}
                      data={[
                        {
                          name: `${type[0].toUpperCase()}${type.slice(1)}`,
                          labels: { fill: 'white' }
                        },
                        { name: '# of Bets', labels: { fill: 'white' } },
                        { name: 'Win %', labels: { fill: 'white' } },
                        {
                          name: 'Odds %',
                          labels: { fill: 'white' },
                          symbol: { fill: '#950740', type: 'star' }
                        }
                      ]}
                    />
                    <VictoryBar
                      style={{
                        data: { fill: 'green', width: 7 },
                        labels: {
                          fontSize: width > 700 ? 8 : 12,
                          fill: 'white'
                        }
                      }}
                      width={225}
                      name="polar"
                      data={resultFunction(bets, type)}
                      labels={({ datum }) => `${datum.y.toFixed(2) * 100}%`}
                    />
                  </VictoryChart>
                </g>
                <g
                  transform={`translate(${width > 700 ? 200 : 25}, ${
                    width > 700 ? 190 : 550
                  })`}
                >
                  <VictoryChart
                    domainPadding={15}
                    standalone={false}
                    width={width > 700 ? 350 : 500}
                    maxDomain={{ y: 1, x: 5 }}
                    height={225}
                    style={{
                      labels: { fontSize: width > 700 ? 8 : 12, fill: 'white' }
                    }}
                  >
                    <VictoryLegend
                      x={width > 700 ? 230 : -20}
                      y={width > 700 ? 0 : -540}
                      width={100}
                      // title="Win % per odds"
                      centerTitle
                      orientation="vertical"
                      gutter={10}
                      style={{
                        border: { stroke: 'white' },
                        title: { fontSize: 10, fill: 'white' },
                        labels: {
                          fontSize: width > 700 ? 8 : 12,
                          fill: 'white'
                        }
                      }}
                      data={[
                        {
                          name: 'Hover any chart for info',
                          symbol: { fill: 'white', type: 'star' }
                        }
                      ]}
                    />
                    <VictoryAxis
                      tickValues={[1, 2, 3, 4, 5]}
                      tickFormat={['1-2', '2-3', '3-4', '4-5', '5+']}
                      style={{
                        tickLabels: {
                          fontSize: width > 700 ? 8 : 12,
                          fill: 'white',
                          padding: width > 700 ? 5 : 10
                        }
                      }}
                    />
                    <VictoryAxis
                      dependentAxis
                      tickFormat={x => `${x * 100}%`}
                      style={{
                        tickLabels: {
                          fontSize: width > 700 ? 8 : 12,
                          fill: 'white',
                          padding: width > 700 ? 5 : 10
                        }
                      }}
                    />
                    <VictoryBar
                      data={oddsFunction(bets)}
                      style={{
                        data: { width: 15, fill: '#950740' },
                        labels: {
                          fontSize: width > 700 ? 8 : 12,
                          labels: { fill: 'white' }
                        }
                      }}
                      events={[
                        {
                          target: 'data',
                          eventHandlers: {
                            onClick: evt => {
                              const data = ['1-2', '2-3', '3-4', '4-5', '5+'];
                              var i = 0;
                              while (
                                (evt.target = evt.target.previousSibling) !=
                                null
                              )
                                i++;
                            }
                          }
                        }
                      ]}
                      // labels={({ datum }) => `${datum.y.toFixed(2) * 100}%`}
                      labels={({ datum }) => `${datum.y.toFixed(2) * 100}%`}
                      labelComponent={
                        <VictoryTooltip
                          style={{
                            fill: 'black',
                            fontSize: 9
                          }}
                        />
                      }
                    />
                  </VictoryChart>
                </g>
              </VictorySharedEvents>
            </svg>
          </>
        );
      }}
    />
  );
};

export default Charts;
