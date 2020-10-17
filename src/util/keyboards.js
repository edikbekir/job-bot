const { Markup, Telegraf } = require('telegraf');
const { jobCategories } = require('./categories');
const { locations } = require('./locations');

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

const locationKeyboard = ctx => {

  const markups = locations.map((r, i) =>{
    if(locations[i] && locations[i+1]){
      return [locations[i], locations[i+1]];
    } else if(locations[i]) {
      return [locations[i]]
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

const getCancelKeyboard = ctx => Markup.keyboard([cancelMarkup]).resize().extra();

const getSummaryKeyboard = ctx => {
  const applyMarkup = Markup.callbackButton(`🤝 Подтвердить`);
  const cancelMarkup = Markup.callbackButton(`❌ Отмена`);

  return Markup.keyboard([
    [applyMarkup, cancelMarkup]
  ]).resize().extra();
}

module.exports = {
  getStartKeyboard,
  locationKeyboard,
  categoryKeyboard,
  getCancelKeyboard,
  getSummaryKeyboard
};
