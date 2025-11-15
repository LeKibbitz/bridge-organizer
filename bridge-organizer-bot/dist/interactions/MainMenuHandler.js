"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainMenuHandler = void 0;
const discord_js_1 = require("discord.js");
const MainMenu_1 = require("../menus/MainMenu");
const SupabaseClient_1 = require("../services/SupabaseClient");
class MainMenuHandler {
    static async handleShowMainMenu(interaction) {
        const startTime = Date.now();
        await interaction.deferReply();
        try {
            const menu = MainMenu_1.MainMenu.createMenu();
            const responseTime = Date.now() - startTime;
            await interaction.editReply(menu);
            // Log successful menu display
            await SupabaseClient_1.supabaseClient.logEvent('main_menu_displayed', {
                userId: interaction.user.id,
                responseTime,
                timestamp: new Date().toISOString()
            });
            console.log(`✅ Main menu displayed for ${interaction.user.tag} (${responseTime}ms)`);
        }
        catch (error) {
            console.error('Error showing main menu:', error);
            await SupabaseClient_1.supabaseClient.logError('main_menu', 'MENU_DISPLAY_ERROR', error instanceof Error ? error.message : 'Unknown error', 'Unable to display main menu. Please try again.', { userId: interaction.user.id }, interaction.user.id, 'medium');
            throw error;
        }
    }
    static async handleRegisterPlayer(interaction) {
        await interaction.deferReply();
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle('📝 Player Registration')
            .setDescription('Registration functionality is coming soon! This will allow you to register for bridge tournaments and partnerships.')
            .setColor(0xFFA500) // Orange color for warning/coming soon
            .setFooter({ text: 'Bridge Club Organizer Bot' })
            .setTimestamp();
        await interaction.editReply({ embeds: [embed] });
        await SupabaseClient_1.supabaseClient.logEvent('register_button_clicked', {
            userId: interaction.user.id,
            timestamp: new Date().toISOString()
        });
    }
    static async handleViewHelp(interaction) {
        await interaction.deferReply();
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle('❓ Help & Information')
            .setDescription('**How to use this bot:**\n\n' +
            '🏠 **Main Menu** - Access all bot features\n' +
            '📝 **Register** - Sign up for tournaments and find partners\n' +
            '👤 **Profile** - View your player profile and statistics\n\n' +
            '**Need more help?** Contact your bridge club organizer.')
            .setColor(0x0099FF) // Blue color for info
            .setFooter({ text: 'Bridge Club Organizer Bot' })
            .setTimestamp();
        await interaction.editReply({ embeds: [embed] });
        await SupabaseClient_1.supabaseClient.logEvent('help_button_clicked', {
            userId: interaction.user.id,
            timestamp: new Date().toISOString()
        });
    }
    static async handleViewProfile(interaction) {
        await interaction.deferReply();
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle('👤 Player Profile')
            .setDescription('Profile functionality is coming soon! This will show your tournament history, partnership preferences, and statistics.')
            .setColor(0xFFA500) // Orange color for warning/coming soon
            .setFooter({ text: 'Bridge Club Organizer Bot' })
            .setTimestamp();
        await interaction.editReply({ embeds: [embed] });
        await SupabaseClient_1.supabaseClient.logEvent('profile_button_clicked', {
            userId: interaction.user.id,
            timestamp: new Date().toISOString()
        });
    }
}
exports.MainMenuHandler = MainMenuHandler;
