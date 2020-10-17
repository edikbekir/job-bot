const Scene = require('telegraf/scenes/base');
const { locationKeyboard } = require('../../../util/keyboards');

const location = new Scene('location');

location.enter(ctx => {
  const keyboard = locationKeyboard();
  ctx.reply('✅ Выберите город: ', keyboard);
});

location.on('text', ctx => {
  ctx.session.location = ctx.message.text;

  ctx.scene.enter('category');
});

module.exports = location;
