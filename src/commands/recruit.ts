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
    const button = require(../)

    if (member.roles.cache.some((role: { name: string; }) => role.name === teamRole.name)) {
        const error1 = new EmbedBuilder()
        .setTitle('Error')
        .setColor('#ff0000')
        .setDescription('This user is already on a team. Check the players roles or initiate a trade.')
        .setTimestamp()
        await interaction.reply({ embeds: [error1], ephemeral: true })
    } else { 
        const success = new EmbedBuilder()
        .setTitle('Success')
        .setColor('#00ff00')
        .setDescription(`Requested the recruitment of ${member} to the ${teamName} for ${seasons} season/s. They are recieving their request now.`)
        .setTimestamp()
        await interaction.reply({ embeds: [success] })
        const request = new EmbedBuilder()
        .setTitle('Recruitment Request')   
        .setColor('#00ff00')
        .setDescription(`The coach of the ${teamName} is interested in recruiting you to their team! You can accept by clicking the button below.\n\n **This offer will expire in 24 hours.**`)
        .setFooter(content: `This request was sent on behalf of ${interaction.user.username}`, iconURL: `${interaction.user.avatarURL()}`)


    }


    
}
     