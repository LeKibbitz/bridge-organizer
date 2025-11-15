"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabaseClient = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const config_1 = require("../config");
class SupabaseService {
    constructor() {
        this.client = null;
        if (config_1.config.supabaseUrl && config_1.config.supabaseAnonKey) {
            this.client = (0, supabase_js_1.createClient)(config_1.config.supabaseUrl, config_1.config.supabaseAnonKey);
        }
        else {
            console.warn('⚠️  Supabase credentials not configured. Logging will use console only.');
        }
    }
    async logError(component, errorCode, technicalMessage, userMessage, context = {}, userId, severity = 'medium') {
        const errorEntry = {
            component,
            error_code: errorCode,
            technical_message: technicalMessage,
            user_message: userMessage,
            context,
            user_id: userId,
            severity,
            timestamp: new Date().toISOString()
        };
        // Always log to console
        console.error(`[${severity.toUpperCase()}] ${component}:${errorCode}`, {
            technicalMessage,
            userMessage,
            userId,
            context
        });
        // Try to log to Supabase if available
        if (this.client) {
            try {
                const { error } = await this.client
                    .from('system_errors')
                    .insert(errorEntry);
                if (error) {
                    console.error('Failed to log error to Supabase:', error);
                }
            }
            catch (err) {
                console.error('Supabase logging error:', err);
            }
        }
    }
    async logEvent(eventType, data) {
        const eventEntry = {
            event_type: eventType,
            data,
            timestamp: new Date().toISOString()
        };
        // Always log to console in dev mode
        if (config_1.config.environment === 'development') {
            console.log(`📊 Event: ${eventType}`, data);
        }
        // Try to log to Supabase if available
        if (this.client) {
            try {
                const { error } = await this.client
                    .from('system_events')
                    .insert(eventEntry);
                if (error) {
                    console.error('Failed to log event to Supabase:', error);
                }
            }
            catch (err) {
                console.error('Supabase event logging error:', err);
            }
        }
    }
    getClient() {
        return this.client;
    }
    isConnected() {
        return this.client !== null;
    }
}
exports.supabaseClient = new SupabaseService();
