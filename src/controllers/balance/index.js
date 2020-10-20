require('dotenv').config();

const Scene = require('telegraf/scenes/base');
const {
  getReplenishKeyboard,
  getPaymentMethodsKeyboard,
  getSumKeyboard
} = require('../../util/keyboards');

const { link, getOrderId } = require('../../util/liqpay');
const axios = require('axios');
const balance = new Scene('balance');

balance.enter(ctx => {
  const keyboard = getReplenishKeyboard();
  ctx.reply(`💵 Ваш баланс: ${ctx.session.user.balance} UAH`, keyboard);
});

balance.action(/replenish/, ctx => {
  ctx.deleteMessage();
  const keyboard = getPaymentMethodsKeyboard();
  ctx.reply('💳 Выберите способ пополнения: ', keyboard);
});

balance.action(/portmone/, ctx => {
  ctx.deleteMessage();
  const keyboard = getSumKeyboard();
  ctx.reply('💳 Выберите сумму пополнения: ', keyboard);
});

balance.action(/sum/, ctx => {
  const data = JSON.parse(ctx.callbackQuery.data);
  ctx.deleteMessage();
  const order_id = getOrderId();
  const redirectLink = link(data.p, order_id);
  ctx.replyWithHTML(`
    👤 Для пополнения счёта
💰 На сумму: ${data.p} UAH
💸 Перейдите по <a href="${redirectLink}">ссылке</a>
  `);
})


module.exports = balance;
