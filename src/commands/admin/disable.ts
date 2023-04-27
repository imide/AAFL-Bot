import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('disable')
	.setDescription('Disables the bot for whatever reason.')
	.addBooleanOption((option) =>
		option.setName('disable').setDescription('Set to true to disable the bot. **Only use this in emergencies!**').setRequired(true)
	)
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
