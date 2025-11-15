import { Client } from 'discord.js';
import { BotHealthCheck } from '../../src/utils/BotHealthCheck';

// Mock Discord Client
const mockClient = {
    isReady: jest.fn(),
    ws: { ping: 100 },
    guilds: { cache: { size: 1 } },
    users: { cache: { size: 10 } },
    readyAt: new Date()
} as unknown as Client;

describe('BotHealthCheck Integration', () => {
    let healthCheck: BotHealthCheck;

    beforeEach(() => {
        jest.clearAllMocks();
        healthCheck = new BotHealthCheck(mockClient);
    });

    test('should report healthy status when bot is ready and responsive', async () => {
        (mockClient.isReady as jest.Mock).mockReturnValue(true);
        mockClient.ws.ping = 100;

        const result = await healthCheck.performHealthCheck();

        expect(result.healthy).toBe(true);
        expect(result.responseTime).toBeLessThan(5000);
    });

    test('should report unhealthy status when response time exceeds 5 seconds', async () => {
        (mockClient.isReady as jest.Mock).mockReturnValue(true);
        mockClient.ws.ping = 6000; // Exceeds 5 second requirement

        const result = await healthCheck.performHealthCheck();

        expect(result.healthy).toBe(false);
    });

    test('should report unhealthy status when bot is not ready', async () => {
        (mockClient.isReady as jest.Mock).mockReturnValue(false);
        mockClient.ws.ping = 100;

        const result = await healthCheck.performHealthCheck();

        expect(result.healthy).toBe(false);
    });

    test('should provide correct status information', () => {
        (mockClient.isReady as jest.Mock).mockReturnValue(true);

        const status = healthCheck.getStatus();

        expect(status.online).toBe(true);
        expect(status.latency).toBe(100);
        expect(status.guilds).toBe(1);
        expect(status.users).toBe(10);
        expect(typeof status.uptime).toBe('number');
    });

    test('should format uptime correctly', () => {
        const formattedUptime = healthCheck.getFormattedUptime();

        expect(formattedUptime).toMatch(/^\d+h \d+m \d+s$/);
    });
});