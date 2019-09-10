import React from 'react';

import {
  VictoryBar,
  VictorySharedEvents,
  VictoryLabel,
  VictoryPie,
  VictoryChart,
  VictoryTheme
} from 'victory';

const ByCountry = ({ statistifyData, bets }) => (
  <div style={{ width: '425px', height: '355px', border: '1px solid black' }}>
    {bets.length > 0 ? (
      <svg
        viewBox={`0 0 ${400 + statistifyData(bets, 'labels').length * 5} 375`}
        style={{ marginLeft: '20px' }}
      >
        <VictorySharedEvents
          events={[
            {
              childName: ['pie', 'bar'],
              target: 'data',
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    {
                      childName: ['pie', 'bar'],

                      mutation: props => {
                        return {
                          style: Object.assign({}, props.style, {
                            fill: 'tomato'
                          })
                        };
                      }
                    }
                  ];
                },
                onMouseOut: () => {
                  return [
                    {
                      childName: ['pie', 'bar'],
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
          <g transform={'translate(150, 50)'}>
            <VictoryBar
              name="bar"
              width={300}
              standalone={false}
              domainPadding={40}
              style={{
                data: { width: 15 },
                labels: { fontSize: 17 }
              }}
              data={statistifyData(bets, 'data')}
              labels={statistifyData(bets, 'labels')}
              labels={({ datum }) => `Bets: ${datum.y}`}
              labelComponent={<VictoryLabel y={290} angle={315} />}
            />
          </g>
          <g transform={'translate(0, -75)'}>
            <VictoryPie
              name="pie"
              width={250}
              standalone={false}
              style={{ labels: { fontSize: 20, padding: 12 } }}
              data={statistifyData(bets, 'data')}
            />
          </g>
        </VictorySharedEvents>
      </svg>
    ) : (
      'Loading'
    )}
  </div>
);

export default ByCountry;
