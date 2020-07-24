import { Message, Client } from 'discord.js';

export default {
	name: 'prune',
	description: 'Prune up to 99 messages.',
	aliases: ['purge', 'delete', 'remove'],
	args: true,
	guildOnly: true,
	usage: '[number of messages]',
	permissions: ['MANAGE_MESSAGES'],
	cooldown: 10,
	do: async (message: Message, client: Client, args: string[]) => {
		if (!message.member.hasPermission('MANAGE_MESSAGES', { checkAdmin: true, checkOwner: true })) {
			return message.reply('you need the `Manage Messages` permission in order to use this command!');
		}
		const amount: number = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}
		try {
			message.channel.bulkDelete(amount, true);
			const sentMessage: Message = await message.channel.send(`✅ Pruned \`${amount - 1}\` messages.`);
			sentMessage.delete({ timeout: 5000 });
		}
		catch (error) {
			console.error(`Error pruning messages in #${message.channel.name} (${message.channel.id}) of ${message.guild.id}:\n`, error);
			message.reply(`❌ I encountered an error while trying to prune messages in this channel: \n\`\`\`${error.message}\`\`\``);
		}
	},
};