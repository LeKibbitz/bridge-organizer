"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainMenu = void 0;
const discord_js_1 = require("discord.js");
class MainMenu {
    static createMenu() {
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle('🌉 Bridge Club Organizer')
            .setDescription('Welcome to the Bridge Club organizing system! Choose an option below to get started.')
            .setColor(0x00AE86) // Green color for success/welcome
            .setFooter({ text: 'Bridge Club Organizer Bot' })
            .setTimestamp();
        const buttons = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setCustomId('register-player')
            .setLabel('📝 Register')
            .setStyle(discord_js_1.ButtonStyle.Primary)
            .setEmoji('📝'), new discord_js_1.ButtonBuilder()
            .setCustomId('view-help')
            .setLabel('❓ Help')
            .setStyle(discord_js_1.ButtonStyle.Secondary)
            .setEmoji('❓'), new discord_js_1.ButtonBuilder()
            .setCustomId('view-profile')
            .setLabel('👤 Profile')
            .setStyle(discord_js_1.ButtonStyle.Secondary)
            .setEmoji('👤'));
        return {
            embeds: [embed],
            components: [buttons],
            ephemeral: false
        };
    }
    static createWelcomeMessage() {
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle('🌉 Welcome to Bridge Club!')
            .setDescription('Click below to access the main menu and get started.')
            .setColor(0x0099FF) // Blue color for loading/info
            .setFooter({ text: 'Bridge Club Organizer Bot' })
            .setTimestamp();
        const button = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setCustomId('show-main-menu')
            .setLabel('🏠 Show Menu')
            .setStyle(discord_js_1.ButtonStyle.Success)
            .setEmoji('🏠'));
        return {
            embeds: [embed],
            components: [button],
            ephemeral: false
        };
    }
}
exports.MainMenu = MainMenu;
