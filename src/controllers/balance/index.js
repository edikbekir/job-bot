require('dotenv').config();

const Scene = require('telegraf/scenes/base');
const {
  getReplenishKeyboard,
  getPaymentMethodsKeyboard,
  getSumKeyboard
} = require('../../util/keyboards');

const { link, getOrderId } = require('../../util/liqpay');
const axios = require('axios');
const { User } = require('../../models');
const balance = new Scene('balance');

balance.enter(async ctx => {
  const user = await User.findById(ctx.session.user._id);
  const keyboard = getReplenishKeyboard();
  ctx.reply(
    `
    💵 Ваш баланс: ${user.balance} UAH
💵 Количество кредитов: ${user.limit}
    `, keyboard);
});

balance.action(/replenish/, ctx => {
  ctx.deleteMessage();
  const keyboard = getSumKeyboard();
  ctx.reply('💳 Выберите сумму пополнения или введите сумму: ', keyboard);
});

balance.hears(/^\d+$/, ctx => {
  const amount = Number(ctx.message.text);
  if(amount){
    const order_id = getOrderId();
    const redirectLink = link(amount, order_id, ctx.session.user._id);
    ctx.replyWithHTML(`
      👤 Для пополнения счёта
💰 На сумму: ${amount} UAH
💸 Перейдите по <a href="${redirectLink}">ссылке</a>
    `);
  } else {
    ctx.reply("Что то не так!");
  }
})

balance.action(/sum/, ctx => {
  const data = JSON.parse(ctx.callbackQuery.data);
  ctx.deleteMessage();
  const order_id = getOrderId();
  const redirectLink = link(data.p, order_id, ctx.session.user._id);
  ctx.replyWithHTML(`
    👤 Для пополнения счёта
💰 На сумму: ${data.p} UAH
💸 Перейдите по <a href="${redirectLink}">ссылке</a>
  `);
})


module.exports = balance;
