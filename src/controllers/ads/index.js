const Scene = require('telegraf/scenes/base');
const { User, Ad } = require('../../models');
const adTemplate = require('../../templates/ad');
const { getAdKeyboard } = require('../../util/keyboards');
const ads = new Scene('ads');

ads.enter(async ctx => {
  const userRef = await User.findById(ctx.session.user._id).populate('ads');
  if(userRef.ads.length === 0){
    await ctx.reply('Пока что нет заказов');
  }
  await userRef.ads.forEach(ad => {
    const keyboard = getAdKeyboard(ad._id);
    const template = adTemplate(ad, ctx.session.user);

    ctx.reply(template, keyboard);
  });
});

ads.action(/remove/, async ctx => {
  const adContextData = JSON.parse(ctx.callbackQuery.data);
  const ad = await Ad.findById(adContextData.p);

  await Ad.deleteOne(ad);
  await ctx.deleteMessage();
  await ctx.reply('Удалено!');

  await ctx.scene.enter('ads');
})

module.exports = ads;
