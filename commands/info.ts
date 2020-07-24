import * as humanizeDuration from 'humanize-duration';
import { botOwner } from '../botconfig.js';
import { version, repository } from '../package.json';
import { Message, Client, User } from 'discord.js';

export default {
	name: 'info',
	description: 'Displays information about the bot.',
	aliases: ['information'],
	permissions: ['EMBED_LINKS'],
	cooldown: 5,
	do: async (message: Message, client: Client, args: string[], Discord: typeof import('discord.js')) => {
		const developer: User = await client.users.cache.get(botOwner);

		const embed = new Discord.MessageEmbed()
			.setColor('#6293f5')
			.setThumbnail(client.user.displayAvatarURL({ format: 'png' }))
			.setTitle(`${client.user.username} Information`)
			.addFields(
				{ name: 'Developer', value: `${developer.tag} (${developer.id})` },
				{ name: 'Version', value: version, inline: true },
				{ name: 'Library', value: `discord.js v${Discord.version}`, inline: true },
				{ name: 'Number of commands', value: client.commands.size, inline: true },
				{ name: 'GitHub Repository', value: repository, inline: true },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Server Count', value: client.guilds.cache.size, inline: true },
				{ name: 'Total Members', value: client.users.cache.size, inline: true },
				{ name: 'Uptime', value: humanizeDuration(client.uptime) },
			)
			.setTimestamp();
		message.channel.send(embed);
	},
};