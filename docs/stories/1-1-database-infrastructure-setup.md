# Story 1.1: Database Infrastructure Setup

Status: ready-for-dev

## Story

As a system administrator,
I want core databases established with proper relationships,
So that player matching can access all necessary information.

## Acceptance Criteria

1. Player database created with FFB data, preferences, and Discord linking
2. Club database with member rosters and organizer roles
3. Committee database tracking permissions and responsibilities
4. Tournament type database with rules and format definitions
5. All databases properly indexed and connected via n8n workflows

## Tasks / Subtasks

- [ ] Task 1: Create core player database schema (AC: 1)
  - [ ] Implement players table with Discord ID and FFB license linking
  - [ ] Add JSONB preferences column with validation
  - [ ] Create indexes on discord_id and ffb_license for performance
  - [ ] Add skill_level constraint validation
  - [ ] Test player profile creation and retrieval operations

- [ ] Task 2: Establish club membership database (AC: 2)
  - [ ] Create clubs table with member roster tracking
  - [ ] Implement club_members table with role assignments
  - [ ] Add organizer permission levels and access control
  - [ ] Create indexes for member lookup operations
  - [ ] Test club membership queries and role validation

- [ ] Task 3: Build committee management database (AC: 3)
  - [ ] Create committees table for organizational structure
  - [ ] Implement committee_members table with responsibility tracking
  - [ ] Add permission level definitions and access constraints
  - [ ] Create audit trail for committee membership changes
  - [ ] Test committee permission queries

- [ ] Task 4: Design tournament type definitions database (AC: 4)
  - [ ] Create tournament_types table with rules and format specifications
  - [ ] Add tournament format constraints and validation rules
  - [ ] Implement pairing requirement definitions
  - [ ] Create tournament configuration templates
  - [ ] Test tournament type queries and validation

- [ ] Task 5: Establish database indexing and n8n integration (AC: 5)
  - [ ] Create GIN indexes on JSONB columns for preference queries
  - [ ] Add partial indexes on active sessions for performance
  - [ ] Configure Supabase RLS policies for access control
  - [ ] Test n8n database node connectivity and operations
  - [ ] Validate integration with Discord State Bridge pattern

## Dev Notes

### Architecture Implementation Requirements

**Technology Stack (from architecture.md):**
- Supabase PostgreSQL 18 with hybrid relational + JSONB design
- Database migrations in `/supabase/migrations/` directory
- Row Level Security (RLS) for access control
- Real-time subscriptions for n8n workflow integration

**Key Implementation Patterns:**
- Table naming: `snake_case` plural format (`players`, `tournaments`, `active_sessions`)
- Column naming: `snake_case` with `table_singular_id` foreign key format
- JSONB columns for flexible preference storage with pg_jsonschema validation
- GIN indexes on JSONB columns for efficient preference queries

### Project Structure Notes

**Database Components to Create:**
- `/supabase/migrations/001_initial_schema.sql` - Core table definitions
- `/supabase/migrations/002_error_logging.sql` - System error tracking
- `/supabase/migrations/003_state_bridge.sql` - Discord State Bridge tables
- `/supabase/functions/preference-validation.sql` - JSONB validation logic
- `/supabase/seed.sql` - Initial data for tournament types and system roles

**Database Schema Alignment:**
- Players table with `discord_id`, `ffb_license`, `preferences` JSONB, `skill_level`
- Clubs and club_members tables for roster management
- Committees and committee_members for permission tracking
- Tournament_types table with rules and format definitions
- Active_sessions table for Discord State Bridge pattern
- System_errors and system_logs tables for monitoring

**Integration Points:**
- n8n Supabase node configuration for workflow database access
- Discord State Bridge webhook endpoints for status updates
- RLS policies ensuring data security and access control
- Connection pooling through Supabase for concurrent operations

### Learnings from Previous Story

**From Story 0-5-profile-update-and-management (Status: ready-for-dev)**

This is the first Epic 1 story, transitioning from Epic 0 (User Onboarding) to core infrastructure. Previous stories established the Discord bot framework and user interaction patterns that will now require persistent database storage.

**Key Transition Context:**
- Epic 0 stories created user onboarding workflows requiring player profile persistence
- Discord interaction patterns established that need database backing
- User preference collection completed in Epic 0 now requires structured storage
- Foundation established for Epic 1's partner matching functionality

[Source: docs/stories/0-5-profile-update-and-management.md#Dev-Agent-Record]

### References

- [Source: docs/epics.md#Epic-1-Story-1.1]
- [Source: docs/architecture.md#Data-Architecture]
- [Source: docs/architecture.md#Core-Data-Models]
- [Source: docs/architecture.md#Performance-Considerations]
- [Source: docs/architecture.md#Project-Structure]

## Dev Agent Record

### Context Reference

- 1-1-database-infrastructure-setup.context.xml

### Agent Model Used

claude-sonnet-4-20250514

### Debug Log References

### Completion Notes List

### File List

*Story created: 2025-11-15*
*Previous story (0-5-profile-update-and-management) status: ready-for-dev*