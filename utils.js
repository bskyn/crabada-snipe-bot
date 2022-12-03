const axios = require('axios');

// used for automation bot
function getCrabIds(list) {
  return list.map((item) => item.id);
}

// used for discord bot
function getCrabsMetaData(list) {
  const crabs = [];
  list.forEach((item) => {
    crabs.push({
      id: item.id,
      price: item.price / 10e17,
      className: item.class_name,
      breedCount: item.breed_count,
      purity: item.pure_number,
    });
  });
  return crabs;
}

// used for discord bot
async function fetchCrabsMetadata() {
  // const testFilter =
  //   'https://api.crabada.com/public/crabada/selling?limit=20&page=1&from_breed_count=0&to_breed_count=0&from_legend=0&to_legend=6&from_pure=6&to_pure=6&from_price=0&to_price=6.916e%2B22&class_ids[]=3&class_ids[]=5&class_ids[]=7&class_ids[]=8&orderBy=price&order=asc';
  const apiFilter =
    'https://api.crabada.com/public/crabada/selling?limit=20&page=1&from_breed_count=0&to_breed_count=0&from_legend=0&to_legend=6&from_pure=6&to_pure=6&from_price=0&to_price=6.8e%2B22&class_ids[]=1&class_ids[]=3&class_ids[]=5&class_ids[]=7&class_ids[]=8&orderBy=price&order=asc';

  try {
    const response = await axios.get(apiFilter);
    const crabsData = response.data.result.data;
    return getCrabsMetaData(crabsData);
  } catch (err) {
    console.log('ERROR IN FETCHING CRAB DATA', JSON.stringify(err, null, 2));
    return [];
  }
}

module.exports = { getCrabIds, fetchCrabsMetadata };
