import { ButtonInteraction, User, Guild, TextChannel } from 'discord.js';

export class MockUser implements Partial<User> {
    id = '123456789';
    tag = 'TestUser#1234';
    username = 'TestUser';
    discriminator = '1234';
    bot = false;
}

export class MockGuild implements Partial<Guild> {
    id = '987654321';
    name = 'Test Guild';
}

export class MockChannel implements Partial<TextChannel> {
    id = '555666777';
    name = 'test-channel';
    type = 0; // TEXT_CHANNEL
}

export class MockButtonInteraction implements Partial<ButtonInteraction> {
    id = 'interaction_123';
    customId = 'test-button';
    user = new MockUser() as User;
    guild = new MockGuild() as Guild;
    channel = new MockChannel() as TextChannel;
    replied = false;
    deferred = false;

    async deferReply() {
        this.deferred = true;
        return Promise.resolve();
    }

    async reply(options: any) {
        this.replied = true;
        return Promise.resolve({} as any);
    }

    async editReply(options: any) {
        return Promise.resolve({} as any);
    }

    isButton() {
        return true;
    }
}

export const createMockButtonInteraction = (customId: string): MockButtonInteraction => {
    const interaction = new MockButtonInteraction();
    interaction.customId = customId;
    return interaction;
};