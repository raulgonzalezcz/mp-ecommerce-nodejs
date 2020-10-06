const mercadopago = require ('mercadopago');
const config = require('./config')

mercadopago.configure({
  access_token: 'APP_USR-1159009372558727-072921-8d0b9980c7494985a5abd19fbe921a3d-617633181',
  integrator_id: 'dev_24c65fb163bf11ea96500242ac130004'
});

const createPreference = async ({img, title, price}) => {
   
  var picture_url = `${config.baseUrl}/${img}`

  const back_urls = {
    success: `${config.baseUrl}/success`,
    pending: `${config.baseUrl}/pending`,
    failure: `${config.baseUrl}/failure`
  }

  const payer = {
    name: 'Lalo',
    surname: 'Landa',
    email: 'test_user_81131286@testuser.com',
    phone: {
        area_code: '52',
        number: 5549737300
    },
    address: {
        zip_code: '03940',
        street_name: 'Insurgentes Sur',
        street_number: 1602
    }
  }

  const payment_methods = {
    installments: 6,
    default_installments: 1,
    excluded_payment_methods: [
        {
            id: 'amex'
        }
    ],
    excluded_payment_types: [
        {
            id: 'atm'
        }
    ]
  }

  const preference = {
    items: [
      {
        id: 1234,
        title,
        description: 'Dispositivo móvil de Tienda e-commerce',
        picture_url,
        unit_price: parseFloat(price),
        quantity : 1
      }
    ],
    external_reference: 'raul.gonzalezcz@udlap.mx',
    payer,
    back_urls,
    payment_methods,
    auto_return: 'approved',
    notification_url: `${config.baseUrl}/notifications?source_news=webhooks`
  };
  
    try {
        const response = await mercadopago.preferences.create(preference)
        console.log('Preference id:', response.body.id)
        return response.body.init_point;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createPreference }