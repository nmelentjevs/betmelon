import React from 'react';

import moment from 'moment';

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

// Components
import ProfitChart from './ProfitChart';

const Overall = ({ bets, datesFunction }) => (
  <div>
    {/* <g transform={'translate(0, 350)'}>
      <VictoryChart
        standalone={true}
        width={400}
        height={250}
        domainPadding={25}
      >
        <VictoryAxis
          // tickFormat={['1-2', '2-3', '3-4', '4-5', '5+']}
          tickCount={10}
          tickFormat={t => `${moment(t * 1000000000).format('DD/MM/YYYY')}`}
          style={{
            tickLabels: {
              fontSize: 6,
              fill: 'white',
              padding: 5,
              angle: 315
            }
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={x => `${x}$`}
          style={{
            tickLabels: {
              fontSize: 8,
              fill: 'white',
              padding: 5
            }
          }}
        />
        <VictoryLine
          data={datesFunction(bets)}
          labels={({ datum }) => datum.y}
          style={{
            data: { width: 15 },
            labels: {
              fontSize: 6,
              fill: ({ datum }) => (datum.y >= 0 ? 'green' : '#c43a31')
            }
          }}
        />
      </VictoryChart>
    </g> */}
    <ProfitChart bets={bets} datesFunction={datesFunction} />
  </div>
);

export default Overall;
