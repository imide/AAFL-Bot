import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, Guild } from "discord.js"

export const data = new SlashCommandBuilder()
    .setName('recruit')
    .setDescription('Recruit a free agent to your team.')
    .addUserOption(option => 
        option.setName('user')
        .setDescription('User of the person to recruit.')
        .setRequired(true)
        )

    .addStringOption(option => 
        option.setName('team')
        .setDescription('Team to recruit')
        .setRequired(true)
        .addChoices(
            { name: 'Pittsburgh Steelers', value: 'steelers' },
            { name: 'New Orleans Saints', value: 'saints' },
            { name: 'Tampa Bay Buccaneers', value: 'bucs' },
            { name: 'Buffalo Bills', value: 'bills' },
            { name: 'Atlanta Falcons', value: 'falcons' },
            { name: 'New England Patriots', value: 'patriots' },
            { name: 'Philadelphia Eagles', value: 'eagles' },
            { name: 'Kansas City Chiefs', value: 'chiefs' },
            { name: 'Baltimore Ravens', value: 'ravens' },
            { name: 'San Francisco 49ers', value: '49ers' },
            { name: 'Seattle Seahawks', value: 'seahawks' },
            { name: 'Tennessee Titans', value: 'titans' },
        ))

    .addNumberOption(option =>
        option.setName('seasons')
        .setDescription('The number of seasons to recruit the player for.')
        .setRequired(true)
        .setAutocomplete(true)
        )


export async function execute(interaction: ChatInputCommandInteraction) {
    const member = interaction.options.getMember('user')!;
    const teamName = interaction.options.getString('team')!;
    const seasons = interaction.options.getNumber('seasons')!;
    const guild = interaction.guild!;
    const teamRole = guild.roles.cache.find(role => role.name === teamName)!;

    if (member.roles.cache.some((role: { name: string; }) => role.name === teamRole.name)) {
        const error1 = new EmbedBuilder()
        .setTitle('Error')
        .setColor('#ff0000')
        .setDescription('This user is already on a team. Check the players roles or initiate a trade.')
        .setTimestamp()
        await interaction.reply({ embeds: [error1], ephemeral: true })
    }

    
}
     