/* Example in Node.js */
const axios = require('axios');
const readline = require('readline');


async function fetchCryptoData(symbol) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your CoinMarketCap API key
    const apiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`;
  
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'X-CMC_PRO_API_KEY': apiKey,
          'Accept': 'application/json'
        }
      });
  
      return response.data.data[symbol.toUpperCase()];
    } catch (error) {
      console.error('Error fetching crypto data:', error.message);
      return null;
    }
  }


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the symbol of the cryptocurrency: ', async (symbol) => {
  const cryptoData = await fetchCryptoData(symbol);

  if (cryptoData) {
    console.log(`Crypto Info for ${symbol.toUpperCase()}:`);
    console.log('Price:', cryptoData.quote.USD.price);
    console.log('Market Cap:', cryptoData.quote.USD.market_cap);
    console.log('Percent Change (24h):', cryptoData.quote.USD.percent_change_24h);
  } else {
    console.log(`Failed to fetch data for ${symbol.toUpperCase()}.`);
  }

  rl.close();
});



// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// rl.question('what currency info ? ', (symbol) => {
//     symbolDetail(symbol);
// });



// function symbolDetail(symbol) {
//     console.log(json.name)
// }