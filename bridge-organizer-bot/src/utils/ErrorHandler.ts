import {
    Interaction,
    ButtonInteraction,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} from 'discord.js';
import { supabaseClient } from '../services/SupabaseClient';

interface ErrorResponse {
    success: boolean;
    error: {
        code: string;
        message: string;
        userMessage: string;
    };
}

class ErrorHandlerService {
    private createErrorEmbed(userMessage: string, showRetry: boolean = true): EmbedBuilder {
        const embed = new EmbedBuilder()
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

    private createRetryButton(originalCustomId: string): ActionRowBuilder<ButtonBuilder> {
        return new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`retry-${originalCustomId}`)
                    .setLabel('🔄 Try Again')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('🔄'),
                new ButtonBuilder()
                    .setCustomId('show-main-menu')
                    .setLabel('🏠 Main Menu')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('🏠')
            );
    }

    async handleInteractionError(interaction: Interaction, error: any): Promise<void> {
        const errorResponse: ErrorResponse = {
            success: false,
            error: {
                code: 'INTERACTION_ERROR',
                message: error instanceof Error ? error.message : 'Unknown error occurred',
                userMessage: 'Something went wrong while processing your request. Please try again.'
            }
        };

        // Log the error
        await supabaseClient.logError(
            'interaction_handler',
            errorResponse.error.code,
            errorResponse.error.message,
            errorResponse.error.userMessage,
            {
                interactionType: interaction.type,
                interactionId: interaction.id,
                userId: interaction.user?.id,
                error: error instanceof Error ? error.stack : error
            },
            interaction.user?.id || 'unknown',
            'high'
        );

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
                } else {
                    await interaction.reply({
                        embeds: [embed],
                        components,
                        ephemeral: true
                    });
                }
            }
        } catch (responseError) {
            console.error('Failed to send error response:', responseError);
        }
    }

    async handleUnknownInteraction(interaction: ButtonInteraction): Promise<void> {
        const errorResponse: ErrorResponse = {
            success: false,
            error: {
                code: 'UNKNOWN_INTERACTION',
                message: `Unknown button interaction: ${interaction.customId}`,
                userMessage: 'This button is not recognized. Please try using the main menu.'
            }
        };

        await supabaseClient.logError(
            'interaction_handler',
            errorResponse.error.code,
            errorResponse.error.message,
            errorResponse.error.userMessage,
            {
                customId: interaction.customId,
                userId: interaction.user.id
            },
            interaction.user.id,
            'medium'
        );

        const embed = this.createErrorEmbed(errorResponse.error.userMessage);
        const components = [this.createRetryButton('show-main-menu')];

        if (interaction.replied || interaction.deferred) {
            await interaction.editReply({
                embeds: [embed],
                components
            });
        } else {
            await interaction.reply({
                embeds: [embed],
                components,
                ephemeral: true
            });
        }
    }

    createStandardErrorResponse(code: string, technicalMessage: string, userMessage: string): ErrorResponse {
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

export const errorHandler = new ErrorHandlerService();