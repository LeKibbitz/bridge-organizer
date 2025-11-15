import { Client } from 'discord.js';

export class BotHealthCheck {
    private client: Client;
    private startTime: number;

    constructor(client: Client) {
        this.client = client;
        this.startTime = Date.now();
    }

    getStatus() {
        return {
            online: this.client.isReady(),
            uptime: this.getUptime(),
            latency: this.client.ws.ping,
            guilds: this.client.guilds.cache.size,
            users: this.client.users.cache.size,
            readyAt: this.client.readyAt?.toISOString(),
        };
    }

    getUptime(): number {
        return Date.now() - this.startTime;
    }

    getFormattedUptime(): string {
        const uptime = this.getUptime();
        const seconds = Math.floor(uptime / 1000) % 60;
        const minutes = Math.floor(uptime / (1000 * 60)) % 60;
        const hours = Math.floor(uptime / (1000 * 60 * 60));

        return `${hours}h ${minutes}m ${seconds}s`;
    }

    isHealthy(): boolean {
        return this.client.isReady() && this.client.ws.ping < 5000; // 5 second requirement
    }

    async performHealthCheck(): Promise<{
        healthy: boolean;
        status: any;
        responseTime: number;
    }> {
        const checkStart = Date.now();
        const status = this.getStatus();
        const responseTime = Date.now() - checkStart;

        const healthy = this.isHealthy() && responseTime < 5000;

        console.log(`🔍 Health Check: ${healthy ? '✅ HEALTHY' : '❌ UNHEALTHY'}`);
        console.log(`   Response Time: ${responseTime}ms`);
        console.log(`   Bot Latency: ${this.client.ws.ping}ms`);
        console.log(`   Uptime: ${this.getFormattedUptime()}`);
        console.log(`   Guilds: ${status.guilds}`);

        return {
            healthy,
            status,
            responseTime
        };
    }
}