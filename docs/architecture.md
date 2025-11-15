# Decision Architecture

## Executive Summary

The bridge-organizer architecture uses a hybrid microservices approach combining Discord.js bot interfaces, n8n workflow automation, and Supabase database services. This design prioritizes elderly-friendly user interactions through button-based Discord menus while maintaining robust backend automation for partner matching and tournament registration. The architecture emphasizes AI agent consistency through standardized patterns, comprehensive error handling, and the novel Discord State Bridge pattern for real-time workflow status updates.

## Project Initialization

First implementation story should execute:
```bash
# Discord Bot Component
npm create discord.js@latest bridge-organizer-bot --typescript
cd bridge-organizer-bot
npm install discord.js@14.24.2 @types/node

# n8n Workflow Component
npx n8n@1.119.1 setup
```

This establishes the base architecture with these decisions:
- **Language**: TypeScript for Discord bot, JavaScript for n8n workflows
- **Bot Framework**: Discord.js v14.24.2 with TypeScript template structure
- **Workflow Engine**: n8n v1.119.1 with native webhook triggers
- **Database**: PostgreSQL 18 for data persistence
- **Communication**: Webhook-based integration between components

## Decision Summary

| Category | Decision | Version | Affects Epics | Rationale |
| -------- | -------- | ------- | ------------- | --------- |
| Database Platform | Supabase (PostgreSQL-based) | PostgreSQL 18 | All epics | Real-time subscriptions, built-in auth, JSON support |
| Database Schema | Hybrid relational + JSONB columns | N/A | Epic 0, 1, 2 | Structured relationships + flexible preferences |
| Discord Framework | Discord.js with TypeScript | v14.24.2 | Epic 0, 1, 2 | Mature framework with full TypeScript support |
| Workflow Engine | n8n automation platform | v1.119.1 | Epic 1, 2 | Visual workflows, extensive integrations |
| Authentication | Bot-as-proxy pattern | N/A | All epics | Centralized auth complexity |
| Workflow Pattern | Microworkflow architecture | N/A | Epic 1, 2 | Independent scaling, clear responsibilities |
| FFB Integration | Airtop browser automation | Latest | Epic 2 | No API dependency, handles complex forms |
| Data Flow | Webhook chains | N/A | All epics | Simple request/response, good error handling |
| User Interface | Button-first interactions | N/A | Epic 0, 1, 2 | Elderly-friendly, zero typing required |

## Project Structure

```
bridge-organizer/
├── discord-bot/                    # Discord.js TypeScript bot
│   ├── src/
│   │   ├── commands/              # Discord slash commands (admin only)
│   │   ├── interactions/          # Button and menu handlers
│   │   ├── menus/                 # Button and dropdown definitions
│   │   ├── handlers/              # Event and interaction handlers
│   │   ├── services/              # Supabase and n8n webhook clients
│   │   └── utils/                 # Error handling, logging
│   ├── package.json
│   └── tsconfig.json
├── n8n-workflows/                 # Exported n8n workflow JSON files
│   ├── partner-request-processor.json
│   ├── match-generator.json
│   ├── notification-sender.json
│   ├── registration-processor.json
│   ├── team-formation.json
│   └── status-updater.json
├── supabase/                      # Database schema and functions
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_error_logging.sql
│   │   └── 003_state_bridge.sql
│   ├── functions/                 # Edge functions for complex logic
│   │   ├── match-scoring.sql
│   │   └── preference-validation.sql
│   └── seed.sql
├── docs/                          # Architecture and API documentation
│   ├── PRD.md
│   ├── epics.md
│   ├── architecture.md
│   └── api-contracts.md
└── deployment/                    # Docker configs, environment files
    ├── docker-compose.yml
    └── .env.example
```

## Epic to Architecture Mapping

