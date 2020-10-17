const Scene = require('telegraf/scenes/base');
const findWork = new Scene('findWork');
const { locationKeyboard, categoryKeyboard } = require('../../util/keyboards');

findWork.enter(async ctx => {
  const keyboard = locationKeyboard();
  ctx.reply('✅ Где вы ищите работу?', keyboard);
});

findWork.hears(/\sобласть/, ctx => {
  const keyboard = categoryKeyboard();
  ctx.reply('👨‍💻 Выберите направление', keyboard);
});

module.exports = findWork;
