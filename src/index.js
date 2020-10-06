require('dotenv').config()
const { Telegraf, Stage, session } = require('telegraf');

const { startScene } = require('./controllers');

const bot = new Telegraf(process.env.TELEGRAM_API_KEY);

const stage = new Stage([
  startScene
]);
bot.use(session());
bot.use(stage.middleware());

bot.start(async ctx => await ctx.scene.enter('start'));


bot.launch();