| Epic | Architecture Components | Database Tables | n8n Workflows |
|------|------------------------|-----------------|---------------|
| **Epic 0: Onboarding** | Discord bot interactions → Supabase player profiles → Airtop FFB verification | `players`, `ffb_licenses`, `system_logs` | `player-onboarding`, `ffb-verification` |
| **Epic 1: Partner Matching** | Button triggers → n8n microworkflows → Discord State Bridge | `match_requests`, `partnerships`, `active_sessions` | `partner-request-processor`, `match-generator`, `notification-sender` |
| **Epic 2: Registration** | Confirmed partnerships → Airtop FFB automation → Status updates | `tournament_registrations`, `teams`, `ffb_submissions` | `registration-processor`, `team-formation`, `status-updater` |

## Technology Stack Details

### Core Technologies

**Discord Bot Layer:**
- **Discord.js v14.24.2**: Modern Discord API wrapper with TypeScript support
- **Node.js 18+**: Runtime environment with latest features
- **TypeScript**: Type safety and better developer experience

**Workflow Automation Layer:**
- **n8n v1.119.1**: Visual workflow automation with 400+ integrations
- **Airtop**: Browser automation for FFB integration with session persistence
- **Webhook triggers**: HTTP-based workflow initiation and coordination

**Database Layer:**
- **Supabase**: PostgreSQL-based platform with real-time capabilities
- **PostgreSQL 18**: Latest stable version with enhanced JSON support
- **pg_jsonschema**: Extension for JSON validation in JSONB columns

### Integration Points

**Discord Bot ↔ n8n:**
- HTTP POST webhooks to n8n workflow triggers
- Standardized JSON payload format
- Asynchronous processing with Discord State Bridge notifications

**n8n ↔ Supabase:**
- Direct database operations via Supabase node
- Real-time subscriptions for status changes
- Edge functions for complex business logic

**n8n ↔ FFB System:**
- Airtop browser automation for form submission
- Session-based authentication handling
- Error resilience for web interface changes

## Novel Pattern Designs

### Discord State Bridge Pattern

**Purpose**: Maintain user context and provide real-time status updates for long-running n8n workflows

**Problem Solved**: Discord interactions are ephemeral while bridge partner matching can take hours. Users need progress updates without losing context.

**Components:**
1. **Discord Session Store** (Supabase `active_sessions` table)
2. **Workflow Progress Webhook** (n8n → Discord status updates)
3. **Status Update Service** (monitors and pushes notifications)

**Data Flow:**
1. User clicks "Find Partner" → Discord bot saves session with `user_id`, `workflow_type`, `status`
2. n8n workflow starts → Updates session status via webhook
3. Status service detects changes → Sends Discord notification with progress
4. Workflow completes → Final notification + session cleanup

**Implementation for AI Agents:**
```typescript
// Discord bot stores session
await supabase.from('active_sessions').insert({
  user_id: interaction.user.id,
  workflow_type: 'partner-matching',
  status: 'searching',
  started_at: new Date()
});

// n8n workflow reports progress
POST /webhook/status-update
{
  "sessionId": "uuid",
  "status": "found-matches",
  "progress": 75,
  "message": "Found 3 potential partners"
}
```

**Affects Epics**: Epic 1 (Partner Matching), Epic 2 (Registration)

## Implementation Patterns

These patterns ensure consistent implementation across all AI agents:

### Naming Conventions

**Database (Supabase):**
- Table names: `snake_case` plural (`players`, `tournaments`, `active_sessions`)
- Column names: `snake_case` (`user_id`, `created_at`, `tournament_date`)
- Foreign keys: `table_singular_id` format (`player_id`, `tournament_id`)

**Discord Bot (TypeScript):**
- Files: `PascalCase.ts` (`PartnerMatcher.ts`, `EventHandler.ts`)
- Functions: `camelCase` (`findPartner()`, `sendNotification()`)
- Button IDs: `kebab-case` (`find-partner`, `register-team`, `view-profile`)

**n8n Workflows:**
- Workflow names: `kebab-case` (`partner-request-processor`, `match-generator`)
- Node labels: Human-readable (`Find Compatible Partners`, `Send Discord Notification`)
- Variables: `camelCase` in expressions (`playerData`, `matchResults`)

