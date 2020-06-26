module.exports = {
	name: 'event-reload',
	description: 'Reloads an event.',
	ownerOnly: true,
	disabled: true,
	args: true,
	aliases: ['cmde'],
	usage: '[event name]',
	do: async (message, client, args) => {
		const eventName = args[0].toLowerCase();
		const event = client.events.get(eventName);

		if (!event) {
			return message.channel.send(`:x: There is no event named \`${eventName}\`!`);
		}

		delete require.cache[require.resolve(`../events/${eventName}.js`)];

		try {
			const newEvent = require(`../events/${eventName}.js`);
			client.commands.set(eventName, newEvent);
			message.channel.send(`:white_check_mark: Command \`${eventName}\` was reloaded!`);
		}
		catch (error) {
			console.log(error);
			message.channel.send(`:x: There was an error while reloading event \`${eventName}\`:\n\`\`\`js \n ${error.message}\`\`\``);
		}
	},
};