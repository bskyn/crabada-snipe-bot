const puppeteer = require('puppeteer');
const dappeteer = require('@chainsafe/dappeteer');

const { MM_PASSWORD, MM_SEED } = require('./secrets.json');

const url = 'https://marketplace.crabada.com/crabada';

// AVAX
async function buyCrab(crabIds) {
  const firstId = crabIds[0];

  const browser = await dappeteer.launch(puppeteer, {
    metamaskVersion: 'v10.8.1',
    defaultViewport: { width: 1920, height: 1080 },
    headless: false, // limitation of puppeteer, chrome can't be used in headless mode
  });

  console.log('Loading metamask...');
  const metamask = await dappeteer.setupMetamask(browser, {
    seed: MM_SEED,
    password: MM_PASSWORD,
    showTestNets: true,
    hideSeed: true,
  });

  await metamask.addNetwork({
    networkName: 'Avax',
    rpc: 'https://api.avax.network/ext/bc/C/rpc',
    chainId: 43114,
    symbol: 'AVAX',
    explorer: 'https://snowtrace.io/',
  });

  // switch to avax network
  await metamask.switchNetwork('Avax');

  // Open crabada marketplace
  const page = await browser.newPage();
  await page.goto(`${url}/${firstId}`);

  // switch to mm page
  await metamask.page.bringToFront();
  await metamask.page.reload();

  // confirm step 1
  await metamask.page.waitForSelector('.btn-primary');
  await metamask.page.click('.btn-primary');

  // confirm step 2
  await metamask.page.waitForSelector('.btn-primary');
  await metamask.page.click('.btn-primary');

  // switch to crabada and login
  await page.bringToFront();
  await page.waitForSelector('.btn-wrap');
  await page.click('.btn-wrap');

  // switch to mm page and sign
  await metamask.page.bringToFront();
  await metamask.page.waitForSelector('.btn-primary');
  await metamask.page.click('.btn-primary');

  // switch to crabada and buy
  await page.bringToFront();
  await page.waitForSelector('.rounded-16 > button');
  await page.click('.rounded-16 > button');

  // switch to mm page and confirm transaction
  await metamask.page.bringToFront();
  await metamask.page.reload();
  await metamask.page.waitForSelector('.btn-primary');
  await metamask.page.click('.btn-primary');

  // Direct Puppeteer to close the browser as we're done with it.
  console.log('Exiting...');
  await browser.close();
}

module.exports = { buyCrab };
