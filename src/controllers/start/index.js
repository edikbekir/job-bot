const Scene = require('telegraf/scenes/base');
const { getStartKeyboard } = require('../../util/keyboards');
const start = new Scene('start');
const { User } = require('../../models');

start.enter(async ctx => {
  const { last_name, first_name, username, id } = ctx.from;
  const uid = String(id);
  const user = await User.findById(uid);

  const keyboard = getStartKeyboard();

  if(user){
    ctx.session.user = user;
    ctx.reply('Добро пожаловать, обратно', keyboard);
  } else {
    const newUser = new User({
      _id: uid,
      username,
      last_name,
      first_name
    });

    await newUser.save();

    ctx.session.user = newUser;

    ctx.reply('Приветствую тебя!', keyboard);
  }
});

module.exports = start;
