import { CommandInteraction, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('recruit')
    .setDescription('Recruit someone to your team.')
    .addUserOption(option => 
        option.setName('name')
        .setDescription('Name of the person to recruit.')
        .setRequired(true)
        )

    .addStringOption(option => 
        option.setName('Team')
        .setDescription('Team to recruit').setRequired(true)
        .addChoices(
            { name: 'steelers', value: 'steelers' },
            { name: 'saints', value: 'saints' },
            { name: 'buccaneers', value: 'bucs' },
            { name: 'bills', value: 'bills' },
            { name: 'falcons', value: 'falcons' },
            { name: 'patriots', value: 'patriots' },
            { name: 'eagles', value: 'eagles' },
            { name: 'chiefs', value: 'chiefs' },
            { name: 'ravens', value: 'ravens' },
            { name: '49ers', value: '49ers' },
            { name: 'seahawks', value: 'seahawks' },
            { name: 'titans', value: 'titans' },
        )
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles);
        
export async function execute(interaction: CommandInteraction) {
    
}
