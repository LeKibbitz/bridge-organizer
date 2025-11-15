"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupInteractionHandlers = setupInteractionHandlers;
const MainMenuHandler_1 = require("./MainMenuHandler");
const ErrorHandler_1 = require("../utils/ErrorHandler");
async function setupInteractionHandlers(interaction) {
    if (!interaction.isButton()) {
        return;
    }
    try {
        switch (interaction.customId) {
            case 'show-main-menu':
                await MainMenuHandler_1.MainMenuHandler.handleShowMainMenu(interaction);
                break;
            case 'register-player':
                await MainMenuHandler_1.MainMenuHandler.handleRegisterPlayer(interaction);
                break;
            case 'view-help':
                await MainMenuHandler_1.MainMenuHandler.handleViewHelp(interaction);
                break;
            case 'view-profile':
                await MainMenuHandler_1.MainMenuHandler.handleViewProfile(interaction);
                break;
            default:
                await ErrorHandler_1.errorHandler.handleUnknownInteraction(interaction);
                break;
        }
    }
    catch (error) {
        console.error(`Error handling interaction ${interaction.customId}:`, error);
        await ErrorHandler_1.errorHandler.handleInteractionError(interaction, error);
    }
}
