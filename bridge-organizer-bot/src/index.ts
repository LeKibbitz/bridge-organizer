import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import { config } from './config';
import { setupInteractionHandlers } from './interactions/InteractionHandler';
import { errorHandler } from './utils/ErrorHandler';
import { BotHealthCheck } from './utils/BotHealthCheck';
import { supabaseClient } from './services/SupabaseClient';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

let healthCheck: BotHealthCheck;

client.once('ready', async () => {
    console.log(`✅ Bot is online! Logged in as ${client.user?.tag}`);
    console.log(`Bot ID: ${client.user?.id}`);
    console.log(`Connected to ${client.guilds.cache.size} guild(s)`);

    // Initialize health check
    healthCheck = new BotHealthCheck(client);

    // Perform initial health check
    await healthCheck.performHealthCheck();

    // Log bot startup
    await supabaseClient.logEvent('bot_startup', {
        botId: client.user?.id,
        guilds: client.guilds.cache.size,
        users: client.users.cache.size,
        timestamp: new Date().toISOString()
    });

    // Set up periodic health checks every 5 minutes
    setInterval(async () => {
        const health = await healthCheck.performHealthCheck();
        if (!health.healthy) {
            await supabaseClient.logError(
                'bot_health',
                'UNHEALTHY_STATUS',
                `Bot health check failed: response time ${health.responseTime}ms`,
                'Bot is experiencing connectivity issues',
                health.status,
                'system',
                'high'
            );
        }
    }, 5 * 60 * 1000); // 5 minutes
});

client.on('interactionCreate', async (interaction) => {
    try {
        await setupInteractionHandlers(interaction);
    } catch (error) {
        console.error('Interaction error:', error);
        await errorHandler.handleInteractionError(interaction, error);
    }
});

client.on('error', (error) => {
    console.error('Discord client error:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

client.login(config.discordToken);