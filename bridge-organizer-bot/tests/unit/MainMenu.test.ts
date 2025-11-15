import { MainMenu } from '../../src/menus/MainMenu';

describe('MainMenu', () => {
    test('should create main menu with correct structure', () => {
        const menu = MainMenu.createMenu();

        expect(menu.embeds).toHaveLength(1);
        expect(menu.components).toHaveLength(1);
        expect(menu.ephemeral).toBe(false);

        const embed = menu.embeds[0];
        expect(embed.data.title).toBe('🌉 Bridge Club Organizer');
        expect(embed.data.color).toBe(0x00AE86);
    });

    test('should create welcome message with correct structure', () => {
        const welcome = MainMenu.createWelcomeMessage();

        expect(welcome.embeds).toHaveLength(1);
        expect(welcome.components).toHaveLength(1);
        expect(welcome.ephemeral).toBe(false);

        const embed = welcome.embeds[0];
        expect(embed.data.title).toBe('🌉 Welcome to Bridge Club!');
        expect(embed.data.color).toBe(0x0099FF);
    });

    test('should include all required buttons in main menu', () => {
        const menu = MainMenu.createMenu();
        const actionRow = menu.components[0];

        expect(actionRow.components).toHaveLength(3);

        const buttons = actionRow.components;
        expect(buttons[0].data.custom_id).toBe('register-player');
        expect(buttons[1].data.custom_id).toBe('view-help');
        expect(buttons[2].data.custom_id).toBe('view-profile');
    });

    test('should use kebab-case for button IDs', () => {
        const menu = MainMenu.createMenu();
        const actionRow = menu.components[0];
        const buttons = actionRow.components;

        buttons.forEach(button => {
            expect(button.data.custom_id).toMatch(/^[a-z]+(-[a-z]+)*$/);
        });
    });
});