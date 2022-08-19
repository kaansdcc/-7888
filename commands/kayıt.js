const { Modal, TextInputComponent, showModal } = require('discord-modals')

module.exports = {
  name: "kayıt",
  description: "Kaydolabilirsin. / You can register.",
  options: [],
  async exe(client, interaction) {
    const member = (rol) => interaction.member.roles.cache.has(rol);  // elleme - don't touch here
    if (member('946435891050709053') || member('946445539837353995') || member('946448115592994827')) {
      return interaction.reply({
        content: ":x: Sen zaten kayıt olmuşsun! / You already registered!",
        ephemeral: true
      })
    } else {
      const modal = new Modal()
      .setCustomId('kayit')
      .setTitle('Kayıt Menüsü / Register Menu')
      .addComponents(
        new TextInputComponent()
        .setCustomId('isim')
        .setLabel('İsmin nedir? / What is your name?')
        .setStyle('SHORT')
        .setMinLength(2)
        .setMaxLength(32)
        .setPlaceholder('Lütfen buraya yazın. / Please type here.')
        .setRequired(true),
        new TextInputComponent()
        .setCustomId('yaş')
        .setLabel('Kaç yaşındasın? / How old are you?')
        .setStyle('SHORT')
        .setMinLength(1)
        .setMaxLength(3)
        .setPlaceholder('Lütfen buraya yazın. / Please type here.')
        .setRequired(true),
        new TextInputComponent()
        .setCustomId('cinsiyet')
        .setLabel('Cinsiyetin nedir? / What is your gender?')
        .setStyle('SHORT')
        .setMinLength(5)
        .setMaxLength(5)
        .setPlaceholder('Örn: Erkek, Kadın ya da Diğer... / Exp: Male, Female or Other...')
        .setRequired(true)
      );
      showModal(modal, { client, interaction });
    }
  }
}