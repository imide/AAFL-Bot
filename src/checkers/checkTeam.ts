import { Guild } from 'discord.js';

export function checkTeam(guild: Guild, teamName: string) {
	const teamRole = guild.roles.cache.find((role) => role.name === teamName);
	if (teamRole) {
		return true;
	}
	return false;
}
