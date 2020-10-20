const public_key = process.env.LIQPAY_PUBLIC_KEY;
const private_key = process.env.LIQPAY_PRIVATE_KEY;
const base64 = require('js-base64').Base64;
const crypto = require('crypto');
const cryptoRandomString = require('crypto-random-string');

const getOrderId = () => {
  const timestamp = Date.now();

  return 'order-' + timestamp + '-' + cryptoRandomString({length: 6});
}

const encodeData = params => {
  return base64.encode(JSON.stringify(params));
};

const encodeSignature = data => {
  const sha1 = crypto.createHash('sha1');

  return base64.encode(sha1.update(private_key + data + private_key).digest());
};

exports.encodeData = encodeData;
exports.getOrderId = getOrderId;

exports.encodeSignature = encodeSignature;

exports.link = (amount, order_id) => {
  const timestamp = Date.now();

  const raw_data = {
    'public_key': public_key,
    'action': 'pay',
    'language': 'uk',
    'amount': amount,
    'currency': 'UAH',
    'description': 'Номер платежа. №' + order_id,
    'order_id': order_id,
    'version': '3',
    'server_url': `${process.env.SERVER_URL}/liqpay/callback?order_id=${order_id}`,
  };

  const data = encodeData(raw_data);

  const signature = encodeSignature(data);

  const link = `https://www.liqpay.ua/api/3/checkout?data=${data}&signature=${signature}`;

  return link;
}

exports.compare = (requestData, requestSignature) => {
  const sha1 = crypto.createHash('sha1');

  const signature = base64.encode(sha1.update(private_key + requestData + private_key).digest());

  return requestSignature === signature;
}
