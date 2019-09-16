import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Prediction from './Prediction/Prediction';

import { useTrail, animated as a } from 'react-spring';

import './Predictions.scss';

import GlobalLoading from '../common/GlobalLoading';

// BOOTSTRAP

import Button from 'react-bootstrap/Button';

import AddPrediction from './AddPrediction/AddPrediction';
import FilterButton from '../common/FilterButton';

// PAGINATION
import ReactPaginate from 'react-paginate';

import { UserContext } from '../../userContext';

const Predictions = props => {
  let [predictions, setPredictions] = useState([]);
  let [loading, setLoading] = useState(true);
  let [country, setCountry] = useState('England');
  let [league, setLeague] = useState('Premier League');
  let [anonymous, setAnonymous] = useState(false);
  let [prediction, setPrediction] = useState({});
  let [filteredPredictions] = [];
  let [addWindow, activateWindow] = useState(false);

  let added = false;

  let [filter, setFilter] = useState('');

  const [toggle, set] = useState(true);

  let [pagination, setPagination] = useState({
    offset: 0,
    elements: [],
    perPage: 10,
    currentPage: 0
  });

  useEffect(() => {
    getData(filter);
  }, [filter, filteredPredictions]);

  const getData = async (filterParam = '*') => {
    if (props.match.params.filter && filterParam === '*') {
      filterParam = props.match.params.filter.replace(':', '');
    } else if (filter.length > 0) {
      filterParam = filter;
    } else {
      filterParam = props.match.params.filter.replace(':', '');
    }

    setLoading(true);
    await axios
      .get(`/api/predictions/all/${filterParam}/${added}`)
      .then(res => {
        console.log(res.data);
        pagination.pageCount = Math.ceil(res.data.length / pagination.perPage);
        setElementsForCurrentPage(res.data);
        setLoading(false);
        setPredictions(res.data);
      })
      .catch(err => console.log(err));
  };

  const addPrediction = async user => {
    await axios
      .post('/api/predictions/add', { prediction, user })
      .then(res => {
        added = true;
      })
      .catch(err => console.log(err));
  };

  const leagues = [
    ['Premier League', 'Championship', 'EFL Cup', 'FA Cup'],
    ['Ligue 1', 'Ligue 2', 'Coupe de la Ligue'],
    ['La Liga', 'Segunda Division', 'Copa Del Rey'],
    ['Bundesliga', '2. Bundesliga', 'DFB Pokal'],
    ['Seria A', 'Seria B', 'Coppa Italia'],
    ['Champions League', 'Europa League'],
    ['World Cup', 'Europe Cup', 'Copa America']
  ];

  const countries = [
    'England',
    'France',
    'Spain',
    'Germany',
    'Italy',
    'Europe',
    'National'
  ];

  const displayLeague = country => {
    return countries.map((c, index) => {
      if (c === country) {
        return leagues[index].map(league => (
          <option key={league}>{league}</option>
        ));
      }
    });
  };

  const likePrediction = (post_id, like, username) => {
    axios
      .post('/api/predictions/like', { post_id, like, username })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  const handleSubmit = (e, state) => {
    e.preventDefault();
    let country = document.getElementById('country').value;
    let league = document.getElementById('league').value;
    let odds = document.getElementById('odds').value;
    let amount = document.getElementById('amount').value;
    let text = document.getElementById('text').value;
    let title = document.getElementById('title').value;

    prediction = { country, league, odds, amount, prediction: text, title };

    addPrediction(state.user.username).then(setTimeout(() => getData(), 2500));
  };

  const handleOnChange = event => {
    let { name, value } = event.target;
    setPrediction({ ...prediction, [name]: value, country, league, anonymous });
  };

  const setElementsForCurrentPage = (data, page = 0) => {
    let elementsArray = data.slice(
      page * pagination.perPage,
      page * pagination.perPage + pagination.perPage
    );

    setPagination({
      ...pagination,
      elements: elementsArray
    });

    return elementsArray;
  };

  const handlePageClick = data => {
    const selectedPage = data.selected;
    const newOffset = selectedPage * pagination.perPage;

    setPagination({
      ...pagination,
      currentPage: selectedPage,
      offset: newOffset,
      elements: setElementsForCurrentPage(predictions, selectedPage)
    });
  };

  let paginationElement;
  if (pagination.pageCount > 1) {
    paginationElement = (
      <ReactPaginate
        previousLabel={<i className="far fa-caret-square-left"></i>}
        nextLabel={<i className="far fa-caret-square-right"></i>}
        breakLabel={<span className="gap">...</span>}
        pageCount={pagination.pageCount}
        onPageChange={handlePageClick}
        forcePage={pagination.currentPage}
        containerClassName={'pagination'}
        previousLinkClassName={'previous_page'}
        nextLinkClassName={'next_page'}
        disabledClassName={'disabled'}
        activeClassName={'active'}
      />
    );
  }

  const config = { mass: 5, tension: 2000, friction: 200 };

  const paginationTrail = useTrail(pagination.elements.length, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    height: toggle ? 80 : 0,
    from: { opacity: 0, x: 20, height: 0 }
  });

  return (
    <UserContext.Consumer>
      {({ state }) =>
        loading ? (
          <GlobalLoading fullscreen={true} />
        ) : predictions.length === 0 ? (
          <div className="mt-4 predictions-section">
            <FilterButton
              setFilter={setFilter}
              countries={countries}
              leagues={leagues}
              filter={filter}
            />
            <div>
              No predictions available. Add one?{' '}
              <AddPrediction
                handleSubmit={handleSubmit}
                leagues={leagues}
                setLeague={setLeague}
                handleOnChange={handleOnChange}
                setAnonymous={setAnonymous}
                country={country}
                displayLeague={displayLeague}
                setCountry={setCountry}
                state={state}
              />
            </div>
          </div>
        ) : (
          <div className="mt-4 predictions-section">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row'
              }}
            >
              <FilterButton
                setFilter={setFilter}
                countries={countries}
                leagues={leagues}
                filter={filter}
              />

              <Button
                onClick={() => activateWindow(!addWindow)}
                className="mb-2"
                variant="outline-primary"
              >
                {!addWindow ? 'ADD ' : 'CLOSE '}
              </Button>
            </div>
            {addWindow ? (
              <AddPrediction
                handleSubmit={handleSubmit}
                leagues={leagues}
                setLeague={setLeague}
                handleOnChange={handleOnChange}
                setAnonymous={setAnonymous}
                country={country}
                displayLeague={displayLeague}
                setCountry={setCountry}
                state={state}
              />
            ) : (
              <></>
            )}

            {
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'row'
                }}
              >
                {paginationElement}
              </div>
            }
            {paginationTrail
              .sort((a, b) => a.id - b.id)
              .map(({ x, height, ...rest }, index) => (
                <a.div
                  key={index}
                  className="trails-text"
                  style={{
                    ...rest,
                    transform: x.interpolate(x => `translate3d(0,${x}px,0)`)
                  }}
                >
                  <Prediction
                    style={{ height }}
                    data={pagination.elements[index]}
                    like={likePrediction}
                    state={state}
                  />
                </a.div>
              ))}

            {
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'row'
                }}
              >
                {paginationElement}
              </div>
            }
          </div>
        )
      }
    </UserContext.Consumer>
  );
};

export default Predictions;
