"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotHealthCheck = void 0;
class BotHealthCheck {
    constructor(client) {
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
    getUptime() {
        return Date.now() - this.startTime;
    }
    getFormattedUptime() {
        const uptime = this.getUptime();
        const seconds = Math.floor(uptime / 1000) % 60;
        const minutes = Math.floor(uptime / (1000 * 60)) % 60;
        const hours = Math.floor(uptime / (1000 * 60 * 60));
        return `${hours}h ${minutes}m ${seconds}s`;
    }
    isHealthy() {
        return this.client.isReady() && this.client.ws.ping < 5000; // 5 second requirement
    }
    async performHealthCheck() {
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
exports.BotHealthCheck = BotHealthCheck;
