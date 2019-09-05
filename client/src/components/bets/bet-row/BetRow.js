import React, { useEffect, useState } from 'react';

import './BetRow.scss';

import axios from 'axios';

const BetRow = ({ bet, i, sheet_id }) => {
  const [edit, setEdit] = useState(false);
  const [deleteState, setDelete] = useState(false);
  let [currentEdit, setCurrentEdit] = useState([]);
  let [currentDelete, setCurrentDelete] = useState([]);

  useEffect(() => {}, []);

  const getRow = () => {
    const betRow = bet.map((field, i) => (
      <th style={{ textAlign: 'center' }} key={i}>
        {field}
      </th>
    ));
    return betRow;
  };

  const editBet = bet => {
    axios
      .post('/api/bets/:updatebet', { currentEdit, sheet_id, action: 'edit' })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    setEdit(false);
  };

  const deleteBet = bet => {
    console.log('Sending delete request');
    axios
      .post('/api/bets/:updatebet', {
        currentDelete,
        sheet_id,
        action: 'delete'
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    setDelete(false);
  };

  const handleOnChange = event => {
    let { name, value } = event.target;
    console.log(value);
    if (name === 'Date') {
      console.log('ok');
      currentEdit[1] = value;
    } else if (name === 'League') {
      currentEdit[2] = value;
    } else if (name === 'Match') {
      currentEdit[3] = value;
    } else if (name === 'Bet') {
      currentEdit[4] = value;
    } else if (name === 'Bet Type') {
      currentEdit[5] = value;
    } else if (name === 'Odds') {
      currentEdit[6] = value;
    } else if (name === 'Score') {
      currentEdit[7] = value;
    } else if (name === 'Result') {
      currentEdit[8] = value;
    } else if (name === 'Amount') {
      currentEdit[9] = value;
    }
    console.log(currentEdit);
  };

  return edit ? (
    <tr className="editable-table">
      <td style={{ width: '20px' }}>{bet[0]}</td>
      <td>
        <input
          onChange={e => handleOnChange(e)}
          name="Date"
          type="text"
          defaultValue={bet[1]}
        />
      </td>
      <td>
        <input
          onChange={e => handleOnChange(e)}
          name="League"
          type="text"
          defaultValue={bet[2]}
        />
      </td>
      <td>
        <input
          onChange={e => handleOnChange(e)}
          name="Match"
          type="text"
          defaultValue={bet[3]}
        />
      </td>
      <td>
        <input
          onChange={e => handleOnChange(e)}
          name="Bet"
          type="text"
          defaultValue={bet[4]}
        />
      </td>
      <td>
        <input
          onChange={e => handleOnChange(e)}
          name="Bet Type"
          type="text"
          defaultValue={bet[5]}
        />
      </td>
      <td>
        <input
          onChange={e => handleOnChange(e)}
          name="Odds"
          type="text"
          defaultValue={bet[6]}
        />
      </td>
      <td>
        <input
          onChange={e => handleOnChange(e)}
          name="Score"
          type="text"
          defaultValue={bet[7]}
        />
      </td>
      <td>
        <input
          onChange={e => handleOnChange(e)}
          name="Result"
          type="text"
          defaultValue={bet[8]}
        />
      </td>
      <td>
        <input
          onChange={e => handleOnChange(e)}
          name="Amount"
          type="text"
          defaultValue={bet[9]}
        />
      </td>
      <td>
        <input
          onChange={e => handleOnChange(e)}
          name="Profit"
          type="text"
          defaultValue={bet[10]}
          disabled
        />
      </td>
      <td>
        <input
          onChange={e => handleOnChange(e)}
          name="Bankroll"
          type="text"
          defaultValue={bet[11]}
          disabled
        />
      </td>
      <td>
        <input
          onChange={e => handleOnChange(e)}
          name="Deposit"
          type="text"
          defaultValue={bet[12]}
        />
      </td>
      <td>
        <button
          style={{
            width: '100%',
            color: 'white',
            backgroundColor: 'darkgreen',
            border: 'none',
            cursor: 'pointer'
          }}
          onClick={() => editBet(bet)}
        >
          Save
        </button>
      </td>
    </tr>
  ) : (
    <tr key={i}>
      {getRow()}
      <td>
        {' '}
        <button
          style={{
            width: '50%',
            color: 'white',
            backgroundColor: 'goldenrod',
            border: 'none',
            cursor: 'pointer'
          }}
          onClick={() => {
            setEdit(true);
            setCurrentEdit(bet);
          }}
        >
          <i className="fas fa-pencil-alt"></i>
        </button>
        {!deleteState ? (
          <button
            style={{
              width: '50%',
              color: 'white',
              backgroundColor: 'salmon',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => {
              console.log('delete');
              setDelete(true);
              setCurrentDelete(bet);
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        ) : (
          <button
            style={{
              width: '50%',
              color: 'white',
              backgroundColor: 'salmon',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => {
              console.log('confirm delete');
              deleteBet(currentDelete);
            }}
          >
            Sure?
          </button>
        )}
      </td>
    </tr>
  );
};

export default BetRow;
