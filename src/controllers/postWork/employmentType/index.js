const Scene = require('telegraf/scenes/base');
const { getCancelKeyboard } = require('../../../util/keyboards');

const employmentType = new Scene('employmentType');

employmentType.enter(ctx => {
  const keyboard = getCancelKeyboard();
  ctx.reply('✅ Введите тип занятости: ', keyboard);
})

employmentType.on('text', ctx => {
  if(ctx.message.text === "❌ Отмена"){
    ctx.scene.enter('start');
    return;
  }

  ctx.session.employmentType = ctx.message.text;
  ctx.scene.enter('description');
});

module.exports = employmentType;
