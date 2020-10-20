const Scene = require('telegraf/scenes/base');
const { getStartKeyboard } = require('../../util/keyboards');
const start = new Scene('start');
const { User } = require('../../models');
const { DEFAULT_LIMIT, DEFAULT_BALANCE } = require('../../util/types');

start.enter(async ctx => {
  const { last_name, first_name, username, id } = ctx.from;
  const [command, partnerLink] = ctx.update.message.text.split(' ');

  const uid = String(id);
  let user = await User.findById(uid);

  const keyboard = getStartKeyboard();

  if(!user && partnerLink){
    const parentUser = await User.findById(partnerLink);
    if(parentUser){
      parentUser.limit = parentUser ? parentUser.limit + 1 : parentUser.limit;
      await parentUser.save();
    }
  }

  if(user){
    ctx.reply('Добро пожаловать, обратно', keyboard);
  } else {
    user = new User({ _id: uid, username, last_name, first_name, limit: DEFAULT_LIMIT, balance: DEFAULT_BALANCE });

    await user.save();

    ctx.reply('Приветствую тебя!', keyboard);
  }

  ctx.session.user = user;
});

module.exports = start;
