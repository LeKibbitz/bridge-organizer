# Bridge Organizer Discord Bot

A TypeScript Discord bot for organizing bridge club activities with button-based interactions.

## Setup Instructions

### 1. Prerequisites

- Node.js 18 or higher
- Discord Application with Bot Token
- Discord Server with appropriate permissions

### 2. Bot Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to "Bot" section and create a bot
4. Copy the bot token
5. Go to "OAuth2" > "URL Generator"
   - Select "bot" scope
   - Select permissions: "Send Messages", "Use Slash Commands", "Embed Links"
   - Copy the generated URL and invite the bot to your server

### 3. Installation

1. Clone the repository and navigate to the bot directory:
   ```bash
   cd bridge-organizer-bot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment configuration:
   ```bash
   cp .env.example .env
   ```

4. Configure your `.env` file with your Discord bot credentials:
   ```env
   DISCORD_TOKEN=your_bot_token_here
   DISCORD_CLIENT_ID=your_client_id_here
   DISCORD_GUILD_ID=your_guild_id_here

   # Optional: Supabase for logging
   SUPABASE_URL=your_supabase_url_here
   SUPABASE_ANON_KEY=your_supabase_anon_key_here

   NODE_ENV=development
   ```

### 4. Running the Bot

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm run build
npm start
```

## Features

- **Button-based Main Menu**: Register, Help, Profile options
- **Error Handling**: Standardized error responses with retry buttons
- **Response Time Monitoring**: Tracks response times (target: < 5 seconds)
- **Logging**: Optional Supabase integration for error and event logging

## Bot Commands

The bot uses button interactions instead of slash commands for elderly-friendly design:

- **Main Menu**: Shows Register, Help, Profile buttons
- **Help**: Displays help information
- **Register**: Player registration (coming soon)
- **Profile**: Player profile view (coming soon)

## Architecture

```
src/
├── interactions/          # Button and menu handlers
│   ├── InteractionHandler.ts
│   └── MainMenuHandler.ts
├── menus/                 # Button and dropdown definitions
│   └── MainMenu.ts
├── services/              # Supabase and external API clients
│   └── SupabaseClient.ts
├── utils/                 # Error handling, logging
│   └── ErrorHandler.ts
├── config.ts              # Environment configuration
└── index.ts               # Bot entry point
```

## Testing

The bot automatically logs response times and interaction events. All interactions should respond within 5 seconds as per requirements.

To test the bot functionality:

1. Invite the bot to your Discord server
2. Run the bot locally or deploy to your preferred platform
3. In Discord, interact with the bot - it will show a welcome message with menu access
4. Test all button interactions to ensure they work correctly
5. Verify error handling by checking bot logs

## Deployment Requirements

For production deployment, ensure:

- [ ] Discord bot token is securely configured
- [ ] Bot has necessary permissions in target Discord server
- [ ] Environment variables are properly set
- [ ] Bot shows online status
- [ ] All interactions respond within 5 seconds
- [ ] Error handling works with retry buttons

## Monitoring

The bot includes built-in monitoring:

- Response time tracking
- Error logging to console and optionally to Supabase
- Event logging for user interactions
- Connection status monitoring