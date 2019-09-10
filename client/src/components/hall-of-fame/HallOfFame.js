import React, { memo, useState, useEffect } from 'react';

import axios from 'axios';
import { useSpring, a } from 'react-spring';
import { useMeasure, usePrevious } from '../bets/bets-display-helpers/helpers';
import {
  Global,
  Frame,
  Title,
  Content,
  toggle
} from '../bets/bets-display-helpers/styles';
import * as Icons from '../bets/bets-display-helpers/icons';

import Bet from '../bets/bet/Bet';

import moment from 'moment';

const Tree = memo(({ children, name, style, defaultOpen = false }) => {
  const [isOpen, setOpen] = useState(defaultOpen);
  const previous = usePrevious(isOpen);
  const [bind, { height: viewHeight }] = useMeasure();
  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      transform: `translate3d(${isOpen ? 0 : 20}px,0,0)`
    }
  });
  const Icon =
    Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`];
  return (
    <Frame>
      <Icon
        style={{ ...toggle, opacity: children ? 1 : 0.3 }}
        onClick={() => setOpen(!isOpen)}
      />
      <Title style={style}>{name}</Title>
      <Content
        style={{
          opacity,
          height: isOpen && previous === isOpen ? 'auto' : height
        }}
      >
        <a.div style={{ transform }} {...bind} children={children} />
      </Content>
    </Frame>
  );
});

const HallOfFame = ({ username, match, betFromBets }) => {
  const [bets, setBets] = useState([]);

  useEffect(() => {
    refreshBets();
  }, [betFromBets]);

  const refreshBets = () => {
    // const { username } = match.params;
    axios
      .get(`/api/bets/loadbets/${username}`)
      .then(res => {
        console.log(res.data);
        // setLoading(false);
        if (res.data.msg !== 'No entries found') {
          if (res.data.bets.length !== 0) {
            setBets(res.data.bets);
          }
        }
      })
      .catch(err => console.log(err));
  };

  const displayBetsTree = data => {
    let countryObj = {};
    const countries = data.map(bet => {
      countryObj = { ...countryObj, [bet.country]: 0 };
      return bet.country.replace(' ', '');
    });

    const unique = (value, index, self) => {
      return self.indexOf(value) === index;
    };

    const count = (array, value) => {
      return array.filter(v => v === value).length;
    };

    const betOnCountryAmount = countries
      .filter(unique)
      .map(b => {
        return { x: b, y: count(countries, b) };
      })
      .sort((a, b) => a.y - b.y);

    let sortedCountries = [];
    betOnCountryAmount.map(b => {
      sortedCountries.push(b.x);
    });

    console.log(sortedCountries);

    let tree = [];
    data.map(bet => {
      tree = [
        ...tree,
        { [bet.country.replace(' ', '')]: { [bet.league]: { bets: [] } } }
      ];
      return;
    });

    tree.map(tre => {
      data.map(bet => {
        if (bet.country.toString() === Object.keys(tre).toString()) {
          if (Object.keys(tre[bet.country])[0].toString() === bet.league) {
            tre[bet.country][bet.league].bets.push(bet);
          }
        }
      });
    });

    const result = tree.reduce((unique, o) => {
      if (
        !unique.some(
          obj =>
            Object.keys(obj[Object.keys(obj).toString()])[0] ===
            Object.keys(o[Object.keys(o).toString()])[0]
        )
      ) {
        unique.push(o);
      }
      return unique;
    }, []);

    const displayTreeArray = [];
    const test = sortedCountries.map(b => {
      let countryBet = result.filter(a => {
        return b === Object.keys(a).toString();
      });

      displayTreeArray.push(countryBet);
    });

    const display = displayTreeArray.sort((a,b) => {
      console.log(Object.keys(a[Object.keys(a)[0]]))
        if(Object.keys(a[Object.keys(a)[0]]) < Object.keys(b[Object.keys(b)[0]])) {
          return -1;
        } 
        if(Object.keys(a[Object.keys(a)[0]]) > Object.keys(b[Object.keys(b)[0]])){
          return 1
        }
        return 0;
      }).map((tree, i) => {
      return tree.map((t, i) => {
        console.log(Object.keys(t)[0])
        return (
          <Tree name={Object.keys(t)} key={i + Object.keys(t)}>
            {tree.map((t, i) => {
              return (
                <Tree name={Object.keys(t[Object.keys(t)])} key={i}>
                  {t[Object.keys(t)][Object.keys(t[Object.keys(t)])].bets.map(
                    (bet, i) => {
                      return (
                        <Tree
                          name={`${bet.teams} - ${bet.result} - ${moment(
                            bet.date_added
                          ).format('DD/MM/YYYY')}`}
                          key={bet.date_added}
                        >
                          <Bet
                            bet={bet}
                            username={username}
                            bg="dark"
                            text="white"
                            refreshBets={refreshBets}
                          />
                        </Tree>
                      );
                    }
                  )}
                </Tree>
              );
            })}
          </Tree>
        );
      });
    });

    const displayFiltered = display.map(x => x[0]);

    return displayFiltered;
  };

  return (
    <>
      {bets.length > 0 ? (
        <>
          <Global />
          {/* <button onClick={() => displayBetsTree(bets)}>ok</button> */}
          <Tree name="Bets" defaultOpen>
            {displayBetsTree(bets)}
          </Tree>{' '}
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default HallOfFame;
