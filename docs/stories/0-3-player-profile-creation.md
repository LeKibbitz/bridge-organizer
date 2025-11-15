# Story 0.3: Player Profile Creation

Status: ready-for-dev

## Story

As a verified bridge player,
I want to confirm my profile through clickable preferences,
so that future interactions automatically know who I am.

## Acceptance Criteria

1. Profile confirmation screen with clickable preference options
2. Dropdown menus for availability, skill level, playing style preferences
3. "Save Profile" button creates complete player record
4. Success message with "Continue to Main Menu" button
5. Database maintains Discord ID → FFB license → preferences mapping

## Tasks / Subtasks

- [ ] Task 1: Create profile confirmation screen (AC: 1)
  - [ ] Design profile confirmation interface with player information display
  - [ ] Implement clickable preference selection components
  - [ ] Add visual confirmation of selected preferences

- [ ] Task 2: Implement preference dropdown menus (AC: 2)
  - [ ] Create availability dropdown (weekdays, weekends, both)
  - [ ] Create skill level dropdown (beginner, intermediate, advanced)
  - [ ] Create playing style dropdown (casual, competitive, learning)
  - [ ] Implement dropdown interaction handlers

- [ ] Task 3: Implement profile save functionality (AC: 3)
  - [ ] Create "Save Profile" button with validation
  - [ ] Implement profile data persistence to Supabase
  - [ ] Handle profile save success/failure scenarios

- [ ] Task 4: Create success confirmation flow (AC: 4)
  - [ ] Design success message with profile summary
  - [ ] Implement "Continue to Main Menu" button
  - [ ] Handle transition to main menu state

- [ ] Task 5: Establish database mapping system (AC: 5)
  - [ ] Design Discord ID → FFB license → preferences data model
  - [ ] Implement database schema for complete player records
  - [ ] Create data integrity validation and constraints
  - [ ] Test profile retrieval and update operations

## Dev Notes

### Architecture Implementation Requirements

**Technology Stack (from architecture.md):**
- Discord.js v14.24.2 with dropdown menus and button interactions
- Supabase `players` table extensions for preferences storage
- JSONB column structure for flexible preference storage
- Discord State Bridge for profile creation progress updates

**Key Implementation Patterns:**
- Profile confirmation follows verified FFB license data
- Preference selections use Discord dropdown components
- Database design supports Discord ID as primary key with FFB license foreign key
- Standardized success/error messaging with navigation buttons

### Project Structure Notes

**Components to Implement:**
- `/src/interactions/ProfileCreation.ts` - Profile confirmation and preference handlers
- `/src/menus/PreferenceMenus.ts` - Dropdown menus for preferences
- `/src/services/ProfileService.ts` - Profile data management and persistence
- `/src/utils/ProfileValidator.ts` - Profile data validation logic

**Database Schema Extensions:**
- `players` table: Add `preferences` JSONB column for flexible preference storage
- `players` table: Add `profile_complete` boolean flag
- Add constraints for Discord ID uniqueness and FFB license validation

### References

- [Source: docs/epics.md#Epic-0-Story-0.3]
- [Source: docs/architecture.md#Data-Architecture]
- [Source: docs/architecture.md#Discord-State-Bridge-Pattern]
- [Source: docs/PRD.md#UX-Design-Principles]

## Dev Agent Record

### Context Reference

- 0-3-player-profile-creation.context.xml

### Agent Model Used

claude-sonnet-4-20250514

### Debug Log References

### Completion Notes List

### File List

*Story created: 2025-11-14*
*Previous story (0-2-ffb-license-verification) status: ready-for-dev*