const { google } = require('googleapis');

const getBet = 0;
const deleteBets = 0;

exports.getBets = async (authClient, req, res) => {
  let id;
  req.params.id ? (id = req.params.id) : (id = req.body.sheet_id);

  const gsapi = google.sheets({
    version: 'v4',
    auth: authClient
  });

  const opt = {
    spreadsheetId: id,
    range: 'A3:N1000'
  };

  try {
    let data = await gsapi.spreadsheets.values
      .get(opt)
      .catch(err => res.send({ msg: 'No entries found' }));
    let dataArray = data.data.values;
    return dataArray;
  } catch (error) {
    return error;
  }
};

exports.addBet = async (authClient, req) => {
  const values = req.body;
  const { id } = req.params;

  const gsapi = google.sheets({
    version: 'v4',
    auth: authClient
  });

  const opt = {
    spreadsheetId: id,
    range: 'B:B'
  };

  let data = await gsapi.spreadsheets.values.get(opt);

  const index = `A${parseInt(data.data.values.length + 1)}`;

  const addOptions = {
    spreadsheetId: id,
    range: index,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [values]
    }
  };

  return await gsapi.spreadsheets.values.update(addOptions);
};

exports.updateBet = async (authClient, values) => {
  const { currentEdit, currentDelete, sheet_id, action } = values;
  if (action === 'edit') {
    const gsapi = google.sheets({
      version: 'v4',
      auth: authClient
    });

    const index = `A${parseInt(currentEdit[0]) + 3}`;

    const updateOptions = {
      spreadsheetId: sheet_id,
      range: index,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [currentEdit]
      }
    };

    return await gsapi.spreadsheets.values.update(updateOptions);
  } else if (action === 'delete') {
    const gsapi = google.sheets({
      version: 'v4',
      auth: authClient
    });

    const index = `A${parseInt(currentDelete[0]) + 3}`;

    const updateOptions = {
      spreadsheetId: sheet_id,
      range: index,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
      }
    };

    return await gsapi.spreadsheets.values.update(updateOptions);
  }
};
