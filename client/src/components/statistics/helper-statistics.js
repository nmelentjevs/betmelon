import moment from 'moment';

const unique = (value, index, self) => {
  return self.indexOf(value) === index;
};

const statCountry = (data, type) => {
  const countries = data.map(bet => {
    return bet.country;
  });

  const count = (array, value) => {
    return array.filter(v => v === value).length;
  };

  const betOnCountryAmount = countries.filter(unique).map(b => {
    return { x: b, y: count(countries, b) };
  });

  if (type === 'data') {
    return betOnCountryAmount;
  } else if (type === 'labels') {
    let sortedCountries = [];
    betOnCountryAmount.map(b => {
      sortedCountries.push(b.x);
      return;
    });
    return sortedCountries;
  }
  return;
};

const statLeague = (data, type) => {
  const leagues = data.map(bet => {
    return bet.league;
  });

  const count = (array, value) => {
    return array.filter(v => v === value).length;
  };

  const betOnLeagueAmount = leagues.filter(unique).map(b => {
    return { x: b, y: count(leagues, b) };
  });

  if (type === 'data') {
    return betOnLeagueAmount;
  } else if (type === 'labels') {
    let sortedLeagues = [];
    betOnLeagueAmount.map(b => {
      sortedLeagues.push(b.x);
      return;
    });
    return sortedLeagues;
  }
  return;
};

const statResult = (data, type) => {
  if (type === 'country') {
    const countries = data.map(bet => {
      return bet.country;
    });

    const results = data.map(bet => {
      return bet.result;
    });

    const count = (array, value, country) => {
      return array.filter(
        v => v.result.match(`${value.split('')[0]}`) && v.country === country
      ).length;
    };

    const betOnCountryAmount = countries.filter(unique).map(b => {
      return {
        x: b,
        y: isNaN(
          count(data, 'Win', b) /
            (count(data, 'Win', b) + count(data, 'Lose', b))
        )
          ? 0
          : count(data, 'Win', b) /
            (count(data, 'Win', b) + count(data, 'Lose', b))
      };
    });
    return betOnCountryAmount;
  } else {
    const leagues = data.map(bet => bet.league);

    const results = data.map(bet => bet.result);

    const count = (array, value, league) => {
      return array.filter(
        v => v.result.match(`^${value.split('')[0]}`) && v.league === league
      ).length;
    };

    const betOnLeagueAmount = leagues.filter(unique).map(b => {
      return {
        x: b,
        y: isNaN(
          count(data, 'Win', b) /
            (count(data, 'Win', b) + count(data, 'Lose', b))
        )
          ? 0
          : count(data, 'Win', b) /
            (count(data, 'Win', b) + count(data, 'Lose', b))
      };
    });

    return betOnLeagueAmount;
  }
};

const statOdds = (data, type) => {
  const results = data.map(bet => bet.result);

  const count = (array, value) => {
    return array.filter(v => v === value).length;
  };

  let odds = {};
  const getOdds = array => {
    results.map(b => {
      odds[b] = [];
    });
    array.map(b => {
      odds[b.result].push(b.odds);
    });
    return odds;
  };

  let winLoseOdds = { Win: [], Lose: [] };

  Object.keys(getOdds(data)).map(b => {
    if (b.match('^W')) {
      getOdds(data)[b].map(a => {
        winLoseOdds['Win'].push(a);
      });
    } else {
      getOdds(data)[b].map(a => {
        winLoseOdds['Lose'].push(a);
      });
    }
  });

  let finalOdds = {
    '1-2': { w: 0, l: 0, p: 0 },
    '2-3': { w: 0, l: 0, p: 0 },
    '3-4': { w: 0, l: 0, p: 0 },
    '4-5': { w: 0, l: 0, p: 0 },
    '5+': { w: 0, l: 0, p: 0 }
  };

  Object.keys(winLoseOdds).map(b => {
    winLoseOdds[b].map(a => {
      if (b === 'Win') {
        if (a <= 2) {
          finalOdds['1-2'].w += 1;
          finalOdds['1-2'].p =
            finalOdds['1-2'].w / (finalOdds['1-2'].l + finalOdds['1-2'].w);
        } else if (a <= 3) {
          finalOdds['2-3'].w += 1;
          finalOdds['2-3'].p =
            finalOdds['2-3'].w / (finalOdds['2-3'].l + finalOdds['2-3'].w);
        } else if (a <= 4) {
          finalOdds['3-4'].w += 1;
          finalOdds['3-4'].p =
            finalOdds['3-4'].w / (finalOdds['3-4'].l + finalOdds['3-4'].w);
        } else if (a <= 5) {
          finalOdds['4-5'].w += 1;
          finalOdds['4-5'].p =
            finalOdds['4-5'].w / (finalOdds['4-5'].l + finalOdds['4-5'].w);
        } else if (a > 5) {
          finalOdds['5+'].w += 1;
          finalOdds['5+'].p =
            finalOdds['5+'].w / (finalOdds['5+'].l + finalOdds['5+'].w);
        }
      } else if (b === 'Lose') {
        if (a <= 2) {
          finalOdds['1-2'].l += 1;
          finalOdds['1-2'].p =
            finalOdds['1-2'].w / (finalOdds['1-2'].l + finalOdds['1-2'].w);
        } else if (a <= 3) {
          finalOdds['2-3'].l += 1;
          finalOdds['2-3'].p =
            finalOdds['2-3'].w / (finalOdds['2-3'].l + finalOdds['2-3'].w);
        } else if (a <= 4) {
          finalOdds['3-4'].l += 1;
          finalOdds['3-4'].p =
            finalOdds['3-4'].w / (finalOdds['3-4'].l + finalOdds['3-4'].w);
        } else if (a <= 5) {
          finalOdds['4-5'].l += 1;
          finalOdds['4-5'].p =
            finalOdds['4-5'].w / (finalOdds['4-5'].l + finalOdds['4-5'].w);
        } else if (a > 5) {
          finalOdds['5+'].l += 1;
          finalOdds['5+'].p =
            finalOdds['5+'].w / (finalOdds['5+'].l + finalOdds['5+'].w);
        }
      }
    });
  });

  const res = Object.keys(finalOdds).map((f, i) => {
    return {
      x: f,
      y: finalOdds[f].p
    };
  });

  return res;
};

const statDates = (data, type) => {
  const newData = data.map(d => {
    return {
      match_date: moment(d.match_date).format('x'),
      profit: d.result.match('^W')
        ? d.bet_amount * d.odds - d.bet_amount
        : d.result.match('^L')
        ? -d.bet_amount
        : 0
    };
  });

  let res = [{ x: 0, y: 0 }];

  newData.map((d, i) => {
    res.push({
      x: parseInt(d.match_date),
      y: d.profit + res[i].y
    });
  });

  const dates = res.map(bet => {
    return bet.x;
  });

  const count = (array, date) => {
    let total = 0;
    array.map(v => {
      if (v.x === date) {
        total += v.y;
      }
    });
    return total;
  };

  const betOnDates = dates.filter(unique).map(b => {
    return { x: b, y: count(res, b) };
  });

  res.forEach((b, i) => {});
  betOnDates.shift();
  const finalRes = betOnDates.sort((a, b) => a.x - b.x);
  console.log(finalRes);
  return finalRes;
};

export { statLeague, statCountry, statResult, statOdds, statDates };
