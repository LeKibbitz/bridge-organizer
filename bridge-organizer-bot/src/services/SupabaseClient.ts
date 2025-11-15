import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config';

interface ErrorLogEntry {
    component: string;
    error_code: string;
    technical_message: string;
    user_message: string;
    context: any;
    user_id: string;
    severity: 'low' | 'medium' | 'high';
    timestamp: string;
}

interface EventLogEntry {
    event_type: string;
    data: any;
    timestamp: string;
}

class SupabaseService {
    private client: SupabaseClient | null = null;

    constructor() {
        if (config.supabaseUrl && config.supabaseAnonKey) {
            this.client = createClient(config.supabaseUrl, config.supabaseAnonKey);
        } else {
            console.warn('⚠️  Supabase credentials not configured. Logging will use console only.');
        }
    }

    async logError(
        component: string,
        errorCode: string,
        technicalMessage: string,
        userMessage: string,
        context: any = {},
        userId: string,
        severity: 'low' | 'medium' | 'high' = 'medium'
    ): Promise<void> {
        const errorEntry: ErrorLogEntry = {
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
            } catch (err) {
                console.error('Supabase logging error:', err);
            }
        }
    }

    async logEvent(eventType: string, data: any): Promise<void> {
        const eventEntry: EventLogEntry = {
            event_type: eventType,
            data,
            timestamp: new Date().toISOString()
        };

        // Always log to console in dev mode
        if (config.environment === 'development') {
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
            } catch (err) {
                console.error('Supabase event logging error:', err);
            }
        }
    }

    getClient(): SupabaseClient | null {
        return this.client;
    }

    isConnected(): boolean {
        return this.client !== null;
    }
}

export const supabaseClient = new SupabaseService();