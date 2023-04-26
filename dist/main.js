"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const ready_1 = require("./listeners/ready");
dotenv_1.default.config();
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds]
});
const commands = [];
const commandFiles = fs_1.default.readdirSync('src/commands').filter((file) => file.endsWith('.ts'));
for (const file of commandFiles) {
    const { data } = require(`./commands/${file}`);
    commands.push(data.toJSON());
}
const rest = new discord_js_1.REST({ version: '10' }).setToken(process.env.TOKEN);
void (async () => {
    try {
        await rest.put(discord_js_1.Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
        console.log('Successfully registered application commands.');
    }
    catch (error) {
        console.error(error);
    }
})();
client.once('ready', () => {
    (0, ready_1.execute)(client);
});
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand())
        return;
    const command = interaction.commandName;
    try {
        const { execute } = require(`./commands/${command}`);
        await execute(interaction);
    }
    catch (error) {
        console.error(error);
    }
});
void client.login(process.env.TOKEN);
//# sourceMappingURL=main.js.map