# bridge-organizer - Epic Breakdown

**Author:** LeKibbitz
**Date:** 2025-11-13
**Project Level:** 2
**Target Scale:** Level 2 - Medium project, 3 epics, 16-20 stories total

---

## Overview

This document provides the detailed epic breakdown for bridge-organizer, expanding on the high-level epic list in the [PRD](./PRD.md).

Each epic includes:

- Expanded goal and value proposition
- Complete story breakdown with user stories
- Acceptance criteria for each story
- Story sequencing and dependencies

**Epic Sequencing Principles:**

- Epic 0 establishes user identity and onboarding through FFB license verification
- Epic 1 establishes foundational infrastructure and initial functionality
- Subsequent epics build progressively, each delivering significant end-to-end value
- Stories within epics are vertically sliced and sequentially ordered
- No forward dependencies - each story builds only on previous work

---

## Epic 0: User Onboarding & Identity Management

**Expanded Goal:** Establish seamless player identity verification through FFB license matching and create persistent Discord-to-player profiles. This epic enables all future functionality by ensuring the system knows who each player is and can access their FFB data for tournament registration. Players complete a one-time setup process that links their Discord account to their bridge license permanently.

**Value Delivery:** After this epic, new players can join the Discord server and quickly onboard themselves, while returning players are automatically recognized for all future interactions.

**Story 0.1: Discord Bot Basic Setup**

As a bridge club organizer,
I want a Discord bot deployed with clickable menu interfaces,
So that players can interact through simple button clicks.

**Acceptance Criteria:**
1. Discord bot is deployed and online in target Discord server
2. Bot presents main menu with clickable buttons (Register, Help, Profile)
3. Bot shows online status and responds within 5 seconds
4. Basic error handling with clickable "Try Again" buttons

**Prerequisites:** None (foundation story)

**Story 0.2: FFB License Verification**

As a new bridge player,
I want to click "Register" and enter my FFB license through a simple form,
So that the system can access my official bridge information.

**Acceptance Criteria:**
1. "Register" button opens modal form for license number input
2. System validates license format with real-time feedback
3. System queries FFB database and displays retrieved player information
4. Confirmation shown with "Yes, this is me" / "No, try again" buttons
5. Clear error messages with clickable "Retry" options

**Prerequisites:** Story 0.1 (Discord bot with menus operational)

**Story 0.3: Player Profile Creation**

As a verified bridge player,
I want to confirm my profile through clickable preferences,
So that future interactions automatically know who I am.

**Acceptance Criteria:**
1. Profile confirmation screen with clickable preference options
2. Dropdown menus for availability, skill level, playing style preferences
3. "Save Profile" button creates complete player record
4. Success message with "Continue to Main Menu" button
5. Database maintains Discord ID → FFB license → preferences mapping

**Prerequisites:** Story 0.2 (FFB verification working)

**Story 0.4: Returning Player Recognition**

As a registered bridge player,
I want to see a personalized main menu,
So that I can immediately access relevant functions.

**Acceptance Criteria:**
1. Returning players see personalized greeting with their name
2. Main menu shows relevant options (Find Partner, Register, View Tournaments)
3. Quick access buttons for common actions
4. New players see registration-focused menu
5. System handles profile loading within 2 seconds

**Prerequisites:** Story 0.3 (player profiles exist)

**Story 0.5: Profile Update and Management**

As a registered player,
I want to click "My Profile" to view and update my information,
So that the matching system has current data about me.

**Acceptance Criteria:**
1. "My Profile" button shows current information in organized sections
2. Clickable "Edit" buttons for each editable section
3. Dropdown/button interfaces for preference changes
4. "Save Changes" confirmation with success feedback
5. "View Registration History" button shows past tournaments

**Prerequisites:** Story 0.4 (recognition system working)

---

## Epic 1: Foundation & Core Partner Matching

**Expanded Goal:** Build the core n8n infrastructure, database systems, and intelligent partner matching functionality. This epic transforms the manual partner-finding process into an automated system that matches players based on preferences, availability, and compatibility. Players use simple clickable interfaces to request partners and receive matches within hours instead of days.

