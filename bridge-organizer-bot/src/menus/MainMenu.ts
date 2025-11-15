import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';

export class MainMenu {
    static createMenu() {
        const embed = new EmbedBuilder()
            .setTitle('🌉 Bridge Club Organizer')
            .setDescription('Welcome to the Bridge Club organizing system! Choose an option below to get started.')
            .setColor(0x00AE86) // Green color for success/welcome
            .setFooter({ text: 'Bridge Club Organizer Bot' })
            .setTimestamp();

        const buttons = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('register-player')
                    .setLabel('📝 Register')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('📝'),
                new ButtonBuilder()
                    .setCustomId('view-help')
                    .setLabel('❓ Help')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('❓'),
                new ButtonBuilder()
                    .setCustomId('view-profile')
                    .setLabel('👤 Profile')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('👤')
            );

        return {
            embeds: [embed],
            components: [buttons],
            ephemeral: false
        };
    }

    static createWelcomeMessage() {
        const embed = new EmbedBuilder()
            .setTitle('🌉 Welcome to Bridge Club!')
            .setDescription('Click below to access the main menu and get started.')
            .setColor(0x0099FF) // Blue color for loading/info
            .setFooter({ text: 'Bridge Club Organizer Bot' })
            .setTimestamp();

        const button = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('show-main-menu')
                    .setLabel('🏠 Show Menu')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('🏠')
            );

        return {
            embeds: [embed],
            components: [button],
            ephemeral: false
        };
    }
}