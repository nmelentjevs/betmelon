import React from 'react';

import moment from 'moment';

import {
  VictoryBar,
  VictorySharedEvents,
  VictoryStack,
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryPolarAxis
} from 'victory';

const mockData = [
  {
    bet: '2',
    bet_amount: 10,
    bet_type: 'undefined',
    comments: 'A',
    country: 'Spain',
    date_added: '2019-10-11T17:09:26.038Z',
    id: 70,
    imaginary: true,
    is_prediction: false,
    league: 'La Liga',
    match_date: '2019-11-10T00:00:00.000Z',
    odds: 1.5,
    result: 'Win',
    score: '1-1',
    teams: 'Barcelona vs Real Madrid',
    username: 'syune123'
  },
  {
    bet: '2',
    bet_amount: 5,
    bet_type: 'undefined',
    comments: 'A',
    country: 'Spain',
    date_added: '2019-09-12T17:09:47.584Z',
    id: 71,
    imaginary: true,
    is_prediction: false,
    league: 'Segunda',
    match_date: '2019-01-09T00:00:00.000Z',
    odds: 2,
    result: 'Lose',
    score: '2-3',
    teams: 'Osasuna vs Getafe',
    username: 'syune123'
  },
  {
    bet: '2',
    bet_amount: 10,
    bet_type: 'undefined',
    comments: 'A',
    country: 'Spain',
    date_added: '2019-09-13T17:10:01.819Z',
    id: 73,
    imaginary: true,
    is_prediction: false,
    league: 'La Liga',
    match_date: '2019-01-09T00:00:00.000Z',
    odds: 4,
    result: 'Win',
    score: '0-0',
    teams: 'Atletico vs Real Sociedad',
    username: 'syune123'
  },
  {
    bet: '2',
    bet_amount: 10,
    bet_type: 'undefined',
    comments: 'A',
    country: 'France',
    date_added: '2019-09-14T17:10:01.819Z',
    id: 73,
    imaginary: true,
    is_prediction: false,
    league: 'Ligue 1',
    match_date: '2019-01-09T00:00:00.000Z',
    odds: 4,
    result: 'Win',
    score: '2-1',
    teams: 'Bordeaux vs Metz',
    username: 'syune123'
  },
  {
    bet: '2',
    bet_amount: 10,
    bet_type: 'undefined',
    comments: 'A',
    country: 'France',
    date_added: '2019-09-20T17:10:01.819Z',
    id: 73,
    imaginary: true,
    is_prediction: false,
    league: 'Ligue 1',
    match_date: '2019-01-09T00:00:00.000Z',
    odds: 4,
    result: 'Win',
    score: '2-1',
    teams: 'PSG vs Lille',
    username: 'syune123'
  },
  {
    bet: '2',
    bet_amount: 10,
    bet_type: 'undefined',
    comments: 'A',
    country: 'France',
    date_added: '2019-09-21T17:10:01.819Z',
    id: 73,
    imaginary: true,
    is_prediction: false,
    league: 'Ligue 1',
    match_date: '2019-01-09T00:00:00.000Z',
    odds: 4,
    result: 'Win',
    score: '2-1',
    teams: 'Monaco vs Marseille',
    username: 'syune123'
  },
  {
    bet: '2',
    bet_amount: 10,
    bet_type: 'undefined',
    comments: 'A',
    country: 'England',
    date_added: '2019-09-15T17:10:01.819Z',
    id: 73,
    imaginary: true,
    is_prediction: false,
    league: 'Premier League',
    match_date: '2019-01-09T00:00:00.000Z',
    odds: 4,
    result: 'Win',
    score: '1-2',
    teams: 'Manchester City vs Manchester United',
    username: 'syune123'
  },
  {
    bet: '2',
    bet_amount: 10,
    bet_type: 'undefined',
    comments: 'A',
    country: 'England',
    date_added: '2019-09-22T17:10:01.819Z',
    id: 73,
    imaginary: true,
    is_prediction: false,
    league: 'Premier League',
    match_date: '2019-01-09T00:00:00.000Z',
    odds: 4,
    result: 'Win',
    score: '1-2',
    teams: 'Manchester City vs Manchester United',
    username: 'syune123'
  },
  {
    bet: '2',
    bet_amount: 10,
    bet_type: 'undefined',
    comments: 'A',
    country: 'England',
    date_added: '2019-10-16T17:10:01.819Z',
    id: 73,
    imaginary: true,
    is_prediction: false,
    league: 'Premier League',
    match_date: '2019-01-09T00:00:00.000Z',
    odds: 4,
    result: 'Win',
    score: '1-1',
    teams: 'Arsenal vs Chelsea',
    username: 'syune123'
  },
  {
    bet: '2',
    bet_amount: 10,
    bet_type: 'undefined',
    comments: 'A',
    country: 'Germany',
    date_added: '2019-09-17T17:10:01.819Z',
    id: 73,
    imaginary: true,
    is_prediction: false,
    league: 'Bundesliga',
    match_date: '2019-01-09T00:00:00.000Z',
    odds: 4,
    result: 'Win',
    score: '1-1',
    teams: 'Bayern vs Dortmund',
    username: 'syune123'
  },
  {
    bet: '2',
    bet_amount: 10,
    bet_type: 'undefined',
    comments: 'A',
    country: 'Germany',
    date_added: '2019-09-18T17:10:01.819Z',
    id: 73,
    imaginary: true,
    is_prediction: false,
    league: 'Bundesliga',
    match_date: '2019-01-09T00:00:00.000Z',
    odds: 4,
    result: 'Win',
    score: '1-1',
    teams: 'Wolfsburg vs Dortmund',
    username: 'syune123'
  },
  {
    bet: '2',
    bet_amount: 10,
    bet_type: 'undefined',
    comments: 'A',
    country: 'Italy',
    date_added: '2019-09-18T17:10:01.819Z',
    id: 73,
    imaginary: true,
    is_prediction: false,
    league: 'Seria A',
    match_date: '2019-01-09T00:00:00.000Z',
    odds: 4,
    result: 'Win',
    score: '1-1',
    teams: 'Juventus vs Napoli',
    username: 'syune123'
  },
  {
    bet: '2',
    bet_amount: 10,
    bet_type: 'undefined',
    comments: 'A',
    country: 'France',
    date_added: '2019-09-19T17:10:01.819Z',
    id: 73,
    imaginary: true,
    is_prediction: false,
    league: 'Ligue 1',
    match_date: '2019-01-09T00:00:00.000Z',
    odds: 4,
    result: 'Win',
    score: '1-1',
    teams: 'Lille vs Nantes',
    username: 'syune123'
  }
];

