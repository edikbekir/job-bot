const { Markup, Telegraf } = require('telegraf');
const { jobCategories } = require('./categories');
const { regions } = require('./regions');

const getStartKeyboard = ctx => {
  const findJobKeyboard = Markup.callbackButton(`🔍 Ищу работу`);
  const postJobKeyboard = Markup.callbackButton(`📝 Разместить`);
  const balanceKeyboard = Markup.callbackButton(`💳 Баланс`);
  const partnerKeyboard = Markup.callbackButton(`🤝 Партнёрка`);
  const aboutKeyboard = Markup.callbackButton(`📚 О боте`);
  const completedJobsKeyboard = Markup.callbackButton(`🧾 Мои заказы`);

  return Markup.keyboard([
    [findJobKeyboard, postJobKeyboard],
    [balanceKeyboard, partnerKeyboard],
    [aboutKeyboard, completedJobsKeyboard],
  ]).resize().extra();
};

const whereFindWorkKeyboard = ctx => {

  const markups = regions.map((r, i) =>{
    if(regions[i] && regions[i+1]){
      return [regions[i], regions[i+1]];
    } else if(regions[i]) {
      return [regions[i]]
    }
  });

  markups.push([cancelMarkup]);
  return Markup.keyboard(markups).resize().extra();
}

const categoryKeyboard = () => {
  const markups = jobCategories.map((r, i) => {
    if(jobCategories[i] && jobCategories[i+1] && jobCategories[i+2]){
      return [jobCategories[i], jobCategories[i+1], jobCategories[i+2]];
    } else if(jobCategories[i] && jobCategories[i+1]) {
      return [jobCategories[i], jobCategories[i+1]];
    } else {
      return [jobCategories[i]];
    }
  });
  markups.push([cancelMarkup]);
  return Markup.keyboard(markups).resize().extra();
}

const cancelMarkup = Markup.callbackButton(`❌ Отмена`);

module.exports = { getStartKeyboard, whereFindWorkKeyboard, categoryKeyboard};
