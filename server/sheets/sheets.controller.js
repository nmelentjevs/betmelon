const { google } = require('googleapis');

const authController = require('../users/users.controller');

exports.client = new google.auth.JWT(
  process.env.CLIENT_EMAIL,
  null,
  JSON.parse(`"${process.env.PRIVATE_KEY}"`),
  ['https://www.googleapis.com/auth/spreadsheets']
);

exports.authorize = () => [
  client.authorize((err, tokens) => {
    if (err) {
      console.log(err);
      return;
    } else {
      // console.log('Connected!');
      gsrun(client);
    }
  })
];

exports.gsrun = async authClient => {
  const gsapi = google.sheets({
    version: 'v4',
    auth: authClient
  });

  let newDataArray = dataArray.map(match => {
    match[8] = 0;
    return match;
  });

  const updateOptions = {
    spreadsheetId: '1zTv0rbsl-Bt3KdAG70uB4jMnTbioghhrfDZ-7Z-TZSA',
    range: 'A26',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: newDataArray
    }
  };

  // let res = await gsapi.spreadsheets.values.update(updateOptions);
};

exports.createNewSheet = async (authClient, req) => {
  const gsapi = google.sheets({
    version: 'v4',
    auth: authClient
  });

  // CREATE SHEET

  const sheetOptions = {
    resource: {
      properties: {
        title: `Betsheets by ${req.body.username}`
      }
    }
  };

  let data = await gsapi.spreadsheets.create(sheetOptions);

  const id = data.data.spreadsheetId;

  console.log(data.data.spreadsheetId);

  authController.addSheetId(req.body.username, id);

  // POPULATE WITH SAMPLE VALUES

  const addOptions = {
    spreadsheetId: id,
    range: 'A3',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [
        [
          0,
          '10.10.10',
          'qweqweeqw',
          'qwejeqw vs qweqweqw',
          '2',
          'AHAH',
          '6,9',
          '8-8',
          'Win',
          '100',
          '*',
          '*',
          '*'
        ]
      ]
    }
  };

  await gsapi.spreadsheets.values.update(addOptions);

  return data.data.spreadsheetId;
};

exports.givePermissions = async (authClient, req, id) => {
  const { fileId, value, type, role } = req.body;

  const drive = google.drive({
    version: 'v3',
    auth: authClient
  });

  const body = {
    value,
    type,
    role
  };

  // const request = drive.permissions.insert({
  //   fileId: id,
  //   resource: body
  // });

  // request.execute(res => console.log(res));
};
