const Scene = require('telegraf/scenes/base');
const { locationKeyboard, categoryKeyboard } = require('../../util/keyboards');
const { USER_TYPE_EMPLOYER } = require('../../util/types');

const postWork = new Scene('postWork');

postWork.enter(async ctx => {
  if(ctx.session.user.limit === 0){
    ctx.reply(`
      У вас не хватает кредитов для размещения!

Вы можете купить кредиты или пригласить друзей.
    `);
    return;
  }

  ctx.session.userType = USER_TYPE_EMPLOYER;
  await ctx.scene.enter('location');
});

module.exports = postWork;
