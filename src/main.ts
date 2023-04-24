import { Client, GatewayIntentBits, REST, Routes, EmbedBuilder } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';
import { execute, execute as ready } from './listeners/ready';

dotenv.config();




const client = new Client({
    intents: 
    [GatewayIntentBits.Guilds],

});

const commands: any[] = [];
const commandFiles = fs
  .readdirSync('src/commands')
  .filter((file) => file.endsWith('.ts'));

for (const file of commandFiles) {
  const { data } = require(`./commands/${file}`);
  commands.push(data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN!);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID!,
        process.env.GUILD_ID!
      ),
      { body: commands }
    );

    console.log('Successfully registered application commands.');
  } catch (error) {
    console.error(error);
  }
})();

client.once('ready', () => {
  ready(client);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = interaction.commandName;

  try {
    const { execute } = require(`./commands/${command}`);
    await execute(interaction);
  } catch (error) {
    console.error(error);
  }
});


client.login(process.env.TOKEN);