### Code Organization

**Discord Bot Structure:**
- `/commands/` - Admin slash commands only
- `/interactions/` - Button and menu interaction handlers
- `/menus/` - Button and dropdown menu definitions
- `/services/` - External service clients (Supabase, n8n)
- All webhook calls through `/services/n8nClient.ts`

**n8n Workflow Structure:**
- Start with Webhook trigger node
- Include error handling node after major operations
- End with Discord State Bridge status update
- Use Set nodes for transformations, avoid inline expressions

### Error Handling

**Standardized Error Format:**
```json
{
  "success": boolean,
  "error": {
    "code": "MATCH_TIMEOUT",
    "message": "Technical error details",
    "userMessage": "No partners found right now. Try again later! 🔄"
  }
}
```

**Error Logging to Supabase:**
- All components log to `system_errors` table
- Include: `timestamp`, `component`, `error_code`, `technical_message`, `user_message`, `context`, `user_id`, `severity`

**Discord Error Display:**
- Success: Green embed with ✅ emoji
- Warning: Yellow embed with ⚠️ emoji
- Error: Red embed with ❌ emoji + "Try Again" button
- Loading: Blue embed with 🔄 emoji

### Logging Strategy

**Structured JSON Logging:**
- All components log to Supabase `system_logs` table
- Levels: DEBUG, INFO, WARN, ERROR, CRITICAL
- Schema: `timestamp`, `component`, `level`, `message`, `context`, `user_id`, `execution_time`
- Performance tracking: Log workflow execution times

## Data Architecture

### Core Data Models

**Players Table:**
```sql
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discord_id VARCHAR UNIQUE NOT NULL,
  ffb_license VARCHAR UNIQUE,
  name VARCHAR NOT NULL,
  preferences JSONB DEFAULT '{}',
  skill_level VARCHAR CHECK (skill_level IN ('beginner', 'intermediate', 'advanced')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Tournaments Table:**
```sql
CREATE TABLE tournaments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  tournament_date TIMESTAMP WITH TIME ZONE NOT NULL,
  tournament_type VARCHAR NOT NULL,
  max_pairs INTEGER,
  registration_deadline TIMESTAMP WITH TIME ZONE,
  ffb_tournament_id VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Active Sessions Table (Discord State Bridge):**
```sql
CREATE TABLE active_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL,
  workflow_type VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'pending',
  progress INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '24 hours')
);
```

### Relationships

- **Players** ↔ **Match Requests**: One-to-many (player can have multiple active requests)
- **Players** ↔ **Partnerships**: Many-to-many through partnerships table
- **Tournaments** ↔ **Registrations**: One-to-many (tournament has many registered pairs)
- **Active Sessions** → **Players**: Many-to-one (session belongs to one player)

## API Contracts

### Discord ↔ n8n Webhook Format

**Request Format:**
```json
{
  "userId": "discord_user_id",
  "action": "find-partner",
  "data": {
    "tournamentId": "uuid",
    "preferences": {
      "skillLevel": "intermediate",
      "playingStyle": "competitive"
    }
  },
  "sessionId": "uuid_for_tracking"
}
```

**Response Format:**
```json
{
  "success": true,
  "data": {
    "workflowId": "workflow_instance_id",
    "estimatedTime": "2 hours"
  },
  "metadata": {
    "timestamp": "2024-11-13T10:00:00Z",
    "requestId": "request_uuid",
    "component": "partner-request-processor"
  }
}
```

### n8n ↔ Discord State Bridge

**Status Update Webhook:**
```json
{
  "sessionId": "uuid",
  "status": "found-matches",
  "progress": 75,
  "message": "Found 3 potential partners",
  "data": {
    "matchCount": 3,
    "nextStep": "awaiting_confirmation"
  }
}
```

## Security Architecture

