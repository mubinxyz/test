const axios = require('axios');
const { read } = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let response = null;
new Promise(async (resolve, reject) => {
  try {
    response = await axios.get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=5000', {
      headers: {
        'X-CMC_PRO_API_KEY': 'd0042afc-a2eb-44fc-8bea-a8953120ff30',
      },
    });
  } catch(ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success

    const cur = await new Promise(resolve => {
        rl.question("Enter a currency: ", resolve);
    }).toUpperCase();
    const json = response.data;
    console.log(json.data[cur]);
    resolve(json);
  }
});