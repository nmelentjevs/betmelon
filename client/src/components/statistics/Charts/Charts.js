import React, { useState } from 'react';

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
  VictoryTooltip,
  VictoryLine
} from 'victory';

import GraphTooltip from './GraphTooltip';

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
    <svg viewBox={`0 0 550 600`}>
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
        <g transform={`translate(190, -100)`}>
          <VictoryBar
            name="bar"
            width={400}
            standalone={false}
            domainPadding={100}
            style={{
              data: { width: 10, fill: 'purple' },
              labels: { fontSize: 8 }
            }}
            data={statFunction(bets, 'data')}
            labels={statFunction(bets, 'labels')}
            labels={({ datum }) => `Bets: ${datum.y}`}
            labelComponent={
              <VictoryLabel
                y={275}
                angle={315}
                style={{ fill: 'white', fontSize: 8 }}
              />
            }
          />
        </g>
        <g transform={'translate(0, -90)'}>
          <VictoryPie
            theme={VictoryTheme.material}
            name="pie"
            width={225}
            standalone={false}
            style={{ labels: { fontSize: 10, padding: 15, fill: 'white' } }}
            data={statFunction(bets, 'data')}
          />
        </g>
        <g transform={'translate(-10, 120)'}>
          <VictoryChart
            polar
            standalone={false}
            theme={VictoryTheme.material}
            startAngle={90}
            endAngle={450}
            width={250}
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
              x={490}
              y={-120}
              title={`${username}'s`}
              centerTitle
              orientation="vertical"
              gutter={10}
              width={100}
              colorScale={['grey', 'purple', 'green']}
              style={{
                border: { stroke: 'white' },
                title: { fontSize: 9, fill: 'white' },
                labels: { fontSize: 8 }
              }}
              data={[
                {
                  name: `${type[0].toUpperCase()}${type.slice(1)}`,
                  labels: { fill: 'white' }
                },
                { name: '# of Bets', labels: { fill: 'white' } },
                { name: 'Win %', labels: { fill: 'white' } }
              ]}
            />
            <VictoryBar
              style={{
                data: { fill: 'green', width: 7 },
                labels: { fontSize: 8, fill: 'white' }
              }}
              width={225}
              name="polar"
              data={resultFunction(bets, type)}
              labels={({ datum }) => `${datum.y.toFixed(2) * 100}%`}
            />
          </VictoryChart>
        </g>
        <g transform={'translate(200, 190)'}>
          <VictoryChart
            domainPadding={15}
            standalone={false}
            width={300}
            maxDomain={{ y: 1, x: 5 }}
            height={225}
            style={{
              labels: { fontSize: 8, fill: 'white' }
            }}
          >
            <VictoryLegend
              x={230}
              y={0}
              width={100}
              title="Win % per odds"
              centerTitle
              orientation="vertical"
              gutter={10}
              style={{
                border: { stroke: 'white' },
                title: { fontSize: 10, fill: 'white' },
                labels: { fontSize: 8, fill: 'white' }
              }}
              data={[
                {
                  name: 'Click bar for more info',
                  symbol: { fill: '#950740', type: 'star' }
                }
              ]}
            />
            <VictoryAxis
              tickValues={[1, 2, 3, 4, 5]}
              tickFormat={['1-2', '2-3', '3-4', '4-5', '5+']}
              style={{
                tickLabels: { fontSize: 8, fill: 'white', padding: 5 }
              }}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={x => `${x * 100}%`}
              style={{
                tickLabels: { fontSize: 8, fill: 'white', padding: 5 }
              }}
            />
            <VictoryBar
              data={oddsFunction(bets)}
              style={{
                data: { width: 15, fill: '#950740' },
                labels: { fontSize: 8, labels: { fill: 'white' } }
              }}
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onClick: evt => {
                      const data = ['1-2', '2-3', '3-4', '4-5', '5+'];
                      var i = 0;
                      while ((evt.target = evt.target.previousSibling) != null)
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
  );
};

export default Charts;
