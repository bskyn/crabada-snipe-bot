const axios = require('axios');

const { buyCrab } = require('./bot');
const { getCrabIds } = require('./utils');

const apiFilter =
  'https://api.crabada.com/public/crabada/selling?limit=20&page=1&from_breed_count=0&to_breed_count=0&from_legend=0&to_legend=6&from_pure=6&to_pure=6&from_price=5e%2B22&to_price=6.2e%2B22&class_ids[]=3&class_ids[]=5&class_ids[]=7&class_ids[]=8&orderBy=price&order=asc';

async function executeAutomation() {
  const response = await axios.get(apiFilter);
  const crabsData = response.data.result.data;

  if (crabsData.length >= 1) {
    const crabIds = getCrabIds(crabsData);
    console.log('crabs: ', crabIds);
    buyCrab(crabIds);
  } else {
    console.log('No crabs found!');
  }
}

// // first run
// executeAutomation();
// // // run bot every 60s
// AsyncPolling(function (end) {
//   executeAutomation();
//   end();
// }, 60000).run();