const smallPrediction = {
  amount: '10',
  author: 'syune123',
  country: 'Spain',
  disliked: 0,
  disliked_by: [],
  edited_on: null,
  id: 2147,
  league: 'La Liga',
  liked: 0,
  liked_by: [],
  odds: '3',
  text: 'I think Barcelona will win',
  title: 'Miracle happening on Camp Nou',
  username: 'melon',
  wrote_on: '2019-09-16'
};

const SampleGraph = ({ bets, statFunction }) => (
  <svg viewBox={`0 0 250 250`}>
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
      <g transform={`translate(0, 0)`}>
        <VictoryChart
          standalone={false}
          polar
          domain={{ x: [0, 5] }}
          height={250}
          width={250}
          style={{ data: { fill: 'white' } }}
          theme={VictoryTheme.material}
        >
          <VictoryPolarAxis
            dependentAxis
            style={{
              axis: { stroke: 'none' },
              tickLabels: { fill: 'none' },
              grid: { stroke: 'grey', strokeDasharray: '4, 8' },
              data: { fill: 'white' }
            }}
          />
          <VictoryPolarAxis tickValues={[0, 2, 4, 6, 8]} />
          <VictoryStack
            colorScale={['#ad1b11', '#c43a31', '#dc7a6b']}
            style={{ data: { width: 40 } }}
          >
            <VictoryBar data={statFunction(bets, 'data')} />
            <VictoryBar data={statFunction(bets, 'data')} />
            <VictoryBar data={statFunction(bets, 'data')} />
          </VictoryStack>
        </VictoryChart>
      </g>
    </VictorySharedEvents>
  </svg>
);

const SampleProfit = () => {
  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine
        style={{
          data: { stroke: '#c43a31' },
          parent: { border: '1px solid #ccc' }
        }}
        data={[
          { x: moment(1536992000000).format('DD MMM'), y: 100 },
          { x: moment(1566993000000).format('DD MMM'), y: 230 },
          { x: moment(155994000000).format('DD MMM'), y: 500 },
          { x: moment(1549995000000).format('DD MMM'), y: 400 },
          { x: moment(1547996000000).format('DD MMM'), y: 770 }
        ]}
      />
    </VictoryChart>
  );
};

const mockUsers = [
  {
    username: 'syune123',
    win_ratio: 0.9
  },
  {
    username: 'king111',
    win_ratio: 0.77
  },
  {
    username: 'ant3il',
    win_ratio: 0.69
  },
  {
    username: 'melnew',
    win_ratio: 0.66
  },
  {
    username: 'olhamom',
    win_ratio: 0.6
  }
];

export { mockData, SampleGraph, SampleProfit, smallPrediction, mockUsers };
