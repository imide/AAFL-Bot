/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import {
	SlashCommandBuilder,
	ChatInputCommandInteraction,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	TextChannel
} from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('trade')
	.setDescription('Trade a player to another team.')
	.addUserOption((option) => option.setName('user').setDescription('User of the person to trade. (your player)').setRequired(true))
	.addUserOption((option) => option.setName('user2').setDescription("User of the person to trade. (other team's player)").setRequired(true))
	.addStringOption((option) =>
		option.setName('team').setDescription('Team to trade with.').setRequired(true).addChoices(
			{
				name: 'Pittsburgh Steelers',
				value: 'Pittsburgh Steelers'
			},
			{
				name: 'New Orleans Saints',
				value: 'New Orleans Saints'
			},
			{
				name: 'Tampa Bay Buccaneers',
				value: 'Tampa Bay Buccaneers'
			},
			{
				name: 'Buffalo Bills',
				value: 'Buffalo Bills'
			},
			{
				name: 'Atlanta Falcons',
				value: 'Atlanta Falcons'
			},
			{
				name: 'New England Patriots',
				value: 'New England Patriots'
			},
			{
				name: 'Philadelphia Eagles',
				value: 'Philadelphia Eagles'
			},
			{
				name: 'Kansas City Chiefs',
				value: 'Kansas City Chiefs'
			},
			{
				name: 'Baltimore Ravens',
				value: 'Baltimore Ravens'
			},
			{
				name: 'San Francisco 49ers',
				value: 'San Franciso 49ers'
			},
			{
				name: 'Seattle Seahawks',
				value: 'Seattle Seahawks'
			},
			{
				name: 'Tennessee Titans',
				value: 'Tennessee Titans'
			}
		)
	);

