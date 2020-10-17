require('dotenv').config();
const mongoose = require('mongoose');
const { Telegraf, Stage, session } = require('telegraf');
const { startScene, findWorkScene } = require('./controllers');
const { User } = require('./models');

mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASE_HOST}`, {
  useNewUrlParser: true,
  useFindAndModify: true
});

mongoose.connection.on('open', () => {
  const bot = new Telegraf(process.env.TELEGRAM_API_KEY);

  const stage = new Stage([
    startScene,
    findWorkScene
  ]);
  bot.use(session());
  bot.use(stage.middleware());

  bot.start(async ctx => await ctx.scene.enter('start'));

  bot.hears('🔍 Ищу работу', ctx => {
    console.log(ctx.session.user);
    ctx.scene.enter('findWork');
  });
  bot.hears('📝 Разместить', ctx => {

  });
  bot.hears('💳 Баланс', ctx => {

  });
  bot.hears('🤝 Партнёрка', ctx => {

  });
  bot.hears('📚 О боте', ctx => {

  });
  bot.hears('🧾 Мои заказы', ctx => {

  });
  bot.hears('❌ Отмена', ctx => {
    ctx.scene.enter('start');
  })

  bot.launch();

});
