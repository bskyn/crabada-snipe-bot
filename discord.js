const { Client, Intents, MessageEmbed } = require('discord.js');

const discordSetup = (discordBotToken, discordUserId) => {
  const discordBot = new Client({
    intents: [Intents.FLAGS.GUILD_MESSAGES],
  });
  return new Promise((resolve, reject) => {
    discordBot.login(discordBotToken);
    discordBot.on('ready', async () => {
      const user = await discordBot.users.fetch(discordUserId);
      resolve(user);
    });
  });
};

const createMessage = (message) =>
  new MessageEmbed().addFields(crabadaFields(message));

const crabadaFields = (message) => {
  console.log(message);
  return [
    { name: 'Class', value: `${message.className}` },
    {
      name: 'Breed Count',
      value: `${message.breedCount}`,
    },
    {
      name: 'Purity',
      value: `${message.purity}`,
    },
    {
      name: 'Crab Id',
      value: `${message.id}`,
    },
    {
      name: 'Crabada Market Place',
      value: `[Link](https://marketplace.crabada.com/crabada/${message.id})`,
    },
    {
      name: 'Price',
      value: `${message.price.toFixed(0)} TUS`,
    },
  ];
};

module.exports = { discordSetup, createMessage };
