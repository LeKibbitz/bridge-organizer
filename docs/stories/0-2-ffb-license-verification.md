# Story 0.2: FFB License Verification

Status: ready-for-dev

## Story

As a new bridge player,
I want to click "Register" and enter my FFB license through a simple form,
so that the system can access my official bridge information.

## Acceptance Criteria

1. "Register" button opens modal form for license number input
2. System validates license format with real-time feedback
3. System queries FFB database and displays retrieved player information
4. Confirmation shown with "Yes, this is me" / "No, try again" buttons
5. Clear error messages with clickable "Retry" options

## Tasks / Subtasks

- [ ] Task 1: Implement license input modal form (AC: 1)
  - [ ] Create modal dialog with license number input field
  - [ ] Add form validation for required fields
  - [ ] Implement modal trigger from "Register" button

- [ ] Task 2: Add real-time license format validation (AC: 2)
  - [ ] Implement FFB license format validation rules
  - [ ] Add real-time feedback during typing
  - [ ] Display validation status with visual indicators

- [ ] Task 3: Integrate Airtop FFB database query (AC: 3)
  - [ ] Setup Airtop browser automation workflow
  - [ ] Implement FFB website navigation and data extraction
  - [ ] Display retrieved player information in Discord embed

- [ ] Task 4: Create confirmation interface (AC: 4)
  - [ ] Design player information confirmation screen
  - [ ] Implement "Yes, this is me" and "No, try again" buttons
  - [ ] Handle confirmation responses and next steps

- [ ] Task 5: Implement comprehensive error handling (AC: 5)
  - [ ] Create standardized error messages for common failures
  - [ ] Add "Retry" buttons for recoverable errors
  - [ ] Log errors to Supabase system_errors table
  - [ ] Test error scenarios (network issues, invalid licenses, etc.)

## Dev Notes

### Architecture Implementation Requirements

**Technology Stack (from architecture.md):**
- Discord.js v14.24.2 with modal forms for license input
- Airtop browser automation for FFB database queries (no direct API)
- Supabase `players` table for storing verification results
- Discord State Bridge pattern for progress updates during verification

**Key Implementation Patterns:**
- Button ID: `register-player` triggers license verification flow
- Modal form with real-time validation feedback
- Airtop session persistence for multi-step FFB interaction
- Standardized error format with retry mechanisms

### Project Structure Notes

**Components to Implement:**
- `/src/interactions/LicenseVerification.ts` - Modal form handler
- `/src/services/AirtopClient.ts` - FFB database integration
- `/src/menus/RegistrationMenu.ts` - Updated main menu with Register button
- `/src/utils/LicenseValidator.ts` - Format validation logic

**Database Schema Extensions:**
- `players` table: `ffb_license` field for storing verified license numbers
- `system_logs` table: Log verification attempts and outcomes

### References

- [Source: docs/epics.md#Epic-0-Story-0.2]
- [Source: docs/architecture.md#Airtop-Integration]
- [Source: docs/architecture.md#Discord-State-Bridge-Pattern]
- [Source: docs/architecture.md#Error-Handling]
- [Source: docs/PRD.md#UX-Design-Principles]

## Dev Agent Record

### Context Reference

- 0-2-ffb-license-verification.context.xml

### Agent Model Used

claude-sonnet-4-20250514

### Debug Log References

### Completion Notes List

### File List

*Story created: 2025-11-14*
*Previous story (0-1-discord-bot-basic-setup) status: drafted*