**Authentication Flow:**
1. Discord OAuth2 for user identity verification
2. Bot token authentication for Discord API access
3. Supabase RLS (Row Level Security) for database access control
4. n8n webhook authentication via shared secrets

**Data Protection:**
- All personal data encrypted at rest in Supabase
- Discord user IDs used as external references (no PII in logs)
- FFB credentials secured in Airtop session management
- Webhook payloads include minimal user context

**Access Control:**
- Discord bot: Read messages, send messages, use slash commands
- n8n workflows: Database read/write through service account
- Organizers: Dashboard access with elevated permissions
- Players: Own data access only through Discord interface

## Performance Considerations

**Discord Response Times:**
- Button interactions: < 3 seconds (immediate acknowledgment)
- Webhook triggers: < 30 seconds (async processing notification)
- Status updates: Real-time via Discord State Bridge

**Database Optimization:**
- GIN indexes on JSONB columns for preference queries
- Partial indexes on active sessions for performance
- Connection pooling through Supabase for concurrent access

**Workflow Scaling:**
- n8n queue mode for high-volume processing
- Microworkflow isolation prevents cascade failures
- Airtop session reuse for FFB batch operations

## Deployment Architecture

**Development Environment:**
- Local Discord bot with ngrok tunneling
- Local n8n instance with webhook exposure
- Supabase cloud database for development

**Production Environment:**
- Discord bot: Containerized deployment (Docker)
- n8n: Cloud hosted or self-hosted with worker scaling
- Supabase: Managed PostgreSQL with automatic backups
- Airtop: Cloud-based browser automation service

**Infrastructure:**
- Load balancing: Not required for MVP (single Discord bot instance)
- Monitoring: Supabase dashboard + custom logging queries
- Backups: Automated daily Supabase backups + n8n workflow exports

## Development Environment

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- Discord Developer Application with bot token
- Supabase project with database URL and service key
- n8n instance (local or cloud) with webhook access
- Airtop account with API credentials

### Setup Commands

```bash
# Clone and setup Discord bot
npm create discord.js@latest bridge-organizer-bot --typescript
cd bridge-organizer-bot
npm install discord.js@14.24.2 @types/node @supabase/supabase-js

# Setup environment variables
cp .env.example .env
# Edit .env with Discord token, Supabase URL, n8n webhook URLs

# Setup n8n (if running locally)
npx n8n@1.119.1 setup

# Setup Supabase migrations
npx supabase init
npx supabase db push

# Start development environment
npm run dev
```

## Architecture Decision Records (ADRs)

### ADR-001: Hybrid Architecture Choice
**Decision**: Use Discord.js + n8n + Supabase hybrid instead of monolithic application
**Rationale**: Separates concerns, leverages specialized tools, enables independent scaling
**Status**: Approved
**Date**: 2024-11-13

### ADR-002: Bot-as-Proxy Authentication
**Decision**: Discord bot handles all external authentication, n8n receives pre-authenticated requests
**Rationale**: Simplifies credential management, centralizes auth complexity, easier for AI agents
**Status**: Approved
**Date**: 2024-11-13

### ADR-003: Button-First Discord Interactions
**Decision**: Use Discord buttons and menus instead of slash commands for user interactions
**Rationale**: Elderly-friendly UX, zero typing required, reduces user errors
**Status**: Approved
**Date**: 2024-11-13

### ADR-004: Airtop for FFB Integration
**Decision**: Use Airtop browser automation instead of direct API integration with FFB
**Rationale**: No API dependency, handles complex forms, session persistence, resilient to UI changes
**Status**: Approved
**Date**: 2024-11-13

### ADR-005: Discord State Bridge Pattern
**Decision**: Custom pattern for managing Discord user context during long-running workflows
**Rationale**: Solves ephemeral Discord vs persistent workflow state mismatch, provides real-time updates
**Status**: Approved
**Date**: 2024-11-13

---

_Generated by BMAD Decision Architecture Workflow v1.0_
_Date: 2024-11-13_
_For: LeKibbitz_