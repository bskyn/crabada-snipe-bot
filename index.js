const process = require('process');
const AsyncPolling = require('async-polling');

const { discordSetup, createMessage } = require('./discord');

const { DISCORD_BOT_TOKEN, DISCORD_USER_ID } = require('./secrets.json');

const { fetchCrabsMetadata } = require('./utils');

const cache = {};

async function discordBot() {
  const discord = await discordSetup(DISCORD_BOT_TOKEN, DISCORD_USER_ID);

  AsyncPolling(async function (end) {
    const data = await fetchCrabsMetadata();

    if (data.length >= 1) {
      for (const crab of data) {
        if (!cache[crab.id]) {
          console.log('Crabs found sending to discord!');
          let message = createMessage(crab);
          discord.send({ embeds: [message] });
          cache[crab.id] = true;
          console.log('caching the crab id', crab.id);
        } else {
          console.log(`Crab ${crab.id} cached no need to send`);
        }
      }
    } else {
      console.log('No crabs found!');
    }
    end();
  }, 60000).run();
}

discordBot();

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
  // Send some notification about the error
  process.exit(1);
});
