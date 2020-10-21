require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const { compare, encodeData, encodeSignature } = require('./util/liqpay');
const { Telegraf, Stage, session } = require('telegraf');
const axios = require('axios');
const request = require('request');
const bodyParser = require('body-parser')

const {
  LIQPAY_REQUEST_URL,
  DATABASE_HOST,
  TELEGRAM_API_KEY,
  PORT,
  LIQPAY_PUBLIC_KEY
} = process.env;

const {
  startScene,
  findWorkScene,
  postWorkScene,
  locationScene,
  categoryScene,
  headerScene,
  employmentTypeScene,
  descriptionScene,
  salaryScene,
  contactScene,
  summaryScene,
  adsScene,
  jobsScene,
  partnerScene,
  balanceScene,
  supportScene
} = require('./controllers');
const { User, Order } = require('./models');

mongoose.connect(`mongodb://localhost:27017/${DATABASE_HOST}`, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  const bot = new Telegraf(TELEGRAM_API_KEY);
  const server = express();

  const stage = new Stage([
    startScene,
    findWorkScene,
    postWorkScene,
    locationScene,
    categoryScene,
    headerScene,
    employmentTypeScene,
    descriptionScene,
    salaryScene,
    contactScene,
    summaryScene,
    adsScene,
    jobsScene,
    partnerScene,
    balanceScene,
    supportScene
  ]);

  server.use( bodyParser.json() );
  server.use(bodyParser.urlencoded({
    extended: true
  }));

  server.post('/liqpay/callback', async (req, res) => {
    const { data, signature } = req.body;

    const authentic = compare(data, signature);

    if(authentic){
      const statusData = {
        action: "status",
        version: 3,
        public_key: LIQPAY_PUBLIC_KEY,
        order_id: req.query.order_id
      };

      const user = await User.findById(req.query.user_id);

      const encodedData = encodeData(statusData);
      const encodedSignature = encodeSignature(encodedData);

      request.post(LIQPAY_REQUEST_URL, { form: {data : encodedData, signature : encodedSignature}}, async function (error, response, body) {
	        if (!error && response.statusCode == 200) {
              const { amount, currency } = JSON.parse(body);
              const order = await Order.create({
                amount,
                currency
              });
              user.orders.push(order);
              user.balance = Number(user.balance) + Number(amount);
              user.limit = user.balance / 5;
              await user.save();
              console.log(order)
	        } else{
            console.log(error)
	        }
		    }
  		);
    }

    res.status(200).send({success: "123"});
  });

  server.listen(PORT, (req, res) => {
    console.log('Server is running!');
  });

  bot.use(session());
  bot.use(stage.middleware());

  bot.start(async ctx => await ctx.scene.enter('start'));

  bot.hears('🔍 Ищу работу', ctx => {
    ctx.scene.enter('findWork');
  });
  bot.hears('📝 Разместить', ctx => {
    ctx.scene.enter('postWork');
  });
  bot.hears('💳 Баланс', ctx => {
    ctx.scene.enter('balance');
  });
  bot.hears('🤝 Партнёрка', ctx => {
    ctx.scene.enter('partner');
  });
  bot.hears('📚 Поддержка', ctx => {
    ctx.scene.enter('support');
  });
  bot.hears('🧾 Мои заказы', ctx => {
    ctx.scene.enter('ads');
  });
  bot.hears('❌ Отмена', ctx => {
    ctx.scene.enter('start');
  });

  bot.on('text', ctx => {
    if(ctx.message.text === "❌ Отмена"){
      ctx.scene.enter('start');
      return;
    }
  });

  bot.launch();
});
