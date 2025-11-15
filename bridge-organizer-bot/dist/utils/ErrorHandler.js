"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const discord_js_1 = require("discord.js");
const SupabaseClient_1 = require("../services/SupabaseClient");
class ErrorHandlerService {
    createErrorEmbed(userMessage, showRetry = true) {
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle('❌ Error')
            .setDescription(userMessage)
            .setColor(0xFF0000) // Red color for errors
            .setFooter({ text: 'Bridge Club Organizer Bot' })
            .setTimestamp();
        if (showRetry) {
            embed.addFields({
                name: '🔄 Next Steps',
                value: 'Click "Try Again" below or contact your bridge club organizer if the problem persists.',
            });
        }
        return embed;
    }
    createRetryButton(originalCustomId) {
        return new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setCustomId(`retry-${originalCustomId}`)
            .setLabel('🔄 Try Again')
            .setStyle(discord_js_1.ButtonStyle.Primary)
            .setEmoji('🔄'), new discord_js_1.ButtonBuilder()
            .setCustomId('show-main-menu')
            .setLabel('🏠 Main Menu')
            .setStyle(discord_js_1.ButtonStyle.Secondary)
            .setEmoji('🏠'));
    }
    async handleInteractionError(interaction, error) {
        const errorResponse = {
            success: false,
            error: {
                code: 'INTERACTION_ERROR',
                message: error instanceof Error ? error.message : 'Unknown error occurred',
                userMessage: 'Something went wrong while processing your request. Please try again.'
            }
        };
        // Log the error
        await SupabaseClient_1.supabaseClient.logError('interaction_handler', errorResponse.error.code, errorResponse.error.message, errorResponse.error.userMessage, {
            interactionType: interaction.type,
            interactionId: interaction.id,
            userId: interaction.user?.id,
            error: error instanceof Error ? error.stack : error
        }, interaction.user?.id || 'unknown', 'high');
        // Try to respond to the interaction
        try {
            if (interaction.isButton()) {
                const embed = this.createErrorEmbed(errorResponse.error.userMessage);
                const components = [this.createRetryButton(interaction.customId)];
                if (interaction.replied || interaction.deferred) {
                    await interaction.editReply({
                        embeds: [embed],
                        components
                    });
                }
                else {
                    await interaction.reply({
                        embeds: [embed],
                        components,
                        ephemeral: true
                    });
                }
            }
        }
        catch (responseError) {
            console.error('Failed to send error response:', responseError);
        }
    }
    async handleUnknownInteraction(interaction) {
        const errorResponse = {
            success: false,
            error: {
                code: 'UNKNOWN_INTERACTION',
                message: `Unknown button interaction: ${interaction.customId}`,
                userMessage: 'This button is not recognized. Please try using the main menu.'
            }
        };
        await SupabaseClient_1.supabaseClient.logError('interaction_handler', errorResponse.error.code, errorResponse.error.message, errorResponse.error.userMessage, {
            customId: interaction.customId,
            userId: interaction.user.id
        }, interaction.user.id, 'medium');
        const embed = this.createErrorEmbed(errorResponse.error.userMessage);
        const components = [this.createRetryButton('show-main-menu')];
        if (interaction.replied || interaction.deferred) {
            await interaction.editReply({
                embeds: [embed],
                components
            });
        }
        else {
            await interaction.reply({
                embeds: [embed],
                components,
                ephemeral: true
            });
        }
    }
    createStandardErrorResponse(code, technicalMessage, userMessage) {
        return {
            success: false,
            error: {
                code,
                message: technicalMessage,
                userMessage
            }
        };
    }
}
exports.errorHandler = new ErrorHandlerService();
