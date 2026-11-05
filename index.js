import 'dotenv/config';
import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';

// 1. Initialize the Discord Client with required Intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Define your slash commands
const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'hello',
        description: 'Greets the user',
    }
];

// 2. Register Slash Commands globally with Discord's API
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

// 3. Event Listener: When the bot successfully connects
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! Bot is online.`);
});

// 4. Event Listener: Handle Slash Command interactions
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('🏓 Pong!');
    } else if (commandName === 'hello') {
        await interaction.reply(`Hello, ${interaction.user.username}! 👋`);
    }
});

// Log the bot in using the token from the .env file
client.login(process.env.DISCORD_TOKEN);