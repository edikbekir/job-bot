const Scene = require('telegraf/scenes/base');
const findWork = new Scene('findWork');
const { locationKeyboard, categoryKeyboard } = require('../../util/keyboards');
const { USER_TYPE_WORKER } = require('../../util/types');

findWork.enter(async ctx => {
  ctx.session.userType = USER_TYPE_WORKER;

  ctx.scene.enter('location');
});

findWork.hears(/\sобласть/, ctx => {
  const keyboard = categoryKeyboard();
  ctx.reply('👨‍💻 Выберите направление', keyboard);
});

module.exports = findWork;
