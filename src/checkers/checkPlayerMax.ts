import { Guild } from 'discord.js';
import { checkTeam } from './checkTeam';

export function checkPlayerMax(guild: Guild, teamName: string) {
	if (checkTeam(guild, teamName)) {
		const teamRole = guild.roles.cache.find((role) => role.name === teamName);
		if (teamRole) {
			if (teamRole.members.size < 12) {
				return true;
			}
			return false;
		}
		return false;
	}
	return false;
}
