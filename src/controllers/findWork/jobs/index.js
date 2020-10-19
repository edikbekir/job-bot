const Scene = require('telegraf/scenes/base');
const { Ad, User } = require('../../../models');
const adTemplate = require('../../../templates/ad');

const jobs = new Scene('jobs');

jobs.enter(async ctx => {
  const { location, category } = ctx.session;
  const ads = await Ad.find({
    location,
    category
  }).populate('owner');

  if(ads.length > 0){
    ads.forEach(ad => {
      const template = adTemplate(ad, ad.owner);
      ctx.reply(template);
    });
  } else {
    ctx.reply('К сожалению, я ничего не нашёл по заданным критериям 😔');
  }
});

module.exports = jobs;
