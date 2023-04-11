import { SlashCommandBuilder } from "discord.js"

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
        )
    .addNumberOption(option =>
        option.setName('seasons')
        .setDescription('The number of seasons to recruit the player for.')
        )
        )
     