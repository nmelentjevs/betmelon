const colors = [
  '#715aff',
  '#f69dc5',
  '#f9a951',
  '#8c1a6a',
  '#e84855',
  '#4e937a',
  '#d8cc34'
];

const countries = [
  'England',
  'Italy',
  'Germany',
  'France',
  'Spain',
  'Europe',
  'National'
];

const getColor = teamCountry => {
  let color;
  countries.map((country, i) => {
    if (teamCountry === country) {
      color = colors[i];
    }
    return;
  });
  return color;
};

export { colors, countries, getColor };
