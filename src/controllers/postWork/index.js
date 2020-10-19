const Scene = require('telegraf/scenes/base');
const { locationKeyboard, categoryKeyboard } = require('../../util/keyboards');
const { USER_TYPE_EMPLOYER } = require('../../util/types');

const postWork = new Scene('postWork');

postWork.enter(async ctx => {
  ctx.session.userType = USER_TYPE_EMPLOYER;

  await ctx.scene.enter('location');
});

module.exports = postWork;
