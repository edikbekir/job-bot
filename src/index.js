require('dotenv').config();
const mongoose = require('mongoose');
const { Telegraf, Stage, session } = require('telegraf');
const {
  startScene,
  findWorkScene,
  postWorkScene,
  locationScene,
  categoryScene,
  headerScene,
  employmentTypeScene,
  descriptionScene,
  salaryScene,
  contactScene,
  summaryScene,
  adsScene,
  jobsScene
} = require('./controllers');
const { User } = require('./models');

mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASE_HOST}`, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  const bot = new Telegraf(process.env.TELEGRAM_API_KEY);

  const stage = new Stage([
    startScene,
    findWorkScene,
    postWorkScene,
    locationScene,
    categoryScene,
    headerScene,
    employmentTypeScene,
    descriptionScene,
    salaryScene,
    contactScene,
    summaryScene,
    adsScene,
    jobsScene
  ]);
  bot.use(session());
  bot.use(stage.middleware());

  bot.start(async ctx => await ctx.scene.enter('start'));

  bot.hears('🔍 Ищу работу', ctx => {
    ctx.scene.enter('findWork');
  });
  bot.hears('📝 Разместить', ctx => {
    ctx.scene.enter('postWork');
  });
  bot.hears('💳 Баланс', ctx => {

  });
  bot.hears('🤝 Партнёрка', ctx => {

  });
  bot.hears('📚 О боте', ctx => {

  });
  bot.hears('🧾 Мои заказы', ctx => {
    ctx.scene.enter('ads');
  });
  bot.hears('❌ Отмена', ctx => {
    ctx.scene.enter('start');
  });

  bot.on('text', ctx => {
    if(ctx.message.text === "❌ Отмена"){
      ctx.scene.enter('start');
      return;
    }
  });

  bot.launch();
});
