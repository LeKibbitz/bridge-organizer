# Story 0.5: Profile Update and Management

Status: ready-for-dev

## Story

As a registered player,
I want to click "My Profile" to view and update my information,
so that the matching system has current data about me.

## Acceptance Criteria

1. "My Profile" button shows current information in organized sections
2. Clickable "Edit" buttons for each editable section
3. Dropdown/button interfaces for preference changes
4. "Save Changes" confirmation with success feedback
5. "View Registration History" button shows past tournaments

## Tasks / Subtasks

- [ ] Task 1: Create profile view interface (AC: 1)
  - [ ] Design "My Profile" button integration in main menu
  - [ ] Create profile information display with organized sections
  - [ ] Implement current data loading and presentation
  - [ ] Add profile section headers and formatting

- [ ] Task 2: Implement section editing functionality (AC: 2)
  - [ ] Add "Edit" buttons for each profile section
  - [ ] Create edit mode toggle for profile sections
  - [ ] Implement edit state management
  - [ ] Handle edit mode transitions

- [ ] Task 3: Create preference update interfaces (AC: 3)
  - [ ] Implement dropdown menus for skill level changes
  - [ ] Create button interfaces for availability preferences
  - [ ] Add playing style preference selection
  - [ ] Create preference validation logic

- [ ] Task 4: Implement save and confirmation system (AC: 4)
  - [ ] Create "Save Changes" button with validation
  - [ ] Implement profile update persistence to database
  - [ ] Add success feedback with change summary
  - [ ] Handle save errors with retry options

- [ ] Task 5: Create registration history view (AC: 5)
  - [ ] Add "View Registration History" button
  - [ ] Design tournament history display interface
  - [ ] Implement tournament data retrieval
  - [ ] Create pagination for large history lists
  - [ ] Handle empty history state gracefully

## Dev Notes

### Architecture Implementation Requirements

**Technology Stack (from architecture.md):**
- Discord.js v14.24.2 with modal forms and embedded displays
- Supabase profile update operations with transaction safety
- JSONB preference updates with validation
- Discord State Bridge for profile update progress

**Key Implementation Patterns:**
- Profile editing uses modal forms for complex data entry
- Preference updates maintain data consistency with validation
- Registration history requires tournament data integration
- Save operations use atomic database transactions

### Project Structure Notes

**Components to Implement:**
- `/src/interactions/ProfileManagement.ts` - Profile view and edit handlers
- `/src/menus/ProfileMenu.ts` - Profile-related menu options
- `/src/services/ProfileUpdateService.ts` - Profile modification operations
- `/src/utils/PreferenceValidator.ts` - Preference validation logic
- `/src/views/RegistrationHistory.ts` - Tournament history display

**Database Operations:**
- Profile update queries with atomic transactions
- Tournament registration history queries
- Preference validation and constraint checking
- Change audit logging for profile modifications

### References

- [Source: docs/epics.md#Epic-0-Story-0.5]
- [Source: docs/architecture.md#Data-Architecture]
- [Source: docs/architecture.md#Discord-State-Bridge-Pattern]
- [Source: docs/PRD.md#UX-Design-Principles]

## Dev Agent Record

### Context Reference

- 0-5-profile-update-and-management.context.xml

### Agent Model Used

claude-sonnet-4-20250514

### Debug Log References

### Completion Notes List

### File List

*Story created: 2025-11-14*
*Previous story (0-4-returning-player-recognition) status: drafted*