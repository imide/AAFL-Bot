"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
const discord_js_1 = require("discord.js");
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName('recruit')
    .setDescription('Recruit a free agent to your team.')
    .addUserOption((option) => option.setName('user').setDescription('User of the person to recruit.').setRequired(true))
    .addStringOption((option) => option
    .setName('team')
    .setDescription('Team to recruit')
    .setRequired(true)
    .addChoices({ name: 'Pittsburgh Steelers', value: 'Pittsburgh Steelers' }, { name: 'New Orleans Saints', value: 'New Orleans Saints' }, { name: 'Tampa Bay Buccaneers', value: 'Tampa Bay Buccaneers' }, { name: 'Buffalo Bills', value: 'Buffalo Bills' }, { name: 'Atlanta Falcons', value: 'Atlanta Falcons' }, { name: 'New England Patriots', value: 'New England Patriots' }, { name: 'Philadelphia Eagles', value: 'Philadelphia Eagles' }, { name: 'Kansas City Chiefs', value: 'Kansas City Chiefs' }, { name: 'Baltimore Ravens', value: 'Baltimore Ravens' }, { name: 'San Francisco 49ers', value: 'San Franciso 49ers' }, { name: 'Seattle Seahawks', value: 'Seattle Seahawks' }, { name: 'Tennessee Titans', value: 'Tennessee Titans' }));
async function execute(interaction) {
    if (interaction.inCachedGuild()) {
        const member = interaction.options.getMember('user');
        const teamName = interaction.options.getString('team');
        const guild = interaction.guild;
        const teamRole = guild.roles.cache.find((role) => role.name === teamName);
        const channel = member.user.dmChannel || (await member.user.createDM());
        const transactionsChannel = guild.channels.cache.find((c) => c.name === 'transactions');
        console.log(member, teamName);
        const userRecruitDM = new discord_js_1.EmbedBuilder()
            .setAuthor({
            name: 'AAFL Recruitment Manager',
            iconURL: 'https://cdn.discordapp.com/attachments/1008505934483558421/1094751459972743198/aafl_logo.png'
        })
            .setTitle('Offer received!')
            .setDescription(`You have been offered a spot on the **${teamName}** within the AAFL! To confirm the transaction, please click the button below. Otherwise, you can either ignore this message or click the deny button. \n\n **This offer will expire in 24 hours.**`)
            .setFooter({ text: 'AAFL Recruitment Manager' })
            .setColor(0x0099ff)
            .setTimestamp();
        const confirmedRecruitment = new discord_js_1.EmbedBuilder()
            .setAuthor({
            name: 'AAFL Recruitment Manager',
            iconURL: 'https://cdn.discordapp.com/attachments/1008505934483558421/1094751459972743198/aafl_logo.png'
        })
            .setTitle('Offer sent!')
            .setDescription(`You have offered a spot on the **${teamName}** to ${member}. They will be sent a message shortly.`)
            .setFooter({ text: 'AAFL Recruitment Manager' })
            .setColor(0x0099ff)
            .setTimestamp();
        const ownerRecruitConfirmed = new discord_js_1.EmbedBuilder()
            .setAuthor({
            name: 'AAFL Recruitment Manager',
            iconURL: 'https://cdn.discordapp.com/attachments/1008505934483558421/1094751459972743198/aafl_logo.png'
        })
            .setTitle('Offer accepted by user!')
            .setDescription(`Your offer to **${member}** for the team **${teamName}** was accepted by the user!`)
            .setFooter({ text: 'AAFL Recruitment Manager' })
            .setColor(0x0099ff)
            .setTimestamp();
        const userRecruitConfirmed = new discord_js_1.EmbedBuilder()
            .setAuthor({
            name: 'AAFL Recruitment Manager',
            iconURL: 'https://cdn.discordapp.com/attachments/1008505934483558421/1094751459972743198/aafl_logo.png'
        })
            .setTitle('Offer confirmed!')
            .setDescription(`You have confirmed your offer to join the **${teamName}**! You will be sent an invite link to the team server shortly. \n\n **Please do not block this bot from messaging you, just in case!**`);
        const error1 = new discord_js_1.EmbedBuilder()
            .setTitle('Error')
            .setColor('#ff0000')
            .setDescription('This user is already on a team. Check the players roles or initiate a trade.')
            .setTimestamp();
        const transactionConfirmed = new discord_js_1.EmbedBuilder()
            .setAuthor({
            name: `AAFL Transaction Manager`,
            iconURL: `https://cdn.discordapp.com/attachments/1008505934483558421/1094751459972743198/aafl_logo.png`
        })
            .setTitle(`Transaction Confirmed`)
            .setDescription(`**Transaction Notice** 
      **${teamName}** to recieve: **${member}** 
      **Total Players:** ${interaction.guild?.roles.cache.find((role) => role.name === teamName)?.members.size + 1}
      **Transaction Type:** \`Free Agent Recruitment\` 
      **Transaction Status:** \`Confirmed\``)
            .setColor(`#0099ff`)
            .setTimestamp();
        const button = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder().setCustomId('userRecruitConfirm').setLabel('Confirm').setStyle(discord_js_1.ButtonStyle.Success).setEmoji('✅'));
        if (member.roles.cache.some((role) => role.name === teamRole.name)) {
            await interaction.reply({ embeds: [error1], ephemeral: true });
        }
        else {
            await interaction.reply({ embeds: [confirmedRecruitment] });
            await member.send({ embeds: [userRecruitDM], components: [button] });
            const collector = channel.createMessageComponentCollector({
                time: 86400000
            });
            collector.on('collect', async (i) => {
                if (i.customId === 'userRecruitConfirm') {
                    await member.roles.add(teamRole);
                    await member.send({ embeds: [userRecruitConfirmed] });
                    await interaction.user.send({ embeds: [ownerRecruitConfirmed] });
                    await transactionsChannel.send({ embeds: [transactionConfirmed] });
                    await i.update({ content: `This offer has expired or was accepted by the user.`, components: [] });
                }
            });
            collector.on('end', async (collected) => {
                if (collected.size === 0) {
                    await member.send({
                        content: `This offer has expired or was accepted by the user.`,
                        components: []
                    });
                    void interaction.user.send({
                        content: `This offer has expired/was denied by the user.`
                    });
                }
            });
        }
    }
}
exports.execute = execute;
//# sourceMappingURL=recruit.js.map