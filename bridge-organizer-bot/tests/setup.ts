// Global test setup
process.env.NODE_ENV = 'test';
process.env.DISCORD_TOKEN = 'test_token';
process.env.DISCORD_CLIENT_ID = 'test_client_id';
process.env.DISCORD_GUILD_ID = 'test_guild_id';

// Increase timeout for Discord API operations
jest.setTimeout(10000);