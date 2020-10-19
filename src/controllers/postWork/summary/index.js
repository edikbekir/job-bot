const Scene = require('telegraf/scenes/base');
const { getSummaryKeyboard } = require('../../../util/keyboards');
const { Ad, User } = require('../../../models');

const summary = new Scene('summary');

summary.enter(ctx => {
  const keyboard = getSummaryKeyboard();
  ctx.reply(
    `
   📢 ОБЪЯВЛЕНИE
   💠 Заголовок: ${ctx.session.header}
   🔘 Категория: ${ctx.session.category}
   🏙️ Город: ${ctx.session.location}
   💳 ЗАРПЛАТА: ${ctx.session.salary}
   ⬇️ Тип занятости:
      ${ctx.session.employmentType}

   🔝 Описания вакансии:
      ${ctx.session.description}

   ✅ Контакты: ${ctx.session.contact}`
  , keyboard);
});

summary.hears('🤝 Подтвердить', async ctx => {
  const {
    category,
    contact,
    description,
    employmentType,
    header,
    location,
    salary,
    user: owner,
  } = ctx.session;

  const user = await User.findById(owner.id);

  const ad = await Ad.create({
    category,
    contact,
    description,
    employmentType,
    header,
    location,
    salary,
    owner
  });

  await user.ads.push(ad);
  await user.save();
  await ctx.reply('Сохранено!')
  await ctx.scene.enter('start');
});

module.exports = summary;
