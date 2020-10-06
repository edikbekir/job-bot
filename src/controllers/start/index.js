const Scene = require('telegraf/scenes/base');
const { getStartKeyboard } = require('../../util/keyboards');
const start = new Scene('start');

start.enter(ctx => {
  const keyboard = getStartKeyboard();
  ctx.reply('Please enter who are you?', keyboard);
});

start.hears(/Customer/, async ctx => {
  //User registration ctx.from.id ctx.from.username ctx.from.first_name ctx.from.last_name
})

start.hears(/Freelancer/, async ctx => {
  //User registration ctx.from.id ctx.from.username ctx.from.first_name ctx.from.last_name
})

module.exports = start;
