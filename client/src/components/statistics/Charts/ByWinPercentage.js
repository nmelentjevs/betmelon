import React from 'react';

import {
  VictoryBar,
  VictorySharedEvents,
  VictoryLabel,
  VictoryPie,
  VictoryChart,
  VictoryTheme,
  VictoryPolarAxis
} from 'victory';

import DatePicker from 'react-datepicker'


const ByWinPercentage = ({ statistifyData, bets }) => (
  <div style={{ width: '500px', height: '355px', border: '1px solid black' }}>
    {bets.length > 0 ? (
        <div>
          <VictoryChart polar
            theme={VictoryTheme.material}
            startAngle={90}
            endAngle={450}
            width={300}
            name="polar"
          >
            <VictoryPolarAxis
              tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              labelPlacement="vertical"
              width={300}
            />
            <VictoryBar style={{ data: { fill: "tomato", width: 10 } }}
              width={300}
              data={[
                { x: 0, y: 2 },
                { x: 10, y: 3 },
                { x: 20, y: 5 },
                { x: 30, y: 4 },
                { x: 40, y: 1 },
                { x: 50, y: 6 },
                { x: 60, y: 7 },
                { x: 70, y: 3 },
                { x: 80, y: 2 },
                { x: 90, y: 4 },
                { x: 100, y: 1 }
              ]}
            />
          </VictoryChart>
        </div>
    ) : (
      'Loading'
    )}
  </div>
);

export default ByWinPercentage;
