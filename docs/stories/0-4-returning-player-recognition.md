# Story 0.4: Returning Player Recognition

Status: ready-for-dev

## Story

As a registered bridge player,
I want to see a personalized main menu,
so that I can immediately access relevant functions.

## Acceptance Criteria

1. Returning players see personalized greeting with their name
2. Main menu shows relevant options (Find Partner, Register, View Tournaments)
3. Quick access buttons for common actions
4. New players see registration-focused menu
5. System handles profile loading within 2 seconds

## Tasks / Subtasks

- [ ] Task 1: Implement personalized greeting system (AC: 1)
  - [ ] Create player recognition logic using Discord ID
  - [ ] Implement personalized greeting with player name display
  - [ ] Handle greeting for verified vs unverified players

- [ ] Task 2: Create dynamic main menu options (AC: 2)
  - [ ] Design returning player main menu layout
  - [ ] Implement Find Partner button for registered players
  - [ ] Add Register and View Tournaments options
  - [ ] Create menu option visibility based on player status

- [ ] Task 3: Implement quick access buttons (AC: 3)
  - [ ] Identify most common player actions from user flows
  - [ ] Create quick access button components
  - [ ] Implement quick action handlers
  - [ ] Test quick access functionality

- [ ] Task 4: Create new player registration menu (AC: 4)
  - [ ] Design registration-focused menu for new players
  - [ ] Implement conditional menu display logic
  - [ ] Create clear call-to-action for unregistered players
  - [ ] Handle menu transitions between states

- [ ] Task 5: Optimize profile loading performance (AC: 5)
  - [ ] Implement efficient player profile lookup
  - [ ] Add profile caching mechanisms
  - [ ] Create loading indicators for profile retrieval
  - [ ] Test and optimize for 2-second response requirement
  - [ ] Handle profile loading failures gracefully

## Dev Notes

### Architecture Implementation Requirements

**Technology Stack (from architecture.md):**
- Discord.js v14.24.2 with conditional menu rendering
- Supabase player profile queries with caching
- Discord State Bridge for menu state management
- Profile loading optimization with indexed queries

**Key Implementation Patterns:**
- Player recognition based on Discord ID lookup
- Conditional menu rendering based on profile completion status
- Quick access patterns for frequent user actions
- Performance optimization for sub-2-second profile loading

### Project Structure Notes

**Components to Implement:**
- `/src/interactions/PlayerRecognition.ts` - Player identification and greeting logic
- `/src/menus/MainMenu.ts` - Enhanced main menu with personalization
- `/src/menus/QuickActions.ts` - Quick access button implementations
- `/src/services/PlayerProfileService.ts` - Optimized profile loading and caching
- `/src/utils/MenuStateManager.ts` - Menu state and visibility logic

**Database Optimizations:**
- Add database indexes on Discord ID for fast player lookup
- Implement profile caching strategy to meet 2-second requirement
- Create efficient query patterns for profile status checks

### References

- [Source: docs/epics.md#Epic-0-Story-0.4]
- [Source: docs/architecture.md#Performance-Considerations]
- [Source: docs/architecture.md#Discord-State-Bridge-Pattern]
- [Source: docs/PRD.md#UX-Design-Principles]

## Dev Agent Record

### Context Reference

- 0-4-returning-player-recognition.context.xml

### Agent Model Used

claude-sonnet-4-20250514

### Debug Log References

### Completion Notes List

### File List

*Story created: 2025-11-14*
*Previous story (0-3-player-profile-creation) status: drafted*