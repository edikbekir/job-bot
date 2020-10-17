const Scene = require('telegraf/scenes/base');
const { getCancelKeyboard } = require('../../../util/keyboards');

const employmentType = new Scene('employmentType');

employmentType.enter(ctx => {
  const keyboard = getCancelKeyboard();
  ctx.reply('✅ Введите тип занятости: ', keyboard);
})

employmentType.on('text', ctx => {
  ctx.session.employmentType = ctx.message.text;
  ctx.scene.enter('description');
});

module.exports = employmentType;
