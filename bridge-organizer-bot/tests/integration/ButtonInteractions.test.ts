import { MainMenuHandler } from '../../src/interactions/MainMenuHandler';
import { createMockButtonInteraction } from '../mocks/DiscordMocks';

// Mock Supabase client
jest.mock('../../src/services/SupabaseClient', () => ({
    supabaseClient: {
        logError: jest.fn(),
        logEvent: jest.fn()
    }
}));

describe('Button Interactions Integration', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should handle show main menu interaction', async () => {
        const mockInteraction = createMockButtonInteraction('show-main-menu');
        const startTime = Date.now();

        await MainMenuHandler.handleShowMainMenu(mockInteraction as any);

        const responseTime = Date.now() - startTime;

        expect(mockInteraction.deferred).toBe(true);
        expect(responseTime).toBeLessThan(5000); // AC: responds within 5 seconds
    });

    test('should handle register player interaction', async () => {
        const mockInteraction = createMockButtonInteraction('register-player');

        await MainMenuHandler.handleRegisterPlayer(mockInteraction as any);

        expect(mockInteraction.deferred).toBe(true);
    });

    test('should handle view help interaction', async () => {
        const mockInteraction = createMockButtonInteraction('view-help');

        await MainMenuHandler.handleViewHelp(mockInteraction as any);

        expect(mockInteraction.deferred).toBe(true);
    });

    test('should handle view profile interaction', async () => {
        const mockInteraction = createMockButtonInteraction('view-profile');

        await MainMenuHandler.handleViewProfile(mockInteraction as any);

        expect(mockInteraction.deferred).toBe(true);
    });

    test('should respond to all interactions within 5 seconds', async () => {
        const interactions = [
            'show-main-menu',
            'register-player',
            'view-help',
            'view-profile'
        ];

        for (const customId of interactions) {
            const mockInteraction = createMockButtonInteraction(customId);
            const startTime = Date.now();

            switch (customId) {
                case 'show-main-menu':
                    await MainMenuHandler.handleShowMainMenu(mockInteraction as any);
                    break;
                case 'register-player':
                    await MainMenuHandler.handleRegisterPlayer(mockInteraction as any);
                    break;
                case 'view-help':
                    await MainMenuHandler.handleViewHelp(mockInteraction as any);
                    break;
                case 'view-profile':
                    await MainMenuHandler.handleViewProfile(mockInteraction as any);
                    break;
            }

            const responseTime = Date.now() - startTime;
            expect(responseTime).toBeLessThan(5000); // AC: < 5 seconds
        }
    });
});