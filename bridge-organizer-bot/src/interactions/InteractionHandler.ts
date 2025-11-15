import { Interaction } from 'discord.js';
import { MainMenuHandler } from './MainMenuHandler';
import { errorHandler } from '../utils/ErrorHandler';

export async function setupInteractionHandlers(interaction: Interaction) {
    if (!interaction.isButton()) {
        return;
    }

    try {
        switch (interaction.customId) {
            case 'show-main-menu':
                await MainMenuHandler.handleShowMainMenu(interaction);
                break;
            case 'register-player':
                await MainMenuHandler.handleRegisterPlayer(interaction);
                break;
            case 'view-help':
                await MainMenuHandler.handleViewHelp(interaction);
                break;
            case 'view-profile':
                await MainMenuHandler.handleViewProfile(interaction);
                break;
            default:
                await errorHandler.handleUnknownInteraction(interaction);
                break;
        }
    } catch (error) {
        console.error(`Error handling interaction ${interaction.customId}:`, error);
        await errorHandler.handleInteractionError(interaction, error);
    }
}