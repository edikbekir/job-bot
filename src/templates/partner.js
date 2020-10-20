require('dotenv').config();
const BOT_NAME = process.env.BOT_NAME;

const partner = user => {
  return `
Как увеличить количество размещений?

Для увеличения количества запросов, необходимо пригласить 1 пользователя.
Каждый пользователей, дает вам +1 размещение.
Вы пригласили пользователей: 0
Вы можете разместить: 0

Ваша ссылка для приглашения:
https://t.me/${BOT_NAME}?start=270904565
  `
}

module.exports = partner;
