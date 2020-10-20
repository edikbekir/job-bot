const Scene = require('telegraf/scenes/base');
const partnerTemplate = require('../../templates/partner');

const partner = new Scene('partner');

partner.enter(ctx => {
  const template = partnerTemplate(ctx.session.user);
  ctx.reply(template);
})

module.exports = partner;
