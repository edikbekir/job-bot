const Scene = require('telegraf/scenes/base');
const { getCancelKeyboard } = require('../../../util/keyboards');

const description = new Scene('description');

description.enter(ctx => {
  const keyboard = getCancelKeyboard();
  ctx.reply('✅ Введите описание вакансии: ', keyboard);
})

description.on('text', ctx => {
  if(ctx.message.text === "❌ Отмена"){
    ctx.scene.enter('start');
    return;
  }

  ctx.session.description = ctx.message.text;
  ctx.scene.enter('salary');
});

module.exports = description;
