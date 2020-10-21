require('dotenv').config();

const { Markup, Telegraf } = require('telegraf');
const { jobCategories } = require('./categories');
const { locations } = require('./locations');

const getStartKeyboard = ctx => {
  const findJobKeyboard = Markup.callbackButton(`🔍 Ищу работу`);
  const postJobKeyboard = Markup.callbackButton(`📝 Разместить`);
  const balanceKeyboard = Markup.callbackButton(`💳 Баланс`);
  const partnerKeyboard = Markup.callbackButton(`🤝 Партнёрка`);
  const aboutKeyboard = Markup.callbackButton(`📚 Поддержка`);
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
};

const getAdKeyboard = id => {
  return Markup.inlineKeyboard([
      [Markup.callbackButton('❌', JSON.stringify({ a: 'remove', p: id }) )],
  ]).extra()
}

const getReplenishKeyboard = () => {
  return Markup.inlineKeyboard([
      [Markup.callbackButton('📥 Пополнить', JSON.stringify({ a: 'replenish' }) )],
  ]).extra()
};

const getPaymentMethodsKeyboard = () => {
  return Markup.inlineKeyboard([
      [Markup.callbackButton('💵 Portmone', JSON.stringify({ a: 'portmone' }) )],
  ]).extra()
};

const getSumKeyboard = () => {
  return Markup.inlineKeyboard([
      [Markup.callbackButton('50', JSON.stringify({ a: 'sum', p: 50 }) ), Markup.callbackButton('100', JSON.stringify({ a: 'sum', p: 100 }) )],
      [Markup.callbackButton('150', JSON.stringify({ a: 'sum', p: 150 }) ), Markup.callbackButton('200', JSON.stringify({ a: 'sum', p: 200 }) )],
      [Markup.callbackButton('250', JSON.stringify({ a: 'sum', p: 250 }) ), Markup.callbackButton('300', JSON.stringify({ a: 'sum', p: 300 }) )],
      [Markup.callbackButton('350', JSON.stringify({ a: 'sum', p: 350 }) ), Markup.callbackButton('400', JSON.stringify({ a: 'sum', p: 400 }) )],
  ]).extra();
};

const getSupportKeyboard = () => {
  return Markup.inlineKeyboard([
      [Markup.callbackButton('🧑‍💻', JSON.stringify({ a: process.env.DEVELOPER_LINK }) )],
  ]).extra()
}

module.exports = {
  getStartKeyboard,
  locationKeyboard,
  categoryKeyboard,
  getCancelKeyboard,
  getSummaryKeyboard,
  getAdKeyboard,
  getReplenishKeyboard,
  getPaymentMethodsKeyboard,
  getSumKeyboard,
  getSupportKeyboard
};
