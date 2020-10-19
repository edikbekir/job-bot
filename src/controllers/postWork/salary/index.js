const Scene = require('telegraf/scenes/base');
const { getCancelKeyboard } = require('../../../util/keyboards');

const salary = new Scene('salary');

salary.enter(ctx => {
  const keyboard = getCancelKeyboard();
  ctx.reply('✅ Введите заработную плату: ', keyboard);
})

salary.on('text', ctx => {
  if(ctx.message.text === "❌ Отмена"){
    ctx.scene.enter('start');
    return;
  }

  ctx.session.salary = ctx.message.text;
  ctx.scene.enter('contact');
});

module.exports = salary;
