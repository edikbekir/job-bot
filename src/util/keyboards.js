const { Markup } = require('telegraf');

const getStartKeyboard = ctx => {
  const freelancerKeyboard = Markup.callbackButton(`Freelancer`, JSON.stringify({ a: 'Freelancer', p: 'en' }), false);;
  const customerKeyboard = Markup.callbackButton(`Customer`, JSON.stringify({ a: 'Customer', p: 'en' }), false);

  return Markup.keyboard([freelancerKeyboard, customerKeyboard]).resize().extra();
}

module.exports = { getStartKeyboard };
