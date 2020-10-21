const Scene = require('telegraf/scenes/base');
const {getSupportKeyboard} = require('../../util/keyboards');

const support = new Scene('support');

support.enter(ctx => {
  ctx.replyWithHTML(`Напишите <a href="${process.env.DEVELOPER_LINK}">разработчику</a>`);
});

module.exports = support;
