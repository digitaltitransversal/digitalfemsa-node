/**
 * Lambda function CON el workaround para ca_bundle.crt
 * Esta versión debería funcionar correctamente
 */

const { OrdersApi, Configuration } = require('digitalfemsa');
const https = require('https');

exports.handler = async (event) => {
  console.log('Lambda started (with workaround)');
  
  try {
    // ✅ WORKAROUND: Configurar httpsAgent custom
    const config = new Configuration({
      accessToken: process.env.DIGITALFEMSA_API_KEY || 'key_test',
      baseOptions: {
        httpsAgent: new https.Agent({
          rejectUnauthorized: true // Usar certificados del sistema
        })
      }
    });
    
    const ordersApi = new OrdersApi(config);
    
    console.log('Attempting to call getOrders with workaround...');
    const response = await ordersApi.getOrders();
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Success with workaround!',
        ordersCount: response.data?.data?.length || 0
      })
    };
    
  } catch (error) {
    console.error('Error occurred:', error.message);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        note: 'Even with workaround, API call might fail if API key is invalid'
      })
    };
  }
};
