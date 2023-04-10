import { CommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, Client, GuildMemberManager, Collector, DMChannel } from 'discord.js';


export const data = new SlashCommandBuilder()
    .setName('recruit')
    .setDescription('Recruit someone to your team.')
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
        )
        )
        .addStringOption(option =>
            option.setName('invite_link')
            .setDescription('Discord invite link to team server.')
            .setRequired(true)
            )
            .addRoleOption(option =>
                option.setName('team_role')
                .setDescription('The recruiting team role to assign to the user.')	
                .setRequired(true)
            
                )
                

        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles);

   

export async function execute(interaction: { options: { getUser: (arg0: string) => any; getString: (arg0: string) => any; getRole: (arg0: string) => any; }; reply: (arg0: { embeds: any[]; ephemeral: boolean; }) => void; }, client: Client) {

    const member = interaction.options.getUser('user');
    const team = interaction.options.get('team');
    const invite = interaction.options.getString('invite_link')
    const teamRole = interaction.options.getRole('team_role')
    const button = require('../interactions/buttons/userRecruitConfirm');
    const channel = await member.createDM(); 
    

    const userRecruitDM = new EmbedBuilder()
    .setAuthor({ name: 'AAFL Recruitment Manager', iconURL: 'https://cdn.discordapp.com/attachments/1008505934483558421/1094751459972743198/aafl_logo.png' })
    .setTitle('Offer received!')
    .setDescription(`You have been offered a spot on the **${team.name}** within the AAFL! To confirm the transaction, please click the button below. Otherwise, you can either ignore this message or click the deny button. \n\n **This offer will expire in 24 hours.**`)
    .setFooter({ text: 'AAFL Recruitment Manager' })
    .setColor(0x0099FF)
    .setTimestamp();
    const confirmedRecruitment = new EmbedBuilder()
    .setAuthor({ name: 'AAFL Recruitment Manager', iconURL: 'https://cdn.discordapp.com/attachments/1008505934483558421/1094751459972743198/aafl_logo.png' })
    .setTitle('Offer sent!')
    .setDescription(`You have offered a spot on the **${team.name}** to ${member.username}. They will be sent a message shortly.`)
    .setFooter({ text: 'AAFL Recruitment Manager' })
    .setColor(0x0099FF)
    .setTimestamp();

    const userRecruitConfirmed = new EmbedBuilder()
    .setAuthor({ name: 'AAFL Recruitment Manager', iconURL: 'https://cdn.discordapp.com/attachments/1008505934483558421/1094751459972743198/aafl_logo.png' })
    .setTitle('Offer confirmed!')
    .setDescription(`You have confirmed your offer to join the **${team.name}**! You will be sent an invite link to the team server shortly. \n\n **Please screenshot this message and send the image to your coach.**`)

    //: Responses 
    const filter = (i: { customId: string; user: { id: any; }; }) => i.customId === 'userRecruitConfirm' && i.user.id === member.id;
    const collector = channel.createMessageComponentCollector({ filter, time: 864000 });

    await member.send({ embeds: [userRecruitDM], components: [button.button] });
    await interaction.reply({ embeds: [confirmedRecruitment], ephemeral: true });   
   
    collector.on('collect', async (i: { update: (arg0: { embeds: EmbedBuilder[]; components: never[]; }) => any; }) => {
        await i.update ({ embeds: [userRecruitConfirmed], components: [] });
        await member.roles.add(teamRole);
        await member.send(`Here is your invite link to the ${team.name} server: ${invite}`);
    });
}