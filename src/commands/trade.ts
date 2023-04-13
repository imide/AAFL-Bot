import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    TextChannel,
  } from "discord.js";

    export const data = new SlashCommandBuilder()
        .setName("trade")
        .setDescription("Trade a player to another team.")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("User of the person to trade. (your teammate)")
                .setRequired(true)
        )
        .addUserOption((option) =>
            option
                .setName("user2")
                .setDescription("User of the person to trade. (other team's player)")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("team")
                .setDescription("Team to trade with.")
                .setRequired(true)
                .addChoices(
                    { name: "Pittsburgh Steelers", value: "Pittsburgh Steelers" },
                    { name: "New Orleans Saints", value: "New Orleans Saints" },
                    { name: "Tampa Bay Buccaneers", value: "Tampa Bay Buccaneers" },
                    { name: "Buffalo Bills", value: "Buffalo Bills" },
                    { name: "Atlanta Falcons", value: "Atlanta Falcons" },
                    { name: "New England Patriots", value: "New England Patriots" },
                    { name: "Philadelphia Eagles", value: "Philadelphia Eagles" },
                    { name: "Kansas City Chiefs", value: "Kansas City Chiefs" },
                    { name: "Baltimore Ravens", value: "Baltimore Ravens" },
                    { name: "San Francisco 49ers", value: "San Franciso 49ers" },
                    { name: "Seattle Seahawks", value: "Seattle Seahawks" },
                    { name: "Tennessee Titans", value: "Tennessee Titans" }
                )
        )

    export async function execute(interaction: ChatInputCommandInteraction) {
        if (interaction.inCachedGuild()) {
            const player1 = interaction.options.getMember("user")!;
            const player2 = interaction.options.getMember("user2")!;
            const teamOwnerInit = interaction.member!;
            const teamName = interaction.options.getString("team")!;
            const guild = interaction.guild!;
            const teamRole = guild.roles.cache.find((role) => role.name === teamName)!;
            const teamOwnerReq = guild.members.cache.find((member) => member.roles.cache.has(teamRole.id)) && guild.members.cache.find((member) => member.roles.cache.has('Team Owner'))!;
            const channel = teamOwnerReq!.user.dmChannel || (await teamOwnerReq!.user.createDM());
            const transactionsChannel = guild.channels.cache.find(c => c.name === "transactions") as TextChannel;

         
            



            const ownerTradeDM = new EmbedBuilder()
                .setAuthor({ name: "AAFL Transaction Manager", iconURL: "https://cdn.discordapp.com/attachments/1008505934483558421/1094751459972743198/aafl_logo.png" })
                .setTitle("Trade Offer Received!")
                .setDescription(`**${teamOwnerInit.user.username}** of the **${teamName}** has offered to trade **${player1.user.username}** to your team for **${player2.user.username}**. \n\n You can contact the owner of the **${teamName}** to discuss the trade, or accept it right now. \n\n **Note:** If you accept this trade, you will be unable to reverse it. This trade request will expire in 48 hours.`)
                .setTimestamp()
                .setFooter({ text: "AAFL Transaction Manager" });

            const ownerTradeDMRow = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("acceptTrade")
                        .setLabel("Accept Trade")
                        .setStyle(ButtonStyle.Success)
                        .setEmoji("✅"),
                )
            
        
                




        }
}           