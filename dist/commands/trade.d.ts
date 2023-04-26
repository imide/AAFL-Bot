import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
export declare const data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
export declare function execute(interaction: ChatInputCommandInteraction): Promise<import("discord.js").InteractionResponse<boolean> | undefined>;
//# sourceMappingURL=trade.d.ts.map