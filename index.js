const { REST } = require('@discordjs/rest');  // elleme - don't touch here
const { Routes } = require('discord-api-types/v9');  // elleme - don't touch here
const fs = require('fs');
const { Client, Collection } = require('discord.js');
const client = new Client({ 
  intents: [
		1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384,
	]
});  // elleme - don't touch here
const discordModals = require('discord-modals');
discordModals(client);
client._cmd = new Collection();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
const clientId = 'bot id';
const guildId = 'sunucu id';

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push({
    name: command.name,
    description: command.description,
    options: command.options || [],
    type: 1
  });
  client._cmd.set(command.name, command)
}

client.on('ready', (ready) => {
  client.user.setPresence("Summer Developers - discord.gg/developers")
})
const rest = new REST({ version: '9' }).setToken(process.env.token);

(async () => {
	try {
		console.log('[SUMMER-DEVS] Komutlar yükleniyor. / All commands loading.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('[SUMMER-DEVS] Komutlar yüklendi. / All commands loaded.');
	} catch (error) {
		console.error(error);
	}
})();

client.on('interactionCreate', (interaction) => {
  const cmd = client._cmd.get(interaction.commandName);
  try {
    cmd.exe(client, interaction);
  } catch (e) {
    return;
  }
});

client.on('modalSubmit', async (modal) => {
  const send = async (log, options) => modal.guild.channels.cache.get(log).send(options);
  if(modal.customId === 'kayit') {
    const isim = modal.getTextInputValue('isim'); // elleme - don't touch here
    const yaş = modal.getTextInputValue('yaş'); // elleme - don't touch here
    const cinsiyet = modal.getTextInputValue('cinsiyet'); // elleme - don't touch here
    if (cinsiyet == "Erkek") {
      modal.member.setNickname(`* ${isim} - ${yaş}`);
      await modal.member.roles.add('erkek rol id');
      await modal.reply({ content: `:white_check_mark: ${cinsiyet} olarak kayıt oldun... / You are registered as ${cinsiyet}...`, ephemeral: true });
      await send('946445358375010317', {
        content: `:star2: **${modal.user.tag}**, **${cinsiyet}** olarak kayıt oldu! (İsim: **${isim}**, Yaş: **${yaş}**)\n:star2: **${modal.user.tag}** was registered as **${cinsiyet}**! (Name: **${isim}**, Age: **${yaş}**)`
      });
    } else if (cinsiyet == "Kadın") {
      modal.member.setNickname(`* ${isim} - ${yaş}`);
      await modal.member.roles.add('kadın rol id');
      await modal.reply({ content: `:white_check_mark: ${cinsiyet} olarak kayıt oldun... / You are registered as ${cinsiyet}...`, ephemeral: true });
      await send('946445358375010317', {
        content: `:star2: **${modal.user.tag}**, **${cinsiyet}** olarak kayıt oldu! (İsim: **${isim}**, Yaş: **${yaş}**)\n:star2: **${modal.user.tag}** was registered as **${cinsiyet}**! (Name: **${isim}**, Age: **${yaş}**)`
      });
    } else if (cinsiyet == "Diğer") {
      modal.member.setNickname(`* ${isim} - ${yaş}`);
      await modal.member.roles.add('diğer rol id');
      await modal.reply({ content: `:white_check_mark: ${cinsiyet} olarak kayıt oldun... / You are registered as ${cinsiyet}...`, ephemeral: true });
      await send('946445358375010317', {
        content: `:star2: **${modal.user.tag}**, **${cinsiyet}** olarak kayıt oldu! (İsim: **${isim}**, Yaş: **${yaş}**)\n:star2: **${modal.user.tag}** was registered as **${cinsiyet}**! (Name: **${isim}**, Age: **${yaş}**)`
      });
    } else if (cinsiyet == "Male") {
      modal.member.setNickname(`* ${isim} - ${yaş}`);
      await modal.member.roles.add('male role id');
      await modal.reply({ content: `:white_check_mark: ${cinsiyet} olarak kayıt oldun... / You are registered as ${cinsiyet}...`, ephemeral: true });
await send('946445358375010317', {
        content: `:star2: **${modal.user.tag}**, **${cinsiyet}** olarak kayıt oldu! (İsim: **${isim}**, Yaş: **${yaş}**)\n:star2: **${modal.user.tag}** was registered as **${cinsiyet}**! (Name: **${isim}**, Age: **${yaş}**)`
      });
    } else if (cinsiyet == "Female") {
      modal.member.setNickname(`* ${isim} - ${yaş}`);
      await modal.member.roles.add('female role id');
      await modal.reply({ content: `:white_check_mark: ${cinsiyet} olarak kayıt oldun... / You are registered as ${cinsiyet}...`, ephemeral: true });
      await send('946445358375010317', {
        content: `:star2: **${modal.user.tag}**, **${cinsiyet}** olarak kayıt oldu! (İsim: **${isim}**, Yaş: **${yaş}**)\n:star2: **${modal.user.tag}** was registered as **${cinsiyet}**! (Name: **${isim}**, Age: **${yaş}**)`
      });
    } else if (cinsiyet == "Other") {
      modal.member.setNickname(`* ${isim} - ${yaş}`);
      await modal.member.roles.add('other role id');
      await modal.reply({ content: `:white_check_mark: ${cinsiyet} olarak kayıt oldun... / You are registered as ${cinsiyet}...`, ephemeral: true })
      await send('946445358375010317', {
        content: `:star2: **${modal.user.tag}**, **${cinsiyet}** olarak kayıt oldu! (İsim: **${isim}**, Yaş: **${yaş}**)\n:star2: **${modal.user.tag}** was registered as **${cinsiyet}**! (Name: **${isim}**, Age: **${yaş}**)`
      });
    }
  }  
});

client.login("token");