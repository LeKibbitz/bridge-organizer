import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

interface Config {
    discordToken: string;
    clientId: string;
    guildId: string;
    supabaseUrl: string;
    supabaseAnonKey: string;
    environment: string;
}

if (!process.env.DISCORD_TOKEN) {
    throw new Error('DISCORD_TOKEN is required');
}

if (!process.env.DISCORD_CLIENT_ID) {
    throw new Error('DISCORD_CLIENT_ID is required');
}

export const config: Config = {
    discordToken: process.env.DISCORD_TOKEN,
    clientId: process.env.DISCORD_CLIENT_ID,
    guildId: process.env.DISCORD_GUILD_ID || '',
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
    environment: process.env.NODE_ENV || 'development',
};