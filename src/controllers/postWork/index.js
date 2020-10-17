const Scene = require('telegraf/scenes/base');
const { locationKeyboard, categoryKeyboard } = require('../../util/keyboards');

const postWork = new Scene('postWork');

postWork.enter(async ctx => {
  await ctx.scene.enter('location');
});

module.exports = postWork;
