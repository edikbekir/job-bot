const Scene = require('telegraf/scenes/base');
const { getStartKeyboard } = require('../../util/keyboards');
const start = new Scene('start');
const { User } = require('../../models');

start.enter(async ctx => {
  const keyboard = getStartKeyboard();

  const uid = String(ctx.from.id);
  const user = await User.findById(uid);

  if(user){
    ctx.session.user = user;
    ctx.reply('Добро пожаловать, обратно', keyboard);
  } else {
    const newUser = new User({ _id: uid });
    newUser.save();

    ctx.reply('Приветствую тебя!', keyboard);
  }
});
module.exports = start;
