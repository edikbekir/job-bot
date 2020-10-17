const Scene = require('telegraf/scenes/base');
const { getCancelKeyboard } = require('../../../util/keyboards');

const contact = new Scene('contact');

contact.enter(ctx => {
  const keyboard = getCancelKeyboard();
  ctx.reply('✅ Введите контакт для связи ( номер, email ) ', keyboard);
});

contact.on('text', ctx => {
  ctx.session.contact = ctx.message.text;
  ctx.scene.enter('summary');
});

module.exports = contact;