**Value Delivery:** After this epic, registered players can find partners automatically through Discord menu interactions, eliminating the manual WhatsApp coordination burden for organizers.

**Story 1.1: Database Infrastructure Setup**

As a system administrator,
I want core databases established with proper relationships,
So that player matching can access all necessary information.

**Acceptance Criteria:**
1. Player database created with FFB data, preferences, and Discord linking
2. Club database with member rosters and organizer roles
3. Committee database tracking permissions and responsibilities
4. Tournament type database with rules and format definitions
5. All databases properly indexed and connected via n8n workflows

**Prerequisites:** Epic 0 complete (player profiles exist)

**Story 1.2: Partner Request Interface**

As a registered bridge player,
I want to click "Find Partner" and select tournament options,
So that I can request a partner match through simple menus.

**Acceptance Criteria:**
1. "Find Partner" button opens tournament selection dropdown
2. Clickable preference options (skill level, playing style, time preferences)
3. "Submit Request" button sends request with loading indicator
4. Confirmation message: "Searching for partner, you'll be notified within 2 hours"
5. Request logged in system with timestamp and preferences

**Prerequisites:** Story 1.1 (databases operational)

**Story 1.3: Basic Matching Algorithm**

As the system,
I want to match partner requests using player preferences and availability,
So that compatible pairs are automatically identified.

**Acceptance Criteria:**
1. n8n workflow processes partner requests from database queue
2. Algorithm considers skill level compatibility, playing style, and availability
3. Excludes players already registered for that tournament
4. Ranks potential matches by compatibility score
5. Logs matching decisions and rationale for organizer review

**Prerequisites:** Story 1.2 (partner requests coming in)

**Story 1.4: Match Notification System**

As a bridge player with a potential partner match,
I want to receive a notification with simple accept/decline buttons,
So that I can quickly confirm or reject the partnership.

**Acceptance Criteria:**
1. Both players receive Discord notification with partner details
2. Clear "Accept Partnership" and "Decline" buttons
3. Shows partner name, skill level, and basic compatibility info
4. 4-hour response timeout with automatic escalation
5. Real-time status updates for both players during confirmation process

**Prerequisites:** Story 1.3 (matching algorithm working)

**Story 1.5: Partnership Confirmation Processing**

As the system,
I want to handle partnership confirmations and create confirmed pairs,
So that successful matches proceed to registration.

**Acceptance Criteria:**
1. Both players clicking "Accept" creates confirmed partnership
2. Confirmed pairs receive success notification with next steps
3. One player declining triggers search for alternative matches
4. Timeout handling automatically finds new matches or escalates to organizer
5. Partnership data prepared for tournament registration process

**Prerequisites:** Story 1.4 (notification system working)

**Story 1.6: No Match Handling**

As a bridge player whose partner request cannot be matched,
I want clear communication about alternatives,
So that I understand my options for tournament participation.

**Acceptance Criteria:**
1. System identifies when no compatible matches exist
2. Player receives notification with clickable options menu
3. Options include: "Join Waiting List", "Modify Preferences", "Contact Organizer"
4. Waiting list automatically rechecks when new players register
5. Organizer dashboard shows all unmatched requests for manual intervention

**Prerequisites:** Story 1.5 (confirmation processing working)

**Story 1.7: Organizer Monitoring Dashboard**

As a bridge club organizer,
I want to monitor partner matching activity and intervene when needed,
So that I can ensure all players receive appropriate service.

**Acceptance Criteria:**
1. Web dashboard accessible through Discord bot menu link
2. Real-time view of active matching requests and statuses
3. List of unresolvable matches requiring manual intervention
4. Clickable actions to manually create partnerships or contact players
5. Basic statistics on matching success rates and response times

**Prerequisites:** Story 1.6 (complete matching workflow operational)

---

## Epic 2: Advanced Registration & Management

**Expanded Goal:** Complete the automation loop by integrating tournament registration with FFB systems, adding team functionality, and providing comprehensive management tools for organizers. This epic transforms confirmed partnerships into actual tournament registrations and handles complex scenarios like team formation, late changes, and existing partnerships.

