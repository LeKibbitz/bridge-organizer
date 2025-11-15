"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_1 = require("./config");
const InteractionHandler_1 = require("./interactions/InteractionHandler");
const ErrorHandler_1 = require("./utils/ErrorHandler");
const BotHealthCheck_1 = require("./utils/BotHealthCheck");
const SupabaseClient_1 = require("./services/SupabaseClient");
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ],
});
let healthCheck;
client.once('ready', async () => {
    console.log(`✅ Bot is online! Logged in as ${client.user?.tag}`);
    console.log(`Bot ID: ${client.user?.id}`);
    console.log(`Connected to ${client.guilds.cache.size} guild(s)`);
    // Initialize health check
    healthCheck = new BotHealthCheck_1.BotHealthCheck(client);
    // Perform initial health check
    await healthCheck.performHealthCheck();
    // Log bot startup
    await SupabaseClient_1.supabaseClient.logEvent('bot_startup', {
        botId: client.user?.id,
        guilds: client.guilds.cache.size,
        users: client.users.cache.size,
        timestamp: new Date().toISOString()
    });
    // Set up periodic health checks every 5 minutes
    setInterval(async () => {
        const health = await healthCheck.performHealthCheck();
        if (!health.healthy) {
            await SupabaseClient_1.supabaseClient.logError('bot_health', 'UNHEALTHY_STATUS', `Bot health check failed: response time ${health.responseTime}ms`, 'Bot is experiencing connectivity issues', health.status, 'system', 'high');
        }
    }, 5 * 60 * 1000); // 5 minutes
});
client.on('interactionCreate', async (interaction) => {
    try {
        await (0, InteractionHandler_1.setupInteractionHandlers)(interaction);
    }
    catch (error) {
        console.error('Interaction error:', error);
        await ErrorHandler_1.errorHandler.handleInteractionError(interaction, error);
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
client.login(config_1.config.discordToken);
