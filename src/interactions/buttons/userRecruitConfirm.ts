import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events } from "discord.js";


export const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('userRecruitConfirm')
            .setLabel('Confirm Recruitment')
            .setStyle(ButtonStyle.Success)
            .setEmoji('✅')
    )

    
    