**Value Delivery:** After this epic, the entire process from partner request to tournament registration is fully automated, with organizers having complete oversight and players able to register existing partnerships or form teams.

**Story 2.1: FFB Registration Integration**

As a confirmed partnership,
I want my tournament registration automatically completed with FFB,
So that I don't need to manually register on the FFB website.

**Acceptance Criteria:**
1. n8n workflow automatically submits confirmed pairs to FFB registration system
2. System handles FFB authentication and form completion
3. Players receive confirmation with FFB registration number and tournament details
4. Error handling for FFB system failures with manual fallback options
5. Registration status tracked in local database for monitoring

**Prerequisites:** Epic 1 complete (partnerships confirmed)

**Story 2.2: Existing Partnership Registration**

As a bridge player with an existing partner,
I want to click "Register Existing Partnership" and select my partner,
So that we can register together without using the matching system.

**Acceptance Criteria:**
1. "Register Existing Partnership" button opens tournament selection
2. Partner selection dropdown from club member database
3. Selected partner receives confirmation request with accept/decline buttons
4. Upon acceptance, both players proceed directly to FFB registration
5. System tracks existing partnerships for future reference

**Prerequisites:** Story 2.1 (FFB integration working)

**Story 2.3: Team Formation Interface**

As a bridge player wanting to form a team,
I want to click "Register Team" and build a 4-player team,
So that we can participate in team tournaments.

**Acceptance Criteria:**
1. "Register Team" button opens team creation interface
2. Team name input and tournament selection dropdown
3. Sequential team member addition with dropdown selection from club members
4. Visual team roster display as members are added
5. "Send Team Invitations" button when roster complete

**Prerequisites:** Story 2.2 (partnership registration working)

**Story 2.4: Team Confirmation System**

As a team member invited to join a tournament team,
I want to receive a clear invitation with team details,
So that I can accept or decline the team invitation.

**Acceptance Criteria:**
1. Each team member receives Discord notification with team name and roster
2. Clear "Accept Team Invitation" and "Decline" buttons
3. Real-time roster updates showing confirmation status for all members
4. Team captain receives updates as members respond
5. Complete team auto-registers with FFB; incomplete teams notify captain of gaps

**Prerequisites:** Story 2.3 (team formation interface working)

**Story 2.5: Late Registration and Cancellation Handling**

As a registered player needing to cancel or modify my registration,
I want simple options to handle changes,
So that the system can automatically manage late modifications.

**Acceptance Criteria:**
1. "My Registrations" menu shows all active tournament registrations
2. Clickable "Cancel Registration" and "Modify Partnership" options
3. Cancellations trigger automatic re-matching for abandoned partners
4. Late registration requests handled through priority matching
5. Organizer notifications for changes requiring manual intervention

**Prerequisites:** Story 2.4 (team confirmations working)

**Story 2.6: Comprehensive Organizer Management**

As a bridge club organizer,
I want complete oversight and control tools,
So that I can manage all aspects of tournament registration efficiently.

**Acceptance Criteria:**
1. Enhanced dashboard with tournament participation overview
2. Manual partnership/team creation tools for special cases
3. Registration status monitoring with FFB sync verification
4. Player communication tools for tournament updates and announcements
5. Reporting system for participation trends and system performance metrics

**Prerequisites:** Story 2.5 (full registration workflow operational)

---

## Story Guidelines Reference

**Story Format:**

```
**Story [EPIC.N]: [Story Title]**

As a [user type],
I want [goal/desire],
So that [benefit/value].

**Acceptance Criteria:**
1. [Specific testable criterion]
2. [Another specific criterion]
3. [etc.]

**Prerequisites:** [Dependencies on previous stories, if any]
```

**Story Requirements:**

- **Vertical slices** - Complete, testable functionality delivery
- **Sequential ordering** - Logical progression within epic
- **No forward dependencies** - Only depend on previous work
- **AI-agent sized** - Completable in 2-4 hour focused session
- **Value-focused** - Integrate technical enablers into value-delivering stories

---

**For implementation:** Use the `create-story` workflow to generate individual story implementation plans from this epic breakdown.