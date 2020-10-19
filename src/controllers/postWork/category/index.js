const Scene = require('telegraf/scenes/base');
const { categoryKeyboard } = require('../../../util/keyboards');
const category = new Scene('category');
const { USER_TYPE_EMPLOYER } = require('../../../util/types');

category.enter(ctx => {
  const keyboard = categoryKeyboard();
  ctx.reply('✅ Выберите категорию: ', keyboard);
});

category.on('text', ctx => {
  if(ctx.message.text === "❌ Отмена"){
    ctx.scene.enter('start');
    return;
  }

  ctx.session.category = ctx.message.text;
  if(ctx.session.userType === USER_TYPE_EMPLOYER){
    ctx.scene.enter('header');
    return;
  }

  ctx.scene.enter('jobs');
});

module.exports = category;
