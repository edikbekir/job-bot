const Scene = require('telegraf/scenes/base');
const { categoryKeyboard } = require('../../../util/keyboards');
const category = new Scene('category');

category.enter(ctx => {
  const keyboard = categoryKeyboard();
  ctx.reply('✅ Выберите категорию: ', keyboard);
});

category.on('text', ctx => {
  ctx.session.category = ctx.message.text;
  ctx.scene.enter('header');
});

module.exports = category;
