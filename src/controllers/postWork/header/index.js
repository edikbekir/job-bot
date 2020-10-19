const Scene = require('telegraf/scenes/base');
const { getCancelKeyboard } = require('../../../util/keyboards');

const header = new Scene('header');

header.enter(ctx => {
  const keyboard = getCancelKeyboard();
  ctx.reply('✅ Введите заголовок объявления: ', keyboard);
})

header.on('text', ctx => {
  if(ctx.message.text === "❌ Отмена"){
    ctx.scene.enter('start');
    return;
  }

  ctx.session.header = ctx.message.text;
  ctx.scene.enter('employmentType');
});

module.exports = header;
