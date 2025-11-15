import { errorHandler } from '../../src/utils/ErrorHandler';
import { createMockButtonInteraction } from '../mocks/DiscordMocks';

// Mock Supabase client
jest.mock('../../src/services/SupabaseClient', () => ({
    supabaseClient: {
        logError: jest.fn(),
        logEvent: jest.fn()
    }
}));

describe('ErrorHandler', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should handle interaction errors correctly', async () => {
        const mockInteraction = createMockButtonInteraction('test-button');
        const testError = new Error('Test error message');

        await errorHandler.handleInteractionError(mockInteraction as any, testError);

        expect(mockInteraction.replied || mockInteraction.deferred).toBeTruthy();
    });

    test('should handle unknown interactions', async () => {
        const mockInteraction = createMockButtonInteraction('unknown-button');

        await errorHandler.handleUnknownInteraction(mockInteraction as any);

        expect(mockInteraction.replied || mockInteraction.deferred).toBeTruthy();
    });

    test('should create standard error response', () => {
        const response = errorHandler.createStandardErrorResponse(
            'TEST_ERROR',
            'Technical message',
            'User message'
        );

        expect(response.success).toBe(false);
        expect(response.error.code).toBe('TEST_ERROR');
        expect(response.error.message).toBe('Technical message');
        expect(response.error.userMessage).toBe('User message');
    });
});