export async function execute(interaction: ChatInputCommandInteraction) {
	if (interaction.inCachedGuild()) {
		const player1 = interaction.options.getMember('user')!;
		const player2 = interaction.options.getMember('user2')!;
		const teamOwnerInit = interaction.member!;
		const teamName2 = interaction.options.getString('team')!;
		const teamName1 = teamOwnerInit.roles.cache.some((role) => role.name === 'Pittsburgh Steelers')
			? 'Pittsburgh Steelers'
			: teamOwnerInit.roles.cache.some((role) => role.name === 'New Orleans Saints')
			? 'New Orleans Saints'
			: teamOwnerInit.roles.cache.some((role) => role.name === 'Tampa Bay Buccaneers')
			? 'Tampa Bay Buccaneers'
			: teamOwnerInit.roles.cache.some((role) => role.name === 'Buffalo Bills')
			? 'Buffalo Bills'
			: teamOwnerInit.roles.cache.some((role) => role.name === 'Atlanta Falcons')
			? 'Atlanta Falcons'
			: teamOwnerInit.roles.cache.some((role) => role.name === 'New England Patriots')
			? 'New England Patriots'
			: teamOwnerInit.roles.cache.some((role) => role.name === 'Philadelphia Eagles')
			? 'Philadelphia Eagles'
			: teamOwnerInit.roles.cache.some((role) => role.name === 'Kansas City Chiefs')
			? 'Kansas City Chiefs'
			: teamOwnerInit.roles.cache.some((role) => role.name === 'Baltimore Ravens')
			? 'Baltimore Ravens'
			: teamOwnerInit.roles.cache.some((role) => role.name === 'San Francisco 49ers')
			? 'San Francisco 49ers'
			: teamOwnerInit.roles.cache.some((role) => role.name === 'Seattle Seahawks')
			? 'Seattle Seahawks'
			: teamOwnerInit.roles.cache.some((role) => role.name === 'Tennessee Titans')
			? 'Tennessee Titans'
			: 'Administrative Team';
		const guild = interaction.guild!;
		const teamRole = guild.roles.cache.find((role) => role.name === teamName2)!;
		const teamOwnerReq =
			guild.members.cache.find((member) => member.roles.cache.has(teamRole.id)) &&
			guild.members.cache.find((member) => member.roles.cache.has('Team Owner'))!;
		const channel = teamOwnerReq!.dmChannel || (await teamOwnerReq!.createDM());
		const transactionsChannel = guild.channels.cache.find((c) => c.name === 'transactions') as TextChannel;

		const ownerTradeDM = new EmbedBuilder()
			.setAuthor({
				name: 'AAFL Transaction Manager',
				iconURL: 'https://cdn.discordapp.com/attachments/1008505934483558421/1094751459972743198/aafl_logo.png'
			})
			.setTitle('Trade Offer Received!')
			.setDescription(
				`**${teamOwnerInit.user.username}** of the **${teamName1}** has offered to trade **${player1.user.username}** to your team for **${player2.user.username}**. \n\n You can contact the owner of the **${teamName1}** to discuss the trade, or accept it right now. \n\n **Note:** If you accept this trade, you will be unable to reverse it. This trade request will expire in 48 hours.`
			)
			.setTimestamp()
			.setFooter({
				text: 'AAFL Transaction Manager'
			});

		const ownerTradeDMRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
			new ButtonBuilder().setCustomId('acceptTrade').setLabel('Accept Trade').setStyle(ButtonStyle.Success).setEmoji('✅'),
			new ButtonBuilder().setCustomId('denyTrade').setLabel('Deny Trade').setStyle(ButtonStyle.Danger).setEmoji('❌')
		);

		const transactionEmbed = new EmbedBuilder()
			.setAuthor({
				name: 'AAFL Transaction Manager',
				iconURL: 'https://cdn.discordapp.com/attachments/1008505934483558421/1094751459972743198/aafl_logo.png'
			})
			.setTitle('Trade Confirmed')
			.setDescription(
				`**Trade Notice** 
    \n
    **${teamName1}** to recieve: **${player2}** 
    
      **${teamName2}** to recieve: **${player1}**
      
    **Total Players:** (${teamName1}) ${interaction.guild?.roles.cache.find((role) => role.name === teamName1)?.members.size! + 1}
    **Total Players:** (${teamName2}) ${interaction.guild?.roles.cache.find((role) => role.name === teamName2)?.members.size! + 1}
    **Transaction Type:** \`Player Trade\` 
    
    **Transaction Status:** \`Confirmed\``
			)
			.setColor(`#0099ff`)
			.setTimestamp()
			.setFooter({
				text: `Trade initiated by ${teamName1}. Automatically generated.`
			});

		if (teamName1 === teamName2) {
			return interaction.reply({
				content: 'You cannot trade with your own team.',
				ephemeral: true
			});
		} else if (teamName1 !== teamName2) {
			await interaction.reply({
				content: `Trade offer sent to **${teamName2}** owner.`,
				ephemeral: true
			});
			await channel.send({
				embeds: [ownerTradeDM],
				components: [ownerTradeDMRow]
			});
			const collector = channel.createMessageComponentCollector({
				time: 172800000
			});
			collector.on('end', async (_i) => {
				await channel.send({
					content: `Trade offer expired.`,
					embeds: [],
					components: []
				});
			});
			collector.on('collect', async (i) => {
				if (i.customId === 'acceptTrade') {
					await i.deferUpdate();
					await i.user.send({
						content: `Trade accepted!`,
						embeds: []
					});
					await transactionsChannel.send({
						embeds: [transactionEmbed]
					});
					await player1.roles.remove(teamRole);
					await player2.roles.add(teamRole);
					await player2.roles.remove(teamRole);
					await player1.roles.add(teamRole);
				} else if (i.customId === 'denyTrade') {
					await i.deferUpdate();
					await i.editReply({
						content: `Trade denied!`,
						embeds: [],
						components: []
					});
				}
			});
		}
	} else {
		return interaction.reply({
			content: 'An unknown error occured.',
			ephemeral: true
		});
	}